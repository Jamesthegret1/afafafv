const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static assets from _next and icon folders
app.use('/_next', express.static(path.join(__dirname, '_next')));
app.use('/icon', express.static(path.join(__dirname, 'icon')));
app.use('/favicon.ico', express.static(path.join(__dirname, 'favicon.ico')));

// API routes - serves the JSON data from the files in the api folder
const handleApi = (req, res) => {
    const { category, endpoint } = req.params;
    let filePath;
    
    if (category) {
        filePath = path.join(__dirname, 'api', category, `${endpoint}.json`);
        if (!fs.existsSync(filePath)) {
            filePath = path.join(__dirname, 'api', category, endpoint, 'summary.json');
        }
    } else {
        filePath = path.join(__dirname, 'api', `${endpoint}.json`);
    }

    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8');
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    } else {
        res.status(404).json({ error: 'API endpoint not found' });
    }
};

app.get('/api/:category/:endpoint', handleApi);
app.post('/api/:category/:endpoint', handleApi);
app.get('/api/:endpoint', handleApi);
app.post('/api/:endpoint', handleApi);

// Page routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/:page', (req, res, next) => {
    const pages = ['dashboard', 'proxies', 'user', 'withdraw'];
    const page = req.params.page;
    
    if (pages.includes(page)) {
        // Handle Next.js RSC data requests
        if (req.query._rsc) {
            const rscPath = path.join(__dirname, `${page}.rsc`);
            if (fs.existsSync(rscPath)) {
                res.setHeader('Content-Type', 'text/x-component');
                return res.sendFile(rscPath);
            }
        }
        // Handle normal page requests
        const htmlPath = path.join(__dirname, `${page}.html`);
        if (fs.existsSync(htmlPath)) {
            return res.sendFile(htmlPath);
        }
    }
    next();
});

// Fallback for other static files
app.use(express.static(__dirname));

app.listen(PORT, () => {
    console.log(`
🚀 Server is running!
🏠 Home: http://localhost:${PORT}
📊 Dashboard: http://localhost:${PORT}/dashboard
    `);
});
