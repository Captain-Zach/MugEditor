const http = require("http");
const WebSocket = require("ws");
const fs = require("fs");
const server = http.createServer();
const wss = new WebSocket.Server({port: 8080});

let thing = [];
fs.readdir(__dirname+"/assets", (err, files) => {
    if(err) return console.log("Nah fam, this shit ain't lit");
    files.forEach(file => {
        thing.push(file);
        console.log(thing);
    })
})

wss.on('connection', ws => {
    console.log("New connection");
    ws.send(JSON.stringify({
        allFileStrings: thing
    }))
    ws.on("message", data => {
        data = JSON.parse(data.data);
        // if()
    })
})