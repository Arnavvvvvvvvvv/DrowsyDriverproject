import React from 'react';
import { MapPin, Navigation, Clock, AlertCircle } from 'lucide-react';

interface RouteMapProps {
  currentSpeed: number;
  drowsinessLevel: 'normal' | 'drowsy' | 'critical';
  eta: string;
}

const RouteMap: React.FC<RouteMapProps> = ({ currentSpeed, drowsinessLevel, eta }) => {
  // Mock route data for demonstration
  const routeData = {
    origin: "Mumbai",
    destination: "Pune",
    totalDistance: "148 km",
    remainingDistance: "87 km"
  };

  const restStops = [
    { id: 1, name: "Lonavala Rest Area", distance: "23 km", type: "rest_area", icon: "🏪" },
    { id: 2, name: "HP Petrol Pump", distance: "31 km", type: "fuel", icon: "⛽" },
    { id: 3, name: "McDonald's", distance: "45 km", type: "restaurant", icon: "🍔" },
    { id: 4, name: "Hotel Sayaji", distance: "67 km", type: "hotel", icon: "🏨" }
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-4 h-full">
      <div className="flex items-center space-x-2 mb-4">
        <Navigation className="w-5 h-5 text-blue-400" />
        <h3 className="text-white font-semibold">Route Overview</h3>
      </div>

      {/* Route Info */}
      <div className="bg-gray-900 rounded-lg p-3 mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-green-400" />
            <span className="text-white text-sm">{routeData.origin}</span>
          </div>
          <div className="text-gray-400 text-xs">→</div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-red-400" />
            <span className="text-white text-sm">{routeData.destination}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-3">
          <div>
            <div className="text-xs text-gray-400">Total Distance</div>
            <div className="text-white font-semibold">{routeData.totalDistance}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400">Remaining</div>
            <div className="text-white font-semibold">{routeData.remainingDistance}</div>
          </div>
        </div>
      </div>

      {/* ETA Section */}
      <div className="bg-gray-900 rounded-lg p-3 mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <Clock className="w-4 h-4 text-blue-400" />
          <span className="text-white text-sm font-semibold">Arrival Time</span>
        </div>
        <div className="text-2xl font-bold text-white">{eta}</div>
        {drowsinessLevel !== 'normal' && (
          <div className="flex items-center space-x-1 mt-1">
            <AlertCircle className="w-3 h-3 text-orange-400" />
            <span className="text-orange-400 text-xs">
              Adjusted for safety (Speed: {currentSpeed} km/h)
            </span>
          </div>
        )}
      </div>

      {/* Recommended Rest Stops */}
      <div className="bg-gray-900 rounded-lg p-3">
        <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
          <span>Upcoming Stops</span>
          {drowsinessLevel !== 'normal' && (
            <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs">
              Recommended
            </span>
          )}
        </h4>
        
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {restStops.map((stop) => (
            <div 
              key={stop.id} 
              className={`flex items-center justify-between p-2 rounded ${
                drowsinessLevel !== 'normal' ? 'bg-blue-500/10 border border-blue-500/30' : 'bg-gray-800'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">{stop.icon}</span>
                <div>
                  <div className="text-white text-sm font-medium">{stop.name}</div>
                  <div className="text-gray-400 text-xs">{stop.distance} ahead</div>
                </div>
              </div>
              {drowsinessLevel !== 'normal' && stop.distance === "23 km" && (
                <div className="bg-yellow-500 text-black text-xs px-2 py-1 rounded font-semibold">
                  STOP HERE
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="mt-4 bg-gray-700 rounded-lg h-32 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-sm mb-1">Interactive Map</div>
          <div className="text-gray-500 text-xs">
            Mumbai → Pune Route
          </div>
          <div className="mt-2 flex justify-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteMap;