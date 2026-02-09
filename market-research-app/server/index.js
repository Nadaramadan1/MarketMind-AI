const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Logging Middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date() });
});

// Proxy Endpoint for n8n
app.post('/api/start-analysis', async (req, res) => {
    const n8nUrl = process.env.N8N_WEBHOOK_URL;
    const apiKey = process.env.N8N_API_KEY;

    if (!n8nUrl) {
        console.error('❌ Error: N8N_WEBHOOK_URL is not defined in .env');
        return res.status(500).json({ error: 'Server configuration error' });
    }

    console.log('🔄 Forwarding request to n8n workflow...');
    console.log('📦 Payload:', JSON.stringify(req.body, null, 2));

    // Validate payload
    if (!req.body || Object.keys(req.body).length === 0) {
        console.warn('⚠️ Warning: Request body is empty!');
    }

    try {
        const headers = {
            'Content-Type': 'application/json',
        };

        // Add API Key if configured
        if (apiKey) {
            headers['x-api-key'] = apiKey;
        }

        const response = await axios.post(n8nUrl, req.body, { headers });

        console.log('✅ Success! Response from n8n received.');
        // Forward the n8n response back to the client
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('❌ Error forwarding to n8n:', error.message);

        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            res.status(error.response.status).json(error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
            res.status(504).json({ error: 'Timeout waiting for n8n response' });
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error config:', error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📡 Ready to proxy requests to n8n`);
});
