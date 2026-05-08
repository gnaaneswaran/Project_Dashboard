import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import ClusterMain from './components/DigitalCluster/ClusterMain';

const socket = io('http://localhost:4000');

export default function App() {
  const [data, setData] = useState({ speed: 0, battery: 85, temp: 28 });

  useEffect(() => {
    socket.on('VEHICLE_DATA', (payload) => setData(payload));
    return () => socket.off('VEHICLE_DATA');
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-10 overflow-hidden font-sans">
      <div className="w-full max-w-6xl aspect-video">
        <ClusterMain data={data} />
      </div>
    </div>
  );
}