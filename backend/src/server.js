const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Initial Vehicle State
let vehicle = { speed: 0, battery: 85, temp: 28, mode: 'SPORT', odo: 4821 };

// Simulation loop: Emits data every 100ms
setInterval(() => {
    // Random speed between 40-65 km/h
    vehicle.speed = Math.floor(Math.random() * 25) + 40; 
    vehicle.battery = Math.max(0, vehicle.battery - 0.001);
    io.emit('VEHICLE_DATA', vehicle);
}, 100);

server.listen(4000, () => console.log('Backend streaming on Port 4000'));