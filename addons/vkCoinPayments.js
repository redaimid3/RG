const axios = require('axios')
const config = require('../config.js')
const util = require('./util')

module.exports = async function (db, vk) {
    setInterval(async () => {
        let {
            data
        } = await axios.post(`https://coin-without-bugs.vkforms.ru/merchant/tx/`, {
            merchantId: config.vkCoinId,
            key: config.vkCoinKey,
            tx: [1]
        }).then((response) => {
            return response
        }).catch((err) => {
            console.error(err)
            return false
        })
        if (!data) return
        for (i in data.response) {
            if (!db.botSettings.botHistory.vkCoinHistory[data.response[i].id]) {
                // ! Покупка баланса
                if (data.response[i].amount >= 1000) {
                	if (data.response[i].payload == 777) {
                    db.botSettings.botHistory.vkCoinHistory[data.response[i].id] = {
                        id: data.response[i].id,
                        from_id: data.response[i].from_id,
                        payload: data.response[i].payload,
                        amount: Number(data.response[i].amount),
                        realAmount: Math.floor(data.response[i].amount / 1000),
                        transDate: util.getTimeStamp()
                    }
                    if (db.playersData[data.response[i].from_id]) {
                        // Уникальный айди транзакции
                        db.botSettings.botHistory.RepleinishId += Number(1)
                        // Начисление баланса
                        db.playersData[data.response[i].from_id].balance += Math.floor(data.response[i].amount / 1000)
                        // Сообщение пользователю   
                        vk.api.messages.send({
                            peer_id: data.response[i].from_id,
                            message: `🔥 Поступил платёж ${util.number_format(data.response[i].amount / 1000)} VKCoin.\n⚙ Номер платежа: ${db.botSettings.botHistory.RepleinishId}`,
                            random_id: Date.now()
                        }).catch((err) => {
                            console.error(err)
                        })

                        let a = data.response[i].from_id
                        let b = data.response[i].amount / 1000
			db.botSettings.maxWithdraw.currentAmount += Math.floor(b)
                        // Уведомление администратора
                        for( i in config.globalAdmins) {
                        vk.api.messages.send({
                            message: `🔥 [id${a}|Пользователь] пополнил ${util.number_format(b)} VkCoin.\n⚙ Номер платежа: ${db.botSettings.botHistory.RepleinishId}`,
                            peer_id: config.globalAdmins[i],
                            random_id: util.random(-2000000000, 2000000000)
                        }).catch((err) => {
                            console.error('VK API Error: ', err)
                        })
                    }
                }
           } else {
           let amount = data.response[i].amount / 1000
               if (amount < 10000000) return;
				let cid = data.response[i].payload
				let user = data.response[i].from_id
				db.gamesData[cid].convData.isActive = true
				db.gamesData[cid].convData.gamemode = 'wheel'
				
				vk.api.messages.send({
                       message: `✅ Беседа была успешно приобретена!\n Режим беседы - Wheel`,
                            peer_id: cid,
                            random_id: util.random(-2000000000, 2000000000),
                            keyboard: keyboard.wheel_keyboard
                        }).catch((err) => {
                            console.error('VK API Error: ', err)
                        })
                        for( i in config.globalAdmins) {
                        vk.api.messages.send({
                            message: `🔥 [id${user}|Пользователь] приобрёл беседу!\nID беседы: ${uid}`,
                            peer_id: config.globalAdmins[i],
                            random_id: util.random(-2000000000, 2000000000)
                        }).catch((err) => {
                            console.error('VK API Error: ', err)
                        })
                    }
               
           }
                }
	        }
        }

    }, 5000)
}