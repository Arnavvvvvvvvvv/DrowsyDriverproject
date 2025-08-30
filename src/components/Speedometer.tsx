import React, { useEffect, useState } from 'react';

interface SpeedometerProps {
  currentSpeed: number;
  maxSpeed: number;
  drowsinessLevel: 'normal' | 'drowsy' | 'critical';
}

const Speedometer: React.FC<SpeedometerProps> = ({ currentSpeed, maxSpeed, drowsinessLevel }) => {
  const [animatedSpeed, setAnimatedSpeed] = useState(currentSpeed);

  useEffect(() => {
    const animate = () => {
      setAnimatedSpeed(prev => {
        const diff = currentSpeed - prev;
        if (Math.abs(diff) < 1) return currentSpeed;
        return prev + diff * 0.1;
      });
    };
    
    const interval = setInterval(animate, 50);
    return () => clearInterval(interval);
  }, [currentSpeed]);

  const speedPercentage = (animatedSpeed / maxSpeed) * 100;
  const angle = (speedPercentage / 100) * 240 - 120; // -120 to 120 degrees

  const getSpeedColor = () => {
    if (drowsinessLevel === 'critical') return '#ff3333';
    if (drowsinessLevel === 'drowsy') return '#ffaa00';
    return '#00ff88';
  };

  const getBackgroundGradient = () => {
    if (drowsinessLevel === 'critical') return 'conic-gradient(from 0deg, #ff3333, #ff6666, #ff3333)';
    if (drowsinessLevel === 'drowsy') return 'conic-gradient(from 0deg, #ffaa00, #ffdd44, #ffaa00)';
    return 'conic-gradient(from 0deg, #00ff88, #44ffaa, #00ff88)';
  };

  return (
    <div className="relative w-80 h-80">
      <div 
        className="absolute inset-0 rounded-full opacity-20 animate-pulse"
        style={{ background: getBackgroundGradient() }}
      />
      
      {/* Outer Ring */}
      <div className="absolute inset-4 rounded-full border-4 border-gray-700">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
          {/* Speed arc background */}
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="#374151"
            strokeWidth="8"
            strokeDasharray={`${240 * Math.PI * 80 / 180} ${360 * Math.PI * 80 / 180}`}
            strokeDashoffset={`${60 * Math.PI * 80 / 180}`}
          />
          
          {/* Speed arc */}
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke={getSpeedColor()}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${(speedPercentage * 240 / 100) * Math.PI * 80 / 180} ${360 * Math.PI * 80 / 180}`}
            strokeDashoffset={`${60 * Math.PI * 80 / 180}`}
            className="transition-all duration-300"
          />
        </svg>
        
        {/* Speed markers */}
        {[...Array(9)].map((_, i) => {
          const markerAngle = -120 + (i * 30);
          const markerSpeed = (i * maxSpeed) / 8;
          return (
            <div
              key={i}
              className="absolute text-xs text-gray-400 font-mono"
              style={{
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) rotate(${markerAngle}deg) translateY(-70px) rotate(${-markerAngle}deg)`,
              }}
            >
              {Math.round(markerSpeed)}
            </div>
          );
        })}
        
        {/* Needle */}
        <div
          className="absolute top-1/2 left-1/2 origin-bottom transition-transform duration-300"
          style={{
            width: '4px',
            height: '60px',
            background: getSpeedColor(),
            transform: `translate(-50%, -100%) rotate(${angle}deg)`,
            boxShadow: `0 0 10px ${getSpeedColor()}`,
          }}
        />
        
        {/* Center dot */}
        <div 
          className="absolute top-1/2 left-1/2 w-6 h-6 rounded-full transform -translate-x-1/2 -translate-y-1/2"
          style={{ 
            backgroundColor: getSpeedColor(),
            boxShadow: `0 0 15px ${getSpeedColor()}`,
          }}
        />
      </div>
      
      {/* Digital display */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-black/80 rounded-lg px-4 py-2 border border-gray-600">
        <div className="text-center">
          <div className="text-3xl font-bold text-white font-mono">
            {Math.round(animatedSpeed)}
          </div>
          <div className="text-xs text-gray-400 uppercase">km/h</div>
        </div>
      </div>
      
      {/* Status indicator */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
        <div className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
          drowsinessLevel === 'critical' ? 'bg-red-500/20 text-red-400 border border-red-500' :
          drowsinessLevel === 'drowsy' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500' :
          'bg-green-500/20 text-green-400 border border-green-500'
        }`}>
          {drowsinessLevel === 'critical' ? '🚨 Emergency' : 
           drowsinessLevel === 'drowsy' ? '⚠️ Drowsy' : '✓ Alert'}
        </div>
      </div>
    </div>
  );
};

export default Speedometer;