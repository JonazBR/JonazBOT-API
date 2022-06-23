const express = require('express')
const app = express()
const fs = require('fs-extra')
const utils = require('./lib/utils')

function parserUrl(req, ...args) {
    return `${req.protocol}://${req.get('host')}/${args}`
}



app.get('/twtfake', async(req, res) => {
    const twtfake = require('./command/twtfake')
    await twtfake(req.query.username, req.query.text).then(async buffer =>  {
        const file = await utils.writeTempFile(buffer, 'png')
        res.status(200).json({
            status: 'success',
            url: parserUrl(req, `file?fileId=${file}`),
            delete: `This file will be deleted in 5 minutes`
        })
    })

})

app.get('/file', async(req, res) => {
    var filepath = `./temp/${req.query.fileId}`
    let file = await fs.readFile(filepath)
    res.setHeader('Content-Type', 'image/png');
    res.setHeader("Content-Disposition", 'attachment;\ filename=' + 'JonazBOT-' + req.query.fileId );
    res.send(file)
})










const port = process.env.PORT || 8080
app.listen(port, () => { 
    console.log(`listening on port ${port}`)
})

