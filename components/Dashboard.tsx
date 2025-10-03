import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import ExoplanetPredictor from './ExoplanetPredictor';
import FeatureImportanceChart from './FeatureImportanceChart';
import ExoplanetTable from './ExoplanetTable';

const Dashboard = () => {
    const [showMainContent, setShowMainContent] = useState(false);
    const [showPredictor, setShowPredictor] = useState(false);

    useEffect(() => {
        // Simulate rocket launch animation
        const timer = setTimeout(() => {
            setShowMainContent(true);
        }, 4000); // 5 seconds for demo, adjust as needed

        return () => clearTimeout(timer);
    }, []);

    const handleExperienceAI = () => {
        setShowPredictor(true);
    };

    const handleExploreWork = () => {
        setShowMainContent(true);
    };

    if (!showMainContent) {
        return (
            <div className="fixed inset-0 w-full h-full bg-gradient-to-br from-black via-gray-900 to-purple-900

">
                {/* Full Screen Lottie Animation */}
                <DotLottieReact
                    src="/assets/rocket.lottie"
                    autoplay
                    loop
                    speed={0.7}
                    className="w-full h-full"
                    style={{
                        width: '100vw',
                        height: '100vh',
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        zIndex: 9999
                    }}
                />
            </div>
        );
    }

    if (showPredictor) {
        return (
            <div data-theme="night" className="bg-base-100 min-h-screen p-4 sm:p-6 md:p-8">
                <div className="container mx-auto">
                    {/* Navigation Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center">
                            <button
                                onClick={() => setShowPredictor(false)}
                                className="btn btn-ghost btn-sm mr-4"
                            >
                                <Icon icon="lucide:arrow-left" className="w-5 h-5 mr-2" />
                                Back to Dashboard
                            </button>
                            <div className="flex items-center">
                                <Icon icon="lucide:telescope" className="w-8 h-8 text-primary mr-3" />
                                <div>
                                    <h1 className="text-2xl font-bold">ExoDiscover AI</h1>
                                    <p className="text-sm text-base-content/60">Interactive Exoplanet Predictor</p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowPredictor(false)}
                            className="btn btn-circle btn-ghost btn-sm"
                        >
                            <Icon icon="lucide:x" className="w-5 h-5" />
                        </button>
                    </div>

                    <ExoplanetPredictor />
                </div>
            </div>
        );
    }

    return (
        <div data-theme="night" className="bg-base-100 min-h-screen">
            <div className="container mx-auto p-4 sm:p-6 md:p-8">

                {/* Hero Section */}
                <div className="hero bg-gradient-to-br from-primary/20 via-base-200 to-secondary/20 rounded-box mb-12">
                    <div className="hero-content text-center py-16">
                        <div className="max-w-4xl">
                            <div className="flex justify-center mb-6">
                                <Icon icon="lucide:telescope" className="w-16 h-16 text-primary" />
                            </div>
                            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                ExoDiscover AI
                            </h1>
                            <p className="text-2xl text-base-content/80 mb-8 font-light">
                                Revolutionizing Exoplanet Discovery Through Artificial Intelligence
                            </p>
                            <p className="text-lg text-base-content/70 mb-8 leading-relaxed max-w-3xl mx-auto">
                                Advanced machine learning meets astronomy. Our TabNet classifier analyzes stellar parameters
                                to identify genuine exoplanets from NASA's candidate observations, helping astronomers
                                prioritize telescope time for the most promising discoveries.
                            </p>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <button
                                    onClick={handleExperienceAI}
                                    className="btn btn-primary btn-lg px-8"
                                >
                                    <Icon icon="lucide:sparkles" className="w-5 h-5 mr-2" />
                                    Experience Our AI
                                </button>
                                <button
                                    onClick={handleExploreWork}
                                    className="btn btn-outline btn-lg px-8"
                                >
                                    <Icon icon="lucide:search" className="w-5 h-5 mr-2" />
                                    Explore Our Work
                                </button>
                            </div>

                            <div className="flex flex-wrap justify-center gap-4 text-sm mt-8">
                                <div className="badge badge-primary badge-lg">TabNet Architecture</div>
                                <div className="badge badge-secondary badge-lg">8,031 Candidates Analyzed</div>
                                <div className="badge badge-accent badge-lg">Real-time Prediction</div>
                                <div className="badge badge-neutral badge-lg">Feature Importance Analysis</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Our Research Findings */}
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center mb-6">
                        <Icon icon="lucide:book-open" className="w-12 h-12 text-primary mr-4" />
                        <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Our Research Findings
                        </h2>
                        <Icon icon="lucide:book-open" className="w-12 h-12 text-primary ml-4" />
                    </div>
                   
                </div>

                {/* Main Application Sections */}
                <div className="space-y-12">

                    {/* Interactive Predictor Section */}
                    <div className="card bg-base-200 shadow-xl">
                        <div className="card-body">
                            <div className="flex items-center mb-6">
                                <Icon icon="lucide:sparkles" className="w-6 h-6 mr-3 text-primary" />
                                <h2 className="card-title text-2xl">Interactive Exoplanet Predictor</h2>
                            </div>
                            <p className="text-base-content/70 mb-6">
                                Experience our AI model in action! Adjust the stellar parameters below to see how different
                                star characteristics affect the probability of hosting an exoplanet. This interactive tool
                                demonstrates the decision-making process of our trained TabNet classifier.
                            </p>
                            <div className="bg-base-300/50 p-4 rounded-lg mb-6">
                                <h4 className="font-semibold mb-2 flex items-center">
                                    <Icon icon="lucide:lightbulb" className="w-4 h-4 mr-2" />
                                    How it works:
                                </h4>
                                <ul className="text-sm space-y-1 text-base-content/70">
                                    <li>• Each slider represents a key stellar parameter used in exoplanet detection</li>
                                    <li>• The model analyzes the combination of all parameters simultaneously</li>
                                    <li>• Results show both the prediction and confidence level</li>
                                    <li>• Try adjusting multiple parameters to see how they interact</li>
                                </ul>
                            </div>
                            <ExoplanetPredictor />
                        </div>
                    </div>

                    {/* Feature Importance Section */}
                    <div className="card bg-base-200 shadow-xl">
                        <div className="card-body">
                            <div className="flex items-center mb-6">
                                <Icon icon="lucide:bar-chart-3" className="w-6 h-6 mr-3 text-secondary" />
                                <h2 className="card-title text-2xl">Model Feature Importance</h2>
                            </div>
                            <p className="text-base-content/70 mb-6">
                                Discover which stellar characteristics have the greatest influence on exoplanet detection.
                                This visualization reveals the "decision logic" of our AI model, showing which astronomical
                                measurements are most critical for distinguishing real exoplanets from false positives.
                            </p>
                            <div className="bg-base-300/50 p-4 rounded-lg mb-6">
                                <h4 className="font-semibold mb-2 flex items-center">
                                    <Icon icon="lucide:info" className="w-4 h-4 mr-2" />
                                    Scientific Insight:
                                </h4>
                                <ul className="text-sm space-y-1 text-base-content/70">
                                    <li>• Higher bars indicate features that strongly influence predictions</li>
                                    <li>• Understanding feature importance helps improve detection algorithms</li>
                                    <li>• Reveals which stellar properties are most relevant for exoplanet formation</li>
                                    <li>• Can guide future astronomical observations and research priorities</li>
                                </ul>
                            </div>
                            <FeatureImportanceChart />
                        </div>
                    </div>

                    {/* Candidate Ranking Section */}
                    <div className="card bg-base-200 shadow-xl">
                        <div className="card-body">
                            <div className="flex items-center mb-6">
                                <Icon icon="lucide:list-ordered" className="w-6 h-6 mr-3 text-accent" />
                                <h2 className="card-title text-2xl">NASA Candidate Prioritization</h2>
                            </div>
                            <p className="text-base-content/70 mb-6">
                                Explore how our AI model ranks NASA's uncertain exoplanet candidates. We've processed
                                161 data files containing over 8,000 planet candidates and ranked them by their
                                probability of being genuine exoplanets versus false positives.
                            </p>
                            <div className="bg-base-300/50 p-4 rounded-lg mb-6">
                                <h4 className="font-semibold mb-2 flex items-center">
                                    <Icon icon="lucide:rocket" className="w-4 h-4 mr-2" />
                                    Real-World Impact:
                                </h4>
                                <ul className="text-sm space-y-1 text-base-content/70">
                                    <li>• <strong>8,031 candidates analyzed</strong> - Massive NASA dataset processed</li>
                                    <li>• <strong>161 files processed</strong> - Complete candidate dataset coverage</li>
                                    <li>• <strong>Smart pagination</strong> - Efficient browsing of large datasets</li>
                                    <li>• <strong>Fuzzy search</strong> - Find specific planets across all files instantly</li>
                                    <li>• <strong>Probability ranking</strong> - Helps astronomers prioritize observations</li>
                                    <li>• <strong>Sortable columns</strong> - Analyze by confirmation probability or false positive risk</li>
                                </ul>
                            </div>
                            <ExoplanetTable />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-16 p-8 border-t border-base-300">
                    <div className="flex justify-center items-center mb-4">
                        <Icon icon="lucide:star" className="w-8 h-8 text-primary mr-3" />
                        <h3 className="text-2xl font-bold">Accelerating Discovery</h3>
                    </div>
                    <p className="text-base-content/60 max-w-2xl mx-auto">
                        By combining artificial intelligence with astronomical data, we're helping scientists
                        discover new worlds more efficiently. This tool represents the future of exoplanet
                        research - where machine learning augments human expertise to explore the cosmos.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;