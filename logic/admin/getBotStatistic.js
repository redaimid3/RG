const config = require('../../config.js')
const util = require('../../addons/util')
const axios = require('axios')
const { Keyboard } = require('vk-io')

async function getBalance() {
    let data = await axios.post('https://coin-without-bugs.vkforms.ru/merchant/score/', {
        merchantId: config.vkCoinId,
        key: config.vkCoinKey,
        userIds: [ config.vkCoinId ]
    })
    console.log(data.data)
    return data.data.response[config.vkCoinId]
}
module.exports = async function(db, vk, context, limits) {
    // Статистика бота


if(context.messagePayload && context.messagePayload.command == "admin_rezerv") {
let newData = await context.question(`введи новый резерв`)
if(isNaN(newData.text)) return context.send('отмена')
db.botSettings.maxWithdraw.currentAmount = Number(newData.text)
return context.send('ok')
}

if(context.messagePayload && context.messagePayload.command == "admin_getBotStatistic") {
    let allBalances = 0
    let allBonusBalances = 0
    let playersCount = 0
    let botVKCoin = await getBalance()

    for(i in db.playersData) {
        playersCount++
        allBalances += Number(db.playersData[i].balance)
        allBonusBalances += Number(db.playersData[i].bbalance)
    }
    return context.send({
        message: `Статистика бота\n\nОсновные балансы: ${util.number_format(allBalances)}\nБонусные балансы: ${util.number_format(allBonusBalances)}\nВсего игроков: ${playersCount} чел.\n\n\nДоступно к выводу: ${util.number_format(db.botSettings.maxWithdraw.currentAmount)}\nРезерв бота: ${util.number_format(botVKCoin / 1000)} VKCoin`
    })
}
}