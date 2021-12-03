const WebSocket = require("ws");
const wss = new WebSocket.Server({port: 3000});
const fs = require('fs');

wss.on('connection', function connection(ws){
    console.log("connesso")

    ws.on('close', (data) => {
        console.log("Utente disconnesso");
    });

    ws.on('open', (data) => {
        console.log("Utente connesso");
    });

    ws.on("message", (data, isBinary) => {
        console.log(data);
            let textStr = new TextDecoder().decode(new Uint8Array(data));
            console.log("service")
            let command=textStr.split('###')[0];
            if(command=="SAVE"){
                console.log("save")
                let title=textStr.split('###')[1];
                let text=textStr.split('###')[2];
                fs.writeFile(title+'.txt', text, error => {
                    if (error) {
                        console.error(error);
                        return;
                    }
                })
            }else if(command=="OPEN"){
                console.log("open")
                let title=textStr.split('###')[1];
                let page=Number(textStr.split('###')[2].split(',')[0]);
                let size=Number(textStr.split('###')[2].split(',')[1]);
                console.log(page+ " " + size);
                fs.readFile(title+'.txt', (error, data) => {
                    if (error) {
                        console.error(error);
                        return;
                    }
                    let textStr = new TextDecoder().decode(new Uint8Array(data));
                    let jsonData=JSON.parse(textStr);
                    let total=Object.keys(jsonData.tree).length;
                    let valI=page*size;
                    let valF=(page*size)+size;
                    let jsonInterval=JSON.parse(jsonData.tree).slice(valI,valF);
                    wss.clients.forEach( (client) => {
                        if(client === ws && client.readyState === WebSocket.OPEN){
                            console.log("send")
                            
                            client.send(JSON.stringify({datetime:jsonData.datetime,name:jsonData.name,tot:total,initial:valI,final:valF,tree:jsonInterval}),{binary: isBinary});
                        }
                    });
                })
            }
            
    });

});