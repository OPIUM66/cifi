import express from 'express';
import Wifi from './wifi.js';
import cors from 'cors';
import bodyParser from "body-parser";

const app = express();
const PORT = 4444;
const wifi = new Wifi();
app.use(bodyParser.json());
app.use(cors());

// GET /all - Returns all items (simulates WiFi network scraping)
app.get('/all', async (req, res) => {
    try {
        const networks = await wifi.scrapNetwork();
        res.json({ success: true, data: networks });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch networks' });
    }
});

// GET /connect - Connection check
app.post('/connect', async (req, res) => {
    try {
        const { ssid, password } = req.body;
        const connection = await wifi.connect(ssid, password);
        if (connection) {
            console.log('Connected into ', ssid);
        } else {
            console.log('Failed into ', ssid);
        }

        res.json({ success: connection });
    } catch (error) {
        console.log(error);

        res.status(500).json({ success: false, error: 'Failed to connect' });
    }
});

// GET /check - Status check
app.get('/check', (req, res) => {
    res.json({ success: true, status: 'API is working!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
