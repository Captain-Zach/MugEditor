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
    })
})

/*
 We need to compile an image from the data we've gathered on the frontend
 I recommend using JIMP to composite the images. You'll find an identical
 assets folder here in the backend. The input from the frontend will be 
 a JSON object sent through the ws connection. Once that's compiled, send 
 the image back in base_64.
 Image dimensions to follow.  Resolution = 300 DPI
*/