const config = require('../../config')
const util = require('../../addons/util')
const { Keyboard } = require('vk-io')

module.exports = async function (db, vk, context, limits) {
    if (context.isChat && context.messagePayload) {
        let command = context.messagePayload.command
       
        if (command == 'privateConv_buyBasic') {

            // Генерация ссылки для оплаты.
            let VKCoinLink = `https://vk.com/coin#x${config.vkCoinId}_${db.botSettings.privateConv.basicAmountVkCoin}_${Number(context.peerId)}`

            return context.send({
                message: `Отлично!\nСтоимость беседы 10.000.000 VK Coin\n\nДля оплаты нажмите на кнопку ниже.`,
                keyboard: Keyboard.builder()
                    .urlButton({
                        label: `Оплатить`,
                        url: VKCoinLink
                    }).inline()
            })
        }
    }
}