var tmpstmpDefault = 0
var isLastDefault = false
var lastDefaultLine = ""

async function getLineFromSongID(id) {
	var fs = require('fs')
	var songData = JSON.parse(fs.readFileSync('songData.json', 'utf8'))

	function getRandomLine(items) {
		return items[Math.floor(Math.random() * items.length)]
	}

	if (typeof(songData[id]) != "undefined") {
		isLastDefault = false
		
		return getRandomLine(songData[id])
	} else {
		isLastDefault = true

		let now = Date.now()
		if ((tmpstmpDefault + (1000 * 60 * 15)) < now) {
			// Refresh every 15 minutes

			tmpstmpDefault = now
			lastDefaultLine = getRandomLine(songData.default)
		} else if (isLastDefault == false) {
			lastDefaultLine = getRandomLine(songData.default)
		}
		
		return lastDefaultLine
	}
}

module.exports = {
	getLineFromSongID
}