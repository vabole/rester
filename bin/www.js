/**
 * Created by vabole on 12.12.16.
 */
'use strict';

const app = require('../app');
const http = require('http');
const https = require('https');
const fs = require('fs');
const debug = require('debug')('post-listner:server');

const port = normalizePort(process.env.PORT || '80');
app.set('port', port);


/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.on('error', onError);
server.on('listening', onListening);
server.listen(port);

/**
 * Create HTTPS server
 */

const keyLocation = "/etc/letsencrypt/live/rester.ga/"
let HTTPSoptions = {
    key: fs.readFileSync(keyLocation + "privkey.pem"),
    cert: fs.readFileSync(keyLocation + "cert.pem")
};

const secureServer = https.createServer(HTTPSoptions, app);

secureServer.on('error', onError);
secureServer.on('listening', onListening);
secureServer.listen(443);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}


/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
