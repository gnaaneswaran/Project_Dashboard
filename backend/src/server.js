const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Helper to generate realistic CAN data bytes
const getHex = () => Math.floor(Math.random() * 256).toString(16).toUpperCase().padStart(2, '0');

setInterval(() => {
    const timestamp = Date.now();
    const rawSpeed = Math.floor(Math.random() * 10) + 65; // Simulated speed
    
    // Realistic CAN Frame structure
    const frame = {
        timestamp,
        canId: Math.random() > 0.5 ? '0x100' : '0x200',
        dlc: 8,
        data: `${getHex()} ${getHex()} ${getHex()} ${getHex()} 00 00 00 00`,
        decoded: {
            speed: rawSpeed,
            battery: 78,
            temp: 32,
            mode: 'SPORT'
        }
    };
    io.emit('CAN_BUS_DATA', frame);
}, 500);

server.listen(4000, () => console.log('CAN Simulator Active on Port 4000'));