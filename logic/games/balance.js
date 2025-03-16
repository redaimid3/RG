const {
    Keyboard
} = require('vk-io')
const keyboards = require('../../addons/keyboards')
const util = require('../../addons/util')
const config = require('../../config.js')

module.exports = async function (db, vk, context, limits) {
    if (!context.isChat) return

    // ? Реакция на команду баланс
    if (db.gamesData[context.peerId].convData.isActive == true && context.messagePayload && context.messagePayload.command == 'balance') {

        let text = null

        // Если игра на основной баланс
            if (db.playersData[context.senderId].bbalance <= 0) {
                text = `${db.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? `[id${context.senderId}|${db.playersData[context.senderId].name}]` : `${db.playersData[context.senderId].name}`}, твой баланс: ${util.number_format(db.playersData[context.senderId].balance)}`
            }
            if (db.playersData[context.senderId].bbalance > 0) {
                text = `${db.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? `[id${context.senderId}|${db.playersData[context.senderId].name}]` : `${db.playersData[context.senderId].name}`}, твой баланс: ${util.number_format(db.playersData[context.senderId].balance)}\nБонусный баланс: ${util.number_format(db.playersData[context.senderId].bbalance)}`
            }

            return context.send({
                message: text
            })
        

    }

}