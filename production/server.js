const express = require('express');
const history = require('connect-history-api-fallback');
const app = express();
const WebSocket = require("ws");
const fs = require('fs');
const path = require('path');
var dir = './tmp';
fs.readdir(dir, (err, files) => {
    if (err) throw err;

    for (const file of files) {
        fs.unlink(`${dir}/${file}`, err => {
            if (err) throw err;
        });
    }
});
const wss = new WebSocket.Server({ port: 3000 });
let users = new Map();



//Web Server
const staticFileMiddleware = express.static('dist');
app.use(staticFileMiddleware);
app.use(history({
    disableDotRule: true,
    verbose: true
}));
app.use(staticFileMiddleware);

const port = 8080;
app.listen(port, () => {
    console.log(`JcoUIWeb App listening on port ${port}!`);
});

//Web Socket Server
function binaryToText(binary) {
    //Convert the binary into an array of binary strings separated by whitespace.
     binary = binary.split(' ');
    //convert from binary to decimals, then to characters. 
    return binary.map(elem => String.fromCharCode(parseInt(elem, 2))).join("");
    }
wss.on('connection', function connection(ws) {
    const arrData = String(ws.protocol).split('###')
    var isThereHome = false
    if (arrData.length > 1){
        wss.clients.forEach((client) => {
            const arrClientData = String(client.protocol).split('###')
            if(arrClientData.length === 1 && isThereHome === false){
                if(arrData[0] === arrClientData[0]){
                    isThereHome = true
                }
            }
        });
        if(isThereHome){
            console.log(`Wizard ID: [${arrData[1]}] User ID: [${arrData[0]}] connected`);
        } else {
            ws.send('CLOSE_HOME###Homepage was closed.');
        }
        
    } else if (arrData.length === 1) {
        console.log(`User ID: [${arrData[0]}] connected`);
    }

    ws.on('close', () => {
        const arrData = String(ws.protocol).split('###')
        if (arrData.length > 1){
            console.log(`Wizard ID: [${arrData[1]}] User ID: [${arrData[0]}] disconnected`);
        } else if (arrData.length === 1) {
            console.log(`User ID: [${arrData[0]}] disconnected`);
        }

        wss.clients.forEach((client) => {
            const arrClientData = String(client.protocol).split('###')
            if(arrClientData.length > 1 && client !== ws && client.readyState === WebSocket.OPEN){
                if(arrData[0] === arrClientData[0]){
                    client.send('CLOSE_HOME###Homepage was closed.');
                }
            }
        });
    });

    ws.on('open', (data) => {
        console.log(`Utente connesso`);
    });

    ws.on("message", (data, isBinary) => {
        data=data.toString();
        var command = data.split('###')[0];
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        if (command == "SAVE") {
            var title = data.split('###')[1];
            var text = data.split('###')[2];
            fs.writeFile(`${dir}/${title}.txt`, text, error => {
                if (error) {
                    console.error(error);
                    return;
                }
            })
        } else if (command == "OPEN") {
            let title = data.split('###')[1];
            let page = Number(data.split('###')[2].split(',')[0]);
            let size = Number(data.split('###')[2].split(',')[1]);
            fs.readFile(`${dir}/${title}.txt`, (error, dataRes) => {
                if (error) {
                    console.error(error);
                    return;
                }
                
                let textStr = new TextDecoder().decode(new Uint8Array(dataRes));
                var jsonData;
                let total = 0;
                try{
                    jsonData = JSON.parse(
                        textStr.replace(/??/gi, "&agrave;")
                    )
                    total=Object.keys(JSON.parse(jsonData.tree)).length;
                }catch(error){
                    wss.clients.forEach((client) => {
                        if (client === ws && client.readyState === WebSocket.OPEN) {
                            client.send("ERROR_PARSE###"+error);
                        }
                    });
                    return;
                }
                if (page * size > total) {
                    page = 0
                }
                let valI = page * size;
                let valF = 0;
                if (total - (page * size) < size)
                    valF = total
                else
                    valF = (page * size) + size
                let jsonInterval = JSON.parse(jsonData.tree).slice(valI, valF);
                wss.clients.forEach((client) => {
                    if (client === ws && client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({ datetime: jsonData.datetime, name: jsonData.name, tot: total, initial: valI, final: valF, tree: jsonInterval }), { binary: isBinary });
                    }
                });
            })
        } else if (command == "DELETE") {
            let title = data.split('###')[1];
            fs.unlink(`${dir}/${title}.txt`);
        } else if (command == "WIZARD") {
            wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(data);
                }
            });
        } else if (command == "CHANGE_COLOR") {
            wss.clients.forEach((client) => {
                const arrClientData = String(client.protocol).split('###')
                if(arrClientData.length > 1 && client !== ws && client.readyState === WebSocket.OPEN){
                    if(String(ws.protocol).split('###')[0] === arrClientData[0]){
                        client.send(data);
                    }
                }
            });
        }

    });

});
const fsExtra = require('fs-extra');
//const { use } = require("vue/types/umd");
process.on('SIGINT', function () {
    fsExtra.emptyDirSync("./src/temp");
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send("SERVER CLOSED");
        }
    });
    process.exit(0);
});

function sendToWS(message, toWho) {
    let founded = false;
    for (var i = 0; i < users.length && !founded; i++) {
        if (users[i] === toWho) {
            founded = true;
            users[i].send(message);
        }
    }
}