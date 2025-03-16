const { Keyboard } = require("../../../рассылка/node_modules/vk-io/lib")

module.exports = async function(db, vk, context, limits) {
    if(context.isChat) return
    return context.send({
        message: 'Какой режим хочешь настроить?',
        keyboard: Keyboard.builder
    })




}