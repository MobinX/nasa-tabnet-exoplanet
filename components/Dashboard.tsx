import ExoplanetPredictor from './ExoplanetPredictor';
import FeatureImportanceChart from './FeatureImportanceChart';
import ExoplanetTable from './ExoplanetTable';

const Dashboard = () => {
    return (
        <div data-theme="night" className="bg-base-100 min-h-screen p-4 sm:p-6 md:p-8">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <ExoplanetPredictor />
                    </div>
                    <div>
                        <FeatureImportanceChart />
                    </div>
                </div>

                {/* Exoplanet Table Section */}
                <div className="mt-8">
                    <ExoplanetTable />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;