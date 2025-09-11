require('dotenv').config()
const express = require('express')
const http = require('http')
const WebSocket = require('ws')

const stockRoutes = require('./routes/stocks')

// init database
require('./db/database-init')

const app = express()
const server = http.createServer(app)

// middlewares
app.use(express.json())
// Simply for debugging
app.use((req, res, next) => {
    console.log(`URL REQUEST : ${req.method} - ${req.path}`);
    next();
})

// api routes
app.use('/api/stocks', stockRoutes);

// WebSocket server
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('New WebSocket client connected');

    ws.on('message', (msg) => {
        console.log('Received:', msg.toString());
    });

    ws.on('close', () => console.log('Client disconnected'));
});

const initialOpen = Math.floor(Math.random() * 100) + 50;

// Updating stocks
setInterval(() => {
    const base = initialOpen * (1 + (Math.random() * 0.1 - 0.05));
    const open = base;
    const close = base + (Math.random() - 0.5) * 10; 
    const high = Math.max(open, close) + Math.random() * 5; 
    const low = Math.min(open, close) - Math.random() * 5;  

    const time = Math.floor(Date.now() / 1000);

    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
                type: "priceUpdate",
                time,
                open: parseFloat(open.toFixed(2)),
                high: parseFloat(high.toFixed(2)),
                low: parseFloat(low.toFixed(2)),
                close: parseFloat(close.toFixed(2))
            }));
        }
    });
}, 1000);


// set up server
server.listen(process.env.PORT, () => {
    console.log(`Listening on http://localhost:${process.env.PORT}`);
});