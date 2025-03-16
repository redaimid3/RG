const keyboard = require('../addons/keyboards')
module.exports = async function(db, config, vk, context) {
        if(config.globalAdmins.includes(context.senderId)) {
        	 if (context.text == '!wheel') {
        	   db.gamesData[context.peerId].convData.isActive = true
        	   db.gamesData[context.peerId].convData.gamemode = 'wheel'
        	 	return context.send({
        	 		message: `Wheel установлен`,
        	 		keyboard: keyboard.wheel_keyboard
        	 	})
        	 }
        	 if (context.text == '!dream') {
        	   db.gamesData[context.peerId].convData.isActive = true
        	   db.gamesData[context.peerId].convData.gamemode = 'dreamcatcher'
        	 	return context.send({
        	 		message: `Dream Catcher установлен`,
        	 		keyboard: keyboard.dreamcatcher_keyboard
        	 	})
        	 }
        	 if (context.text == '!b7m') {
        	   db.gamesData[context.peerId].convData.isActive = true
        	   db.gamesData[context.peerId].convData.gamemode = 'down7up'
        	 	return context.send({
        	 		message: `Down 7 Up установлен`,
        	 		keyboard: keyboard.down7up_keyboard
        	 	})
        	 }
        	 if (context.text == '!crash') {
        	   db.gamesData[context.peerId].convData.isActive = true
        	   db.gamesData[context.peerId].convData.gamemode = 'crash'
        	 	return context.send({
        	 		message: `Crash установлен`,
        	 		keyboard: keyboard.crash_keyboard
        	 	})
        	 }
        	 if (context.text == '!dice') {
        	   db.gamesData[context.peerId].convData.isActive = true
        	   db.gamesData[context.peerId].convData.gamemode = 'dice'
        	 	return context.send({
        	 		message: `Dice установлен`,
        	 		keyboard: keyboard.dice_keyboard
        	 	})
        	 }
        	 if (context.text == '!double') {
        	   db.gamesData[context.peerId].convData.isActive = true
        	   db.gamesData[context.peerId].convData.gamemode = 'double'
        	 	return context.send({
        	 		message: `Double установлен`,
        	 		keyboard: keyboard.double_keyboard
        	 	})
        	 }
        }
}