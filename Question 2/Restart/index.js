'use strict'

const fastify = require('fastify')
var usage       = require('usage');
const app = fastify()
const PORT = 3000

const myRoute = require('./myRoute')

const Inspector = require('inspector-api');
const inspector = new Inspector({
  storage: {
    type: "s3",
    bucket: process.env.CONFIG_S3_BUCKET,
    dir: 'inspector'
  }
})
inspector.profiler.enable()

const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:3002');

ws.on('message', (msg) => {
    if(msg === 'connection') {
        console.info('Connected to WS server.')
    } else if(msg === 'start_cpu_profiling') {
        inspector.profiler.start()
    } else if(msg === 'stop_cpu_profiling') {
        inspector.profiler.stop()
        console.info('Cpu profile sent!')
    }
});

// route
app.get('/myRoute', myRoute)

// 404
app.all('/*', (request, reply) => {
  reply.code(404).send({msg: '404 not found', data: null})
})

app.listen(PORT, (err) => {
    if (err) throw err
    console.info(`listening on port ${PORT}`)
})




CHECK_CPU_USAGE_INTERVAL    = 1000*60; // every minute
HIGH_CPU_USAGE_LIMIT        = 70; // percentage

autoRestart = setInterval(function()
{
    usage.lookup(process.pid, function(err, result) 
    {
        if(!err)
        {
            if(result.cpu > HIGH_CPU_USAGE_LIMIT)
            {
                // log
                console.log('restart due to high cpu usage');

                // restart because forever will respawn your process
                process.exit();
            }
        }
    });
}, CHECK_CPU_USAGE_INTERVAL);