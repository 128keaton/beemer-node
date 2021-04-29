const bonjour = require("bonjour")();
const buffer = require('buffer');
const udp = require('dgram');

function foundService(service) {
    console.log(service);

    const ipregex = /[0-2]?[0-9]{1,2}\.[0-2]?[0-9]{1,2}\.[0-2]?[0-9]{1,2}\.[0-2]?[0-9]{1,2}/gi;
    const address = service.addresses.find(a => ipregex.test(a));


    connectTo(address, service.port)
}

function connectTo(address, port) {
    browser.stop();

    console.log(address + ':' + port);

    const date = new Date().getTime();
    const beemItem = {
        message: "",
        on: date,
        source: "Node.JS",
        url: "https://www.reddit.com/gallery/n0pf3j",
    }

    const client = udp.createSocket('udp4');
    const data = Buffer.from(JSON.stringify(beemItem));

    console.log(beemItem);
    client.send(data,port,address,function(error){
        if(error){
            console.error(error);
            client.close();
        }else{
            console.log('Data sent !!!');
        }
    });
}

let browser = bonjour.findOne({ protocol: 'udp', type: 'beemer' }, foundService)

