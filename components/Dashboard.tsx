import { Icon } from '@iconify/react';
import ExoplanetPredictor from './ExoplanetPredictor';
import FeatureImportanceChart from './FeatureImportanceChart';
import ExoplanetTable from './ExoplanetTable';

const Dashboard = () => {
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
                            <div className="flex flex-wrap justify-center gap-4 text-sm">
                                <div className="badge badge-primary badge-lg">TabNet Architecture</div>
                                <div className="badge badge-secondary badge-lg">8,031 Candidates Analyzed</div>
                                <div className="badge badge-accent badge-lg">Real-time Prediction</div>
                                <div className="badge badge-neutral badge-lg">Feature Importance Analysis</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Project Overview */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    <div className="card bg-base-200 shadow-xl">
                        <div className="card-body text-center">
                            <div className="flex justify-center mb-4">
                                <Icon icon="lucide:brain" className="w-12 h-12 text-primary" />
                            </div>
                            <h3 className="card-title justify-center mb-4">AI Classification</h3>
                            <p className="text-sm text-base-content/70">
                                Our trained TabNet model analyzes 15+ stellar parameters to distinguish
                                between confirmed exoplanets and false positive detections with high accuracy.
                            </p>
                        </div>
                    </div>

                    <div className="card bg-base-200 shadow-xl">
                        <div className="card-body text-center">
                            <div className="flex justify-center mb-4">
                                <Icon icon="lucide:bar-chart-3" className="w-12 h-12 text-secondary" />
                            </div>
                            <h3 className="card-title justify-center mb-4">Feature Analysis</h3>
                            <p className="text-sm text-base-content/70">
                                Understand which stellar characteristics most influence exoplanet detection,
                                providing insights into the physics of planetary formation and detection.
                            </p>
                        </div>
                    </div>

                    <div className="card bg-base-200 shadow-xl">
                        <div className="card-body text-center">
                            <div className="flex justify-center mb-4">
                                <Icon icon="lucide:target" className="w-12 h-12 text-accent" />
                            </div>
                            <h3 className="card-title justify-center mb-4">Priority Ranking</h3>
                            <p className="text-sm text-base-content/70">
                                Process NASA's uncertain candidates to rank them by confirmation probability,
                                optimizing telescope observation time for maximum scientific return.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Workflow Section */}
                <div className="card bg-base-200 shadow-xl mb-12">
                    <div className="card-body">
                        <h2 className="card-title text-3xl mb-8 text-center">
                            <Icon icon="lucide:workflow" className="w-8 h-8 mr-2" />
                            Discovery Workflow
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 steps steps-vertical">
                            <div className="text-center">
                               
                                    <li className="step step-primary">
                                        <div className="text-center">
                                            <Icon icon="lucide:database" className="w-8 h-8 mx-auto mb-2" />
                                            <h4 className="font-semibold">Data Input</h4>
                                            <p className="text-sm text-base-content/70 mt-2">
                                                Enter stellar parameters or adjust sliders to simulate different star systems
                                            </p>
                                        </div>
                                    </li>
                               
                            </div>

                            <div className="text-center">
                                
                                    <li className="step step-primary">
                                        <div className="text-center">
                                            <Icon icon="lucide:cpu" className="w-8 h-8 mx-auto mb-2" />
                                            <h4 className="font-semibold">AI Analysis</h4>
                                            <p className="text-sm text-base-content/70 mt-2">
                                                TabNet model processes features and predicts exoplanet probability with confidence scores
                                            </p>
                                        </div>
                                    </li>
                              
                            </div>

                            <div className="text-center">
                            
                                    <li className="step step-primary">
                                        <div className="text-center">
                                            <Icon icon="lucide:check-circle" className="w-8 h-8 mx-auto mb-2" />
                                            <h4 className="font-semibold">Results</h4>
                                            <p className="text-sm text-base-content/70 mt-2">
                                                Get instant predictions and explore ranked candidates for telescope observation
                                            </p>
                                        </div>
                                    </li>
                           
                            </div>
                        </div>
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