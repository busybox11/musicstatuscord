require('dotenv').config()

var WebSocketClient = require('websocket').client
var client = new WebSocketClient()

const { sendStatusUpdate } = require('./utils/updateStatus')
const songData = require('./utils/songData')

client.on('connectFailed', function(error) {
    console.log("Couldn't connect to websocket: " + error.toString())
})

client.on('connect', function(connection) {
    console.log('Connected to websocket')

    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString())
    })

    connection.on('close', function() {
        console.log('Connection closed')
    })

    connection.on('message', async function(message) {
        if (message.type === 'utf8') {
            let data = JSON.parse(message.utf8Data)

            let line = await songData.getLineFromSongID(data['id'])
			await sendStatusUpdate(line)
        }
    })
})

client.connect(process.env.WEBSOCKET_URL, 'echo-protocol')