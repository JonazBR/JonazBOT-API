const fs = require('fs-extra')
const path = require('path')
const https = require('https')
const axios = require('axios').default
const httpsAgent = new https.Agent({ rejectUnauthorized: false });


class utils {
    static getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    static async writeTempFile(buffer, ext) {
        let randomId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        await fs.writeFile(`./temp/${randomId}.${ext}`, buffer)
        setTimeout(() => { 
            fs.unlink(`./temp/${randomId}.${ext}`)
        }, 5 * 1000 * 60)
        return `${randomId}.${ext}`
    }
    static getbase64(url) {
        return axios
            .get(url, {
                responseType: 'arraybuffer'
            })
            .then(response => Buffer.from(response.data, 'binary').toString('base64'))
    }
    static getBuffer(url) {
        return axios
            .get(url, {
                httpsAgent,
                responseType: 'arraybuffer'
            })
            .then((response) => {
                return response.data
            })
            .catch('error', error => console.log(error))
    }

}
module.exports = utils