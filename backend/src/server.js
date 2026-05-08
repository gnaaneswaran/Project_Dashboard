const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

let vehicle = { speed: 0, battery: 78, temp: 28, mode: 'SPORT', odo: 4821 };

setInterval(() => {
    // Simulates a realistic speed fluctuation
    vehicle.speed = Math.floor(Math.random() * 5) + 65; 
    vehicle.battery = Math.max(0, vehicle.battery - 0.001);
    io.emit('VEHICLE_DATA', vehicle);
}, 100);

server.listen(4000, () => console.log('Data Engine running on Port 4000'));