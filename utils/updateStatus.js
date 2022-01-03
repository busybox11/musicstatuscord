function sendStatusUpdate(status) {
  return new Promise((resolve, reject) => {
    require('dotenv').config()

    const https = require('https')
    const options = {
      hostname: 'discord.com',
      port: 443,
      path: '/api/v9/users/@me/settings',
      method: 'PATCH',
      headers: {
        'Authorization': process.env.TOKEN,
        'Content-Type': 'application/json'
      }
    }

    const req = https.request(options, res => {
      let outData

      res.on('data', d => {
        outData += d
      })

      res.on('end', () => {
        resolve(outData)
      })
    })

    req.on('error', error => {
      reject(error)
    })

    req.write(`{"custom_status":{"text":"${status}"}}`)
    req.end()
  })
}


module.exports = {
  sendStatusUpdate
}