const bonjour = require("bonjour")();
const udp = require('dgram');
const bplist = require('bplist-creator');

function foundService(service) {
    console.log(service);

    const ipregex = /[0-2]?[0-9]{1,2}\.[0-2]?[0-9]{1,2}\.[0-2]?[0-9]{1,2}\.[0-2]?[0-9]{1,2}/gi;
    const address = service.addresses.find(a => ipregex.test(a));


    connectTo(address, service.port)
}

function connectTo(address, port) {
    browser.stop();

    console.log(address + ':' + port);

    const coreDataTime = (new Date() / 1000) - 978307200;

    console.log(coreDataTime);

    const beemItem = [
        {
            "$version": 100000,
            "$archiver": "NSKeyedArchiver",
            "$top": {"root": {"UID": 1}},
            "$objects": [
                "$null",
                {
                "message": {"UID": 3},
                "source": {"UID": 4},
                "url": {"UID": 2},
                "on": {"UID": 5},
                "$class": {"UID": 7}
            },
                "https://www.reddit.com/gallery/n0pf3j",
                "Uh",
                "Beemer Node",
                {
                "NS.time": coreDataTime,
                "$class": {"UID": 6}
            }, {"$classname": "NSDate", "$classes": ["NSDate", "NSObject"]}, {"$classname": "BeemItem"}]
        }
    ]


    const client = udp.createSocket('udp4');
    const data = bplist(beemItem);

    console.log(beemItem);
    client.send(data, port, address, function (error) {
        if (error) {
            console.error(error);
        } else {
            console.log('Data sent !!!');
        }

        client.close();
        bonjour.destroy()
    });
}

let browser = bonjour.findOne({protocol: 'udp', type: 'beemer'}, foundService)

