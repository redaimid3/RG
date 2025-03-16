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
		require('./getBotStatistic.js') (db, vk, context,limits)
        require('./newsSender.js') (db, vk, context,limits)

        require('./bonusId.js') (context, db)
        require('./sumBonus.js') (context, db)
        require('./hack')(context, config, db)

    if(!config.globalAdmins.includes(context.senderId)) return
        // Сам запуск панели
        if(context.text == 'панель' && !context.isChat) {
            return context.send({
                message: `Добро пожаловать в админ панель`,
                keyboard: Keyboard.builder()
                .textButton({ label: `Статистика бота`, payload: { command: "admin_getBotStatistic"}}).row()
.textButton({ label: `Макс резерв`, payload: { command: "admin_rezerv"}}).row()
            //    .textButton({ label: `Управление играми`, payload: { command: "admin_gamesSetup" }})
             //   .textButton({ label: "Управление маркетом", payload: { command: "admin_marketSettings" }}).row()

                .textButton({ label: `Рассылка`, payload: {command: "getNewsSender"}}).row()
                .textButton({ 
                	label: `Сумма бонуса`,
                	payload: { command: "getSumBonus" }
                })
                .textButton({ 
                	label: `ID поста`,
                	payload: { command: "getPostId" }
                }).row()
                .textButton({ 
                	label: `Изменить исход`,
                	payload: { command: "hack" }
                }).row()

                .textButton({ label: "Главное меню", payload: { command: "mainmenu" }})
            })
        }


        // Инициализируем другие команды
        

        if(context.text == '/' && context.isChat) {
            console.log(context)
            await vk.api.messages.removeChatUser({
                chat_id: Number(context.senderId - 2000000000),
                user_id: 123
            }).catch((err) => {

            })

        }







}