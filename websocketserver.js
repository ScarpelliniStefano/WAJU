const WebSocket = require("ws");
const wss = new WebSocket.Server({port: 3000});
let users=[];
const fs = require('fs');

console.log("started on port 3000")

wss.on('connection', function connection(ws){
    users.push(ws);
    console.log(`Utente connesso`)

    ws.on('close', (data) => {
        console.log(`Utente disconnesso`);
    });

    ws.on('open', (data) => {
        console.log(`Utente connesso`);
    });

    ws.on("message", (data, isBinary) => {
        var command=data.split('###')[0];
        if(command=="SAVE"){
            var title=data.split('###')[1];
            var text=data.split('###')[2];
            fs.writeFile(`./src/temp/${title}.txt`, text, error => {
                if (error) {
                    console.error(error);
                    return;
                }
            })
        }else if(command=="OPEN"){
            let title=data.split('###')[1];
            let page=Number(data.split('###')[2].split(',')[0]);
            let size=Number(data.split('###')[2].split(',')[1]);
            fs.readFile(`./src/temp/${title}.txt`, (error, dataRes) => {
                if (error) {
                    console.error(error);
                    return;
                }
                let textStr = new TextDecoder().decode(new Uint8Array(dataRes));
                let jsonData=JSON.parse(textStr);
                let total=Object.keys(JSON.parse(jsonData.tree)).length;
                let valI=page*size;
                let valF=0;
                    if(total-(page*size)<size)
                        valF=total
                    else
                        valF=(page*size)+size
                let jsonInterval=JSON.parse(jsonData.tree).slice(valI,valF);
                wss.clients.forEach( (client) => {
                    if(client === ws && client.readyState === WebSocket.OPEN){
                        client.send(JSON.stringify({datetime:jsonData.datetime,name:jsonData.name,tot:total,initial:valI,final:valF,tree:jsonInterval}),{binary: isBinary});
                    }
                });
            })
        }else if(command=="DELETE"){
            let title=data.split('###')[1];
            fs.unlink(`./tmp/${title}.txt`);
        }else if(command=="WIZARD"){
            wss.clients.forEach( (client) => {
                if(client !== ws && client.readyState === WebSocket.OPEN){
                    client.send(data);
                }
            });
        }else if(command=="CHANGE_COLOR"){
            wss.clients.forEach( (client) => {
                if(client !== ws && client.readyState === WebSocket.OPEN){
                    client.send(data);
                }
            });
        }
            
    });

});
const fsExtra = require('fs-extra')
process.on('SIGINT', function() {
      fsExtra.emptyDirSync("./src/temp");
      wss.clients.forEach( (client) => {
        if(client.readyState === WebSocket.OPEN){
            client.send("SERVER CLOSED");
        }
    });
      process.exit(0);
  });

function sendToWS(message,toWho){
    let founded=false;
    for(var i=0;i<users.length && !founded;i++){
        if(users[i] === toWho){
            founded=true;
            users[i].send(message);
        }
    }
}