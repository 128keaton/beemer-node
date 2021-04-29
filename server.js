const mdns = require('mdns');
const udp = require('dgram');
const bplist = require('bplist-parser');
const port = 60742
const ad = mdns.createAdvertisement(mdns.udp('beemer', 'local'), port);
ad.start();

const server = udp.createSocket({type: 'udp6', reuseAddr:true});

server.on('listening', function () {
    console.log('Listening..', port);
});

server.on('message', function (buffer, info) {
    (async () => {
    const obj = await bplist.parseBuffer(buffer);
       const objects =  obj[0]['$objects'];
       const url = objects[2];
       const message = objects[3];
       const source = objects[4];
       const coreDataTime = objects[5]['NS.time'];
       const date = new Date(1000 * (coreDataTime + 978307200));

       console.log({
           url,
           message,
           source,
           date
       })
    })();
});

server.on('close',function(){
    console.log('Bye!');
});

server.bind(port);
