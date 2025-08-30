import React from 'react';
import { Shield, Gauge, Eye, Wifi } from 'lucide-react';

interface SystemHeaderProps {
  isConnected: boolean;
  faceDetected: boolean;
  systemStatus: 'normal' | 'drowsy' | 'critical';
}

const SystemHeader: React.FC<SystemHeaderProps> = ({ 
  isConnected, 
  faceDetected, 
  systemStatus 
}) => {
  const currentTime = new Date().toLocaleTimeString();

  return (
    <div className="bg-gray-900 border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <div className="bg-blue-500 p-2 rounded-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-white text-xl font-bold">Smart Driver Safety</h1>
            <p className="text-gray-400 text-sm">AI-Powered Drowsiness Detection</p>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center space-x-6">
          {/* Camera Status */}
          <div className="flex items-center space-x-2">
            <Eye className={`w-4 h-4 ${faceDetected ? 'text-green-400' : 'text-red-400'}`} />
            <span className="text-sm text-gray-300">
              {faceDetected ? 'Face Detected' : 'No Face'}
            </span>
          </div>

          {/* Connection Status */}
          <div className="flex items-center space-x-2">
            <Wifi className={`w-4 h-4 ${isConnected ? 'text-green-400' : 'text-red-400'}`} />
            <span className="text-sm text-gray-300">
              {isConnected ? 'Connected' : 'Offline'}
            </span>
          </div>

          {/* System Status */}
          <div className="flex items-center space-x-2">
            <Gauge className={`w-4 h-4 ${
              systemStatus === 'critical' ? 'text-red-400' : 
              systemStatus === 'drowsy' ? 'text-yellow-400' : 'text-green-400'
            }`} />
            <span className={`text-sm font-medium ${
              systemStatus === 'critical' ? 'text-red-400' : 
              systemStatus === 'drowsy' ? 'text-yellow-400' : 'text-green-400'
            }`}>
              {systemStatus === 'critical' ? 'CRITICAL' : 
               systemStatus === 'drowsy' ? 'DROWSY' : 'NORMAL'}
            </span>
          </div>

          {/* Time */}
          <div className="text-gray-300 text-sm font-mono">
            {currentTime}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemHeader;