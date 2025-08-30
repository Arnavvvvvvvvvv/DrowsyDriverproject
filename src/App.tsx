import React, { useState, useEffect, useCallback } from 'react';
import CameraFeed from './components/CameraFeed';
import Speedometer from './components/Speedometer';
import AlertSystem from './components/AlertSystem';
import RouteMap from './components/RouteMap';
import SystemHeader from './components/SystemHeader';

function App() {
  const [eyeOpenness, setEyeOpenness] = useState(100);
  const [faceDetected, setFaceDetected] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(80);
  const [maxSpeed, setMaxSpeed] = useState(100);
  const [drowsinessLevel, setDrowsinessLevel] = useState<'normal' | 'drowsy' | 'critical'>('normal');
  const [eta, setEta] = useState('2:30 PM');
  const [isConnected, setIsConnected] = useState(true);

  const calculateDrowsinessLevel = useCallback((openness: number) => {
    if (openness <= 25) return 'critical';
    if (openness <= 50) return 'drowsy';
    return 'normal';
  }, []);

  useEffect(() => {
    const newLevel = calculateDrowsinessLevel(eyeOpenness);
    setDrowsinessLevel(newLevel);
  }, [eyeOpenness, calculateDrowsinessLevel]);

  useEffect(() => {
    let targetSpeed = maxSpeed;
    
    if (drowsinessLevel === 'critical') {
      targetSpeed = 0;
    } else if (drowsinessLevel === 'drowsy') {
      targetSpeed = Math.max(30, maxSpeed * 0.3);
    } else {
      targetSpeed = maxSpeed;
    }

    const adjustSpeed = () => {
      setCurrentSpeed(prevSpeed => {
        const diff = targetSpeed - prevSpeed;
        if (Math.abs(diff) < 1) return targetSpeed;
        return prevSpeed + diff * 0.05;
      });
    };

    const interval = setInterval(adjustSpeed, 100);
    return () => clearInterval(interval);
  }, [drowsinessLevel, maxSpeed]);

  // Update ETA based on speed changes
  useEffect(() => {
    const baseETA = new Date();
    baseETA.setHours(baseETA.getHours() + 2);
    baseETA.setMinutes(baseETA.getMinutes() + 30);

    if (drowsinessLevel === 'drowsy') {
      baseETA.setMinutes(baseETA.getMinutes() + 15);
    } else if (drowsinessLevel === 'critical') {
      baseETA.setMinutes(baseETA.getMinutes() + 45);
    }

    setEta(baseETA.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  }, [drowsinessLevel]);

  // Handle eye openness updates from camera
  const handleEyeOpenness = useCallback((openness: number) => {
    setEyeOpenness(openness);
  }, []);

  const handleFaceDetected = useCallback((detected: boolean) => {
    setFaceDetected(detected);
    if (!detected) {
      setEyeOpenness(0);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <SystemHeader 
        isConnected={isConnected}
        faceDetected={faceDetected}
        systemStatus={drowsinessLevel}
      />
      
      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          {/* Left Column - Camera and Alerts */}
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-white font-semibold mb-4 flex items-center space-x-2">
                <span>👁️</span>
                <span>Driver Monitoring</span>
              </h2>
              <CameraFeed 
                onEyeOpenness={handleEyeOpenness}
                onFaceDetected={handleFaceDetected}
              />
            </div>
            
            <AlertSystem 
              drowsinessLevel={drowsinessLevel}
              eyeOpenness={eyeOpenness}
              currentSpeed={currentSpeed}
              eta={eta}
            />
          </div>

          {/* Center Column - Speedometer */}
          <div className="flex items-center justify-center">
            <div className="bg-gray-800 rounded-lg p-8">
              <Speedometer 
                currentSpeed={currentSpeed}
                maxSpeed={maxSpeed}
                drowsinessLevel={drowsinessLevel}
              />
            </div>
          </div>

          {/* Right Column - Route and Map */}
          <div>
            <RouteMap 
              currentSpeed={currentSpeed}
              drowsinessLevel={drowsinessLevel}
              eta={eta}
            />
          </div>
        </div>
      </div>
      
      {/* Footer Stats */}
      <div className="bg-gray-800 border-t border-gray-700 px-6 py-4 mt-6">
        <div className="grid grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-400">{Math.round(eyeOpenness)}%</div>
            <div className="text-xs text-gray-400">Eye Openness</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-400">{Math.round(currentSpeed)}</div>
            <div className="text-xs text-gray-400">Current Speed (km/h)</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-400">{eta}</div>
            <div className="text-xs text-gray-400">Estimated Arrival</div>
          </div>
          <div>
            <div className={`text-2xl font-bold ${
              drowsinessLevel === 'critical' ? 'text-red-400' :
              drowsinessLevel === 'drowsy' ? 'text-yellow-400' : 'text-green-400'
            }`}>
              {drowsinessLevel === 'critical' ? '🚨' : 
               drowsinessLevel === 'drowsy' ? '⚠️' : '✅'}
            </div>
            <div className="text-xs text-gray-400">Safety Status</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;