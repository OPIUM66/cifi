
// si.cpu()
//   .then(data => console.log(data))
//   .catch(error => console.error(error));

class Wifi {

    constructor() {
        this.init()
    }
    async init() {
        this.wifi = require('node-wifi');
        this.wifi.init({
            iface: null // network interface, choose a random wifi interface if set to null
        });
        this.si = require('systeminformation');
        await this.scrapNetwork()
        await this.test()
    }

    async all() {
        return await new Promise( async (resolve , reject) => {
            try {
                await this.si.wifiNetworks((data) => {                    
                    resolve(data);
                }); 
            } catch (error) {
                console.log('Error while scanning wifi ', error);
                reject(error);
            }
        })
    }

    async scrapNetwork() {
        const wifis = await this.all();
        this.ssids = [];
        this.networks = [];
        wifis.forEach(network => {
            this.networks.push(network);
            this.ssids.push(network.ssid);    
        });
        return this.ssids;
    }
    
    async isConnected(into = false) {
        const current = await this.wifi.getCurrentConnections();
        if (into && typeof into === 'string' && current[0]?.ssid === into) {
            return current[0];
        } else if (current.length > 0) {
            return current;
        } else {
            return false;
        }
    }

    async test() {
        console.log(this.ssids);        
        console.log(this.networks);
    
        await this.wifi.connect({ssid: 'iPhone' , password: 'meowmeow'} , async () => {
            if (this.isConnected()) {
                console.log('Connected');
            } else {
                console.log('Failed to connect');
                
            }
            
            
        })     
    }
}


const wi = new Wifi();
