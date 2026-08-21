import http from 'http';

const port = 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/msg' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Message endpoint reached');
        console.log(`Request received for URL: ${req.url}`);
        return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Page not found');
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/msg`);
});
