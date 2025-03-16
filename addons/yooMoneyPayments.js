const axios = require('axios')
const validPromise = require('deferred/valid-promise')
const config = require('../config.js')
const util = require('../addons/util')


module.exports = async function (db, vk) {
    // Формируем настройки запроса
    const params = new URLSearchParams()
    params.append('details', true)
    params.append('type', 'deposition')

    const postConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${config.yooMoneyKey}`
        }
    }
    setInterval(async () => {
        let data = await axios.post(`https://yoomoney.ru/api/operation-history`, params, postConfig).then((response) => {
            return response.data
        }).catch((err) => {
            console.error(err)
            return false
        })
        if (!data) return
        for (i in data.operations) {

            if (!db.botSettings.botHistory.YooMoneyHistory[data.operations[i].operation_id] && data.operations[i].message && data.operations[i].message.startsWith(config.botName)) {
                db.botSettings.botHistory.YooMoneyHistory[data.operations[i].operation_id] = {
                    id: data.operations[i].operation_id,
                    amount: data.operations[i].amount,
                    payload: data.operations[i].message,
                    date: util.getTimeStamp()
                }


                let messPayload = data.operations[i].message.split(' ')
                console.log(messPayload)
                if (messPayload[0] == config.botName) {
                    // ? Пополнение баланса
                    if (messPayload[1] == 'BonusCoin') {
                        if (db.playersData[messPayload[2]]) {
                            // Уникальный айди транзакции
                            db.botSettings.botHistory.RepleinishId += Number(1)
                            db.playersData[messPayload[2]].bbalance += Math.floor(data.operations[i].amount * 1000000 / 4.9)
                            // Сообщение пользователю
                            vk.api.messages.send({
                                peer_id: messPayload[2],
                                random_id: Date.now(),
                                message: `🔥 Поступил платёж ${data.operations[i].amount} ₽.\n🚀 Зачислили Вам ${util.number_format(data.operations[i].amount * 1000000 / 4.9)} VkCoin\n\n⚙ ID: ${db.botSettings.botHistory.RepleinishId}`,
                            }).catch((err) => {
                                console.error('VK API Error: ', err)
                            })


                            let a =messPayload[2]
                            let b = data.operations[i].amount
                            // Уведомление администратора
                            for( i in config.globalAdmins) {

                            vk.api.messages.send({
                                message: `[id${a}|Пользователь] купил ${util.number_format(b * 1000000 / 4.9)} VkCoin на ${b} ₽\n(Куплено через YooMoney)`,
                                peer_id: config.globalAdmins[i],
                                random_id: util.random(-2000000000, 2000000000)
                            }).catch((err) => {
                                console.error('VK API Error: ', err)
                            })
                        }
                    }
                    }
                    if (messPayload[1] == 'VirtualCoin') {
                        if (db.playersData[messPayload[2]]) {
                            // Уникальный айди транзакции
                            db.botSettings.botHistory.RepleinishId += Number(1)
                            db.playersData[messPayload[2]].vbalance += Math.floor(data.operations[i].amount * 1000000 / 2.6)
                            // Сообщение пользователю
                            vk.api.messages.send({
                                peer_id: messPayload[2],
                                random_id: Date.now(),
                                message: `🔥 Поступил платёж ${data.operations[i].amount} ₽.\n🚀 Зачислили Вам ${util.number_format(data.operations[i].amount * 1000000 / 2.6)} ${config.botVirtualCurrency}\n\n⚙ ID: ${db.botSettings.botHistory.RepleinishId}`,
                            }).catch((err) => {
                                console.error('VK API Error: ', err)
                            })


                            let a =messPayload[2]
                            let b = data.operations[i].amount
                            // Уведомление администратора
                            for( i in config.globalAdmins) {

                            vk.api.messages.send({
                                message: `[id${a}|Пользователь] купил ${util.number_format(b * 1000000 / 2.6)} ${config.botVirtualCurrency} на ${b} ₽\n(Куплено через YooMoney)`,
                                peer_id: config.globalAdmins[i],
                                random_id: util.random(-2000000000, 2000000000)
                            }).catch((err) => {
                                console.error('VK API Error: ', err)
                            })
                        }
                    }
                    }
                    // ? Покупка частной беседы


                }
            }

        }

    }, 5000)




}
