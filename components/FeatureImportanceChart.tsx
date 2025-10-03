import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface FeatureImportance {
  [key: string]: number;
}

const FeatureImportanceChart = () => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/model/tabnet_feature_importances.json');
        if (!response.ok) {
          throw new Error(`Failed to fetch feature_importances.json: ${response.statusText}`);
        }
        const importances: FeatureImportance = await response.json();
        const chartData = Object.entries(importances)
          .map(([name, value]) => ({ name, importance: value }))
          .sort((a, b) => b.importance - a.importance);
        setData(chartData);
      } catch (e: any) {
        console.error('Failed to load feature importances:', e);
        setError(`Error loading feature importances: ${e.message}`);
      }
    };
    fetchData();
  }, []);


  if (error) {
    return (
      <div role="alert" className="alert alert-error">
        <div>
          <h3 className="font-bold">Chart Error</h3>
          <div className="text-xs">{error}</div>
        </div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div data-theme="night" className="bg-base-100 text-base-content h-full flex flex-col items-center  w-full">

      <div className="card w-full bg-base-200 shadow-xl h-full" data-theme="night" >
        <div className="card-body">
          <h2 className="card-title">Model Feature Importances</h2>
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <BarChart
                data={data}
                layout="vertical"
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--b3))" />
                <XAxis type="number" stroke="hsl(var(--bc))" tick={{ fill: 'white' }} />
                <YAxis dataKey="name" type="category" width={120} stroke="hsl(var(--bc))" tick={{ fill: 'white' }} />
                <Tooltip
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--b1))',
                    borderColor: 'hsl(var(--b3))',
                  }}
                  itemStyle={{ color: 'white' }}
                  labelStyle={{ color: 'white' }}
                />
                <Legend wrapperStyle={{ color: 'white' }} />
                <Bar dataKey="importance" name="Importance" className="fill-primary" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureImportanceChart;