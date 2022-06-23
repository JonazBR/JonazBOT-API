const fs = require('fs-extra')
const path = require('path')

class utils {
    static getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static async writeTempFile(buffer, ext) {
        let randomId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        const file = await fs.writeFile(`./temp/${randomId}.${ext}`, buffer)
        setTimeout(() => {
            fs.unlink(`./temp/${randomId}.${ext}`)
        }, 5000)
        return path.join(__dirname, `./temp/${randomId}.${ext}`)
    }


}

module.exports = utils