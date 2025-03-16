const config = require('../../config')
module.exports = async function(context, db) {
    if(context.messagePayload.command == 'getSumBonus') {
        amount = await context.question({
            message: `Введите новую сумму за репост...`
        })
        db.botSettings.bonusPostSum = amount.text
        return context.send({
            message: `✅ Новая сумма бонуса за репост установлена - ${amount.text} VK Coin`
        })
    } 

}