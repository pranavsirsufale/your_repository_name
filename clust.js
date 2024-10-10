const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
    const numCPUs = 2; // Two replica sets
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} died. Forking a new one.`);
        cluster.fork();
    });
} else {
    // Worker logic (API server)
    startServer();
}

function startServer() {
    const express = require('express');
    const app = express();
    app.use(express.json());
    // API logic goes here
    app.listen(3000, () => {
        console.log(`Worker ${process.pid} started`);
    });
}
