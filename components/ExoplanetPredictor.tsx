import { useState, useEffect } from 'react';
import * as ort from 'onnxruntime-web';
import { Icon } from '@iconify/react';

interface FeatureRanges {
  [key: string]: {
    range: [number, number];
    default?: number;
  };
}

const ExoplanetPredictor = () => {
  const [session, setSession] = useState<ort.InferenceSession | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [predictionScore, setPredictionScore] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [allProbabilities, setAllProbabilities] = useState<number[] | null>(null);
  const [featureRanges, setFeatureRanges] = useState<FeatureRanges | null>(null);
  const [inputValues, setInputValues] = useState<{ [key: string]: number }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [editingFeature, setEditingFeature] = useState<string | null>(null);

  const classNames = ['CONFIRMED', 'FALSE POSITIVE'];

  useEffect(() => {
    const loadResources = async () => {
      try {
        const response = await fetch('/model/feature_ranges.json');
        if (!response.ok) {
          throw new Error(`Failed to fetch feature_ranges.json: ${response.statusText}`);
        }
        const ranges: FeatureRanges = await response.json();
        setFeatureRanges(ranges);

        const initialValues: { [key: string]: number } = {};
        for (const key in ranges) {
          initialValues[key] = ranges[key].default ?? ranges[key].range[0];
        }
        setInputValues(initialValues);

        ort.env.wasm.wasmPaths = {
          "wasm": "/ort-wasm-simd-threaded.jsep.wasm"
        };
        const newSession = await ort.InferenceSession.create('/model/tabnet_exoplanet.onnx');
        setSession(newSession);
        console.log('ONNX model loaded successfully');
      } catch (e: any) {
        console.error('Failed to load resources:', e);
        setError(`Error loading resources: ${e.message}. Please ensure "tabnet_exoplanet.onnx" and "feature_ranges.json" are in the "public/model" folder.`);
      }
    };
    loadResources();
  }, []);

  const handleSliderChange = (feature: string, value: number) => {
    setInputValues(prev => ({ ...prev, [feature]: value }));
  };

  const handleInputUpdate = (feature: string, newValue: string) => {
    if (!featureRanges) return;
    const parsedValue = parseFloat(newValue);
    if (!isNaN(parsedValue)) {
      const [min, max] = featureRanges[feature].range;
      const clampedValue = Math.max(min, Math.min(max, parsedValue));
      handleSliderChange(feature, clampedValue);
    }
    setEditingFeature(null);
  };

  const runInference = async () => {
    if (!session || !featureRanges) {
      setError('Model or feature ranges not loaded yet.');
      return;
    }

    setIsLoading(true);
    setPrediction(null);
    setPredictionScore(null);
    setAllProbabilities(null);
    setError(null);

    try {
      const featureNames = Object.keys(featureRanges);
      const inputData = featureNames.map(feature => inputValues[feature]);

      const tensor = new ort.Tensor('float32', Float32Array.from(inputData), [1, featureNames.length]);
      const feeds = { input: tensor };

      const results = await session.run(feeds);
      const outputTensor = results.output;
      const predictions = outputTensor.data as Float32Array;
      console.log(predictions)

      // Apply softmax to convert logits to probabilities
      const expLogits = predictions.map(logit => Math.exp(logit));
      const sumExpLogits = expLogits.reduce((a, b) => a + b, 0);
      const softmaxProbs = expLogits.map(expLogit => expLogit / sumExpLogits);
      console.log(softmaxProbs)
      const maxProb = Math.max(...softmaxProbs);
      const predictedClassIndex = softmaxProbs.indexOf(maxProb);
      const predictionScore = maxProb * 100;
      
      const predictedClassName = classNames[predictedClassIndex];

      setPrediction(predictedClassName);
      setPredictionScore(predictionScore);
      setAllProbabilities(Array.from(softmaxProbs));
    } catch (e: any) {
      console.error('Failed to run inference:', e);
      setError(`Error during inference: ${e.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!featureRanges || !session) {
    return (
      <div data-theme="night" className="bg-base-100 text-base-content min-h-screen flex flex-col items-center justify-center p-4">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="mt-4">Loading Model & Data...</p>
        {error && (
          <div role="alert" className="alert alert-error mt-4 max-w-xl">
            <Icon icon="lucide:alert-triangle" className="w-6 h-6" />
            <div>
                <h3 className="font-bold">Initialization Error</h3>
                <div className="text-xs">{error}</div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div data-theme="night" className="bg-base-300/50 p-4 rounded-lg text-base-content  flex flex-col items-center  ">
      <div className="card w-full  bg-base-300/50 p-4 rounded-lg shadow-xl">
        <div className="card-body">
            <div className="card-title">
                <h1 className="text-2xl font-bold">TabNet Exoplanet Prediction</h1>
            </div>
          <p className="text-sm text-base-content/70 -mt-2 mb-4">Adjust the stellar parameters to predict the likelihood of an exoplanet.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {Object.keys(featureRanges).map(feature => (
              <div key={feature} className="form-control w-full">
                <label className="label">
                  <span className="label-text">{feature}</span>
                  {editingFeature === feature ? (
                    <input
                      type="number"
                      defaultValue={inputValues[feature]}
                      onBlur={(e) => handleInputUpdate(feature, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          (e.target as HTMLInputElement).blur();
                        }
                      }}
                      className="input input-bordered input-primary input-sm w-28 text-right"
                      autoFocus
                      onFocus={(e) => e.target.select()}
                    />
                  ) : (
                    <span
                      className="label-text-alt text-primary font-semibold cursor-pointer"
                      onClick={() => setEditingFeature(feature)}
                    >
                      {inputValues[feature]?.toFixed(3)}
                    </span>
                  )}
                </label>
                <input
                  type="range"
                  min={featureRanges[feature].range[0]}
                  max={featureRanges[feature].range[1]}
                  value={inputValues[feature]}
                  step={0.001}
                  onChange={(e) => handleSliderChange(feature, parseFloat(e.target.value))}
                  className="range range-primary range-sm"
                />
              </div>
            ))}
          </div>

          <div className="card-actions flex-col items-center gap-4 mt-6">
            <button
              onClick={runInference}
              disabled={isLoading}
              className="btn btn-primary btn-wide btn-lg"
            >
              {isLoading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <Icon icon="lucide:sparkles" className="w-5 h-5" />
              )}
              {isLoading ? 'Analyzing...' : 'Predict'}
            </button>
            
            <div className="w-full max-w-md mt-4 min-h-[90px]">
              {prediction && (
                <div role="alert" className={`alert ${prediction === 'CONFIRMED' ? 'alert-success' : 'alert-warning'}`}>
                  <Icon icon={prediction === 'CONFIRMED' ? 'lucide:check-circle-2' : 'lucide:x-circle'} className="w-6 h-6" />
                  <div>
                    <h3 className="font-bold">Prediction Result</h3>
                    <div className="text-xs">The model predicts this candidate is a <span className="font-semibold">{prediction}</span> exoplanet.</div>
                    {predictionScore !== null && (
                      <div className="text-xs mt-1">Confidence Score: <span className="font-semibold">{predictionScore.toFixed(2)}%</span></div>
                    )}
                    {allProbabilities && (
                        <div className="mt-2">
                            <h4 className="text-xs font-bold">All Class Probabilities:</h4>
                            {allProbabilities.map((prob, index) => (
                                <div key={classNames[index]} className="text-xs">
                                    {classNames[index]}: <span className="font-semibold">{(prob * 100).toFixed(2)}%</span>
                                </div>
                            ))}
                        </div>
                    )}
                  </div>
                </div>
              )}
              {error && (
                <div role="alert" className="alert alert-error">
                  <Icon icon="lucide:alert-circle" className="w-6 h-6" />
                  <div>
                    <h3 className="font-bold">An Error Occurred</h3>
                    <div className="text-xs">{error}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExoplanetPredictor;
