import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

interface ExoplanetData {
  planet_name: string | number | null;
  disposition: string;
  orbital_period: number | null;
  planet_radius: number | null;
  equilibrium_temp: number | null;
  insolation_flux: number | null;
  transit_depth: number | null;
  transit_duration: number | null;
  stellar_teff: number | null;
  stellar_logg: number | null;
  stellar_radius: number | null;
  ra: number;
  dec: number;
  prob_confirmed: number;
  prob_false_positive: number;
}

type SortField = 'prob_confirmed' | 'prob_false_positive';
type SortDirection = 'asc' | 'desc';

const ExoplanetTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState<ExoplanetData[]>([]);
  const [sortField, setSortField] = useState<SortField>('prob_confirmed');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<ExoplanetData[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Format column headers using proper astronomical nomenclature
  const formatHeader = (key: string): string => {
    const headers: { [key: string]: string } = {
      planet_name: 'Planet Identity',
      disposition: 'Disposition',
      orbital_period: 'Orbital Period [days]',
      planet_radius: 'Planet Radius [R_Earth]',
      equilibrium_temp: 'Planet Eq Temp [K]',
      insolation_flux: 'Insolation [Earth flux]',
      transit_depth: 'Transit Depth [ppm]',
      transit_duration: 'Transit Duration [hrs]',
      stellar_teff: 'Stellar Teff [K]',
      stellar_logg: 'Stellar log(g)',
      stellar_radius: 'Stellar Radius [R_Sun]',
      ra: 'RA [deg]',
      dec: 'Dec [deg]',
      prob_confirmed: 'Confirmed Prob',
      prob_false_positive: 'False Positive Prob'
    };
    return headers[key] || key;
  };

  // Format cell values for display
  const formatCellValue = (value: any, key: string): string => {
    if (value === null || value === undefined) return 'N/A';

    if (key === 'planet_name' && typeof value === 'number') {
      return 'TOI-' + value.toFixed(2);
    }

    if (typeof value === 'number') {
      if (key.includes('prob')) {
        return (value * 100).toFixed(2) + '%';
      }
      if (key.includes('temp')) {
        return value.toFixed(0) + ' K';
      }
      if (key.includes('radius')) {
        return value.toFixed(2);
      }
      if (key.includes('period') || key.includes('duration')) {
        return value.toFixed(2);
      }
      if (key.includes('flux') || key.includes('depth')) {
        return value.toLocaleString();
      }
      if (key === 'ra' || key === 'dec') {
        return value.toFixed(6);
      }
      return value.toFixed(3);
    }

    return String(value);
  };

  // Fuzzy search function
  const fuzzyMatch = (text: string, pattern: string): boolean => {
    if (!pattern) return true;

    const patternLower = pattern.toLowerCase();
    const textLower = text.toLowerCase();

    // Exact match gets highest priority
    if (textLower === patternLower) return true;

    // Starts with match
    if (textLower.startsWith(patternLower)) return true;

    // Contains match
    if (textLower.includes(patternLower)) return true;

    // Fuzzy matching using Levenshtein distance-like approach
    let patternIdx = 0;
    for (let textIdx = 0; textIdx < textLower.length && patternIdx < patternLower.length; textIdx++) {
      if (textLower[textIdx] === patternLower[patternIdx]) {
        patternIdx++;
      }
    }

    return patternIdx === patternLower.length;
  };

  // Search across all files
  const searchAcrossFiles = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setShowSearchResults(false);
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      const results: ExoplanetData[] = [];

      // Search through all 161 files
      for (let i = 1; i <= 161; i++) {
        try {
          const response = await fetch(`/model/candidate_predictions_${i}.json`);
          if (response.ok) {
            const data: ExoplanetData[] = await response.json();

            // Filter data based on fuzzy search with TOI conversion
            const filteredData = data.filter(planet => {
              if (!planet.planet_name) return false;

              // Convert numeric planet names to TOI format for searching
              let searchName = String(planet.planet_name);
              if (typeof planet.planet_name === 'number') {
                searchName = 'TOI-' + planet.planet_name.toFixed(2);
              }

              return fuzzyMatch(searchName, searchQuery);
            });

            results.push(...filteredData);
          }
        } catch (err) {
          // Continue searching other files even if one fails
          console.warn(`Failed to search file ${i}:`, err);
        }
      }

      // Sort results by relevance (exact matches first, then starts with, then contains)
      results.sort((a, b) => {
        const nameA = String(a.planet_name).toLowerCase();
        const nameB = String(b.planet_name).toLowerCase();
        const query = searchQuery.toLowerCase();

        // Exact match
        if (nameA === query && nameB !== query) return -1;
        if (nameB === query && nameA !== query) return 1;

        // Starts with
        if (nameA.startsWith(query) && !nameB.startsWith(query)) return -1;
        if (nameB.startsWith(query) && !nameA.startsWith(query)) return 1;

        // Contains (shorter matches first for better relevance)
        const aIndex = nameA.indexOf(query);
        const bIndex = nameB.indexOf(query);
        if (aIndex !== bIndex) return aIndex - bIndex;

        return nameA.length - nameB.length;
      });

      setSearchResults(results);
      setShowSearchResults(true);
    } catch (err: any) {
      setError(err.message);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchAcrossFiles(searchTerm);
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Load data for current page (when not searching)
  useEffect(() => {
    if (showSearchResults) return; // Don't load page data when showing search results

    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        // For sorting, we need to determine the correct page based on sort order
        let targetPage = currentPage;

        if (sortField === 'prob_confirmed') {
          // For prob_confirmed desc: page 161 has highest values, page 1 has lowest
          // For prob_confirmed asc: page 1 has lowest, page 161 has highest
          targetPage = sortDirection === 'desc' ? 162 - currentPage : currentPage;
        } else if (sortField === 'prob_false_positive') {
          // For prob_false_positive desc: page 1 has highest values, page 161 has lowest
          // For prob_false_positive asc: page 161 has lowest, page 1 has highest
          targetPage = sortDirection === 'desc' ? currentPage : 162 - currentPage;
        }

        const response = await fetch(`/model/candidate_predictions_${targetPage}.json`);
        if (!response.ok) {
          throw new Error(`Failed to load page ${targetPage}`);
        }

        const data: ExoplanetData[] = await response.json();
        setCurrentData(data);
      } catch (err: any) {
        setError(err.message);
        setCurrentData([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [currentPage, sortField, sortDirection, showSearchResults]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return 'lucide:chevrons-up-down';
    return sortDirection === 'asc' ? 'lucide:chevron-up' : 'lucide:chevron-down';
  };

  const totalPages = 161;

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <span className="ml-2">Loading exoplanet data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <Icon icon="lucide:alert-circle" className="w-6 h-6" />
        <span>Error loading data: {error}</span>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body p-0">
          <div className="card-title p-6 pb-0">
            <h2 className="text-xl font-bold">Exoplanet Candidates</h2>
            <div className="text-sm text-base-content/70">
              {showSearchResults ? (
                isSearching ? (
                  <span className="flex items-center gap-2">
                    <span className="loading loading-spinner loading-sm"></span>
                    Searching...
                  </span>
                ) : (
                  `Found ${searchResults.length} results`
                )
              ) : (
                `Page ${currentPage} of ${totalPages}`
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="px-6 pt-0 pb-4">
            <div className="form-control">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon icon="lucide:search" className="w-5 h-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  placeholder="Search planet names across all files..."
                  className="input input-bordered w-full pl-10 pr-10 py-3 text-base"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => {
                      setSearchTerm('');
                      setShowSearchResults(false);
                      setSearchResults([]);
                    }}
                  >
                    <Icon icon="lucide:x" className="w-5 h-5 text-base-content/40 hover:text-base-content transition-colors" />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="table table-zebra table-pin-rows table-pin-cols">
              <thead>
                <tr>
                  <th className="bg-base-300">
                    <button
                      className="btn btn-ghost btn-sm w-full justify-between"
                      onClick={() => handleSort('prob_confirmed')}
                    >
                      <span>{formatHeader('prob_confirmed')}</span>
                      <Icon icon={getSortIcon('prob_confirmed')} className="w-4 h-4" />
                    </button>
                  </th>
                  <th className="bg-base-300">
                    <button
                      className="btn btn-ghost btn-sm w-full justify-between"
                      onClick={() => handleSort('prob_false_positive')}
                    >
                      <span>{formatHeader('prob_false_positive')}</span>
                      <Icon icon={getSortIcon('prob_false_positive')} className="w-4 h-4" />
                    </button>
                  </th>
                  <th className="bg-base-300">{formatHeader('planet_name')}</th>
                  <th className="bg-base-300">{formatHeader('disposition')}</th>
                  <th className="bg-base-300">{formatHeader('orbital_period')}</th>
                  <th className="bg-base-300">{formatHeader('planet_radius')}</th>
                  <th className="bg-base-300">{formatHeader('equilibrium_temp')}</th>
                  <th className="bg-base-300">{formatHeader('stellar_teff')}</th>
                  <th className="bg-base-300">{formatHeader('stellar_radius')}</th>
                  <th className="bg-base-300">{formatHeader('ra')}</th>
                  <th className="bg-base-300">{formatHeader('dec')}</th>
                </tr>
              </thead>
              <tbody>
                {(showSearchResults ? searchResults : currentData).map((planet, index) => (
                  <tr key={`${planet.planet_name}-${index}`} className="hover">
                    <td className="font-semibold">
                      {formatCellValue(planet.prob_confirmed, 'prob_confirmed')}
                    </td>
                    <td className="font-semibold">
                      {formatCellValue(planet.prob_false_positive, 'prob_false_positive')}
                    </td>
                    <td className="font-mono text-sm">
                      {formatCellValue(planet.planet_name, 'planet_name')}
                    </td>
                    <td>
                      <div className={`badge ${planet.disposition === 'CANDIDATE' ? 'badge-primary' : 'badge-secondary'}`}>
                        {planet.disposition}
                      </div>
                    </td>
                    <td>{formatCellValue(planet.orbital_period, 'orbital_period')}</td>
                    <td>{formatCellValue(planet.planet_radius, 'planet_radius')}</td>
                    <td>{formatCellValue(planet.equilibrium_temp, 'equilibrium_temp')}</td>
                    <td>{formatCellValue(planet.stellar_teff, 'stellar_teff')}</td>
                    <td>{formatCellValue(planet.stellar_radius, 'stellar_radius')}</td>
                    <td className="font-mono text-xs">{formatCellValue(planet.ra, 'ra')}</td>
                    <td className="font-mono text-xs">{formatCellValue(planet.dec, 'dec')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="card-actions justify-center p-6 pt-4">
            <div className="join">
              <button
                className="btn btn-sm join-item"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <Icon icon="lucide:chevron-left" className="w-4 h-4" />
                Previous
              </button>

              <div className="btn btn-sm join-item no-animation cursor-default">
                Page {currentPage} of {totalPages}
              </div>

              <button
                className="btn btn-sm join-item"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Next
                <Icon icon="lucide:chevron-right" className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExoplanetTable;