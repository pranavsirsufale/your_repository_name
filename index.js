// import express from "express"
// const app = express()
// const port = 3000

// app.get('/',(req,res) => {
//     res.send('hellow world')
// })

// app.get('/login',(req,res)=>{
//     res.send(`<h1>hot reloding there are same because this is the best way</h1>`)
// })


// app.listen(port,()=>{
//     console.log(`Example app listneing on port ${port}`)
// })

import cluster from 'cluster';
import express from 'express';
import os from 'os';
const totalcpu = os.cpus().length;

if (cluster.isPrimary``) {
    const numCPUs = totalcpu // Two replica sets
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
    const app = express();
    app.get(express.json());
    // API logic goes here
    app.listen(3000, () => {
        console.log(`Worker ${process.pid} started`);
    });
}
