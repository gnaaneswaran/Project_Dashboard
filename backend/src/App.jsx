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
    <div className="w-screen h-screen bg-[#050505] flex items-center justify-center p-6 overflow-hidden">
      <div className="w-full h-full max-w-7xl max-h-[700px]">
        <ClusterMain data={data} />
      </div>
    </div>
  );
}