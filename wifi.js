
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
    }

    async all() {
        return await new Promise(async (resolve, reject) => {
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
        return this.networks;
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

    async connect(ssid, password) {

        this.wifi.connect({ ssid, password })
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true)
            }, 2000);
        });
        let status = await this.isConnected(ssid);
        if (!status) {
            return false;
        }
        status = (status[0]) ? status[0] : status
        
            if (status.security === 'Unknown') {
                return false;
            }
            if (status.security_flags === 'None') {
                return false;
            }
            if (status.ssid !== ssid) {
                return false;
            }

            return true

    }
}


module.exports = Wifi;
