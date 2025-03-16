const {
    Keyboard
} = require('vk-io')
const keyboards = require('../../addons/keyboards')
const util = require('../../addons/util')
module.exports = async function (db, vk, context, limits) {
    if (context.isChat) return
    if (context.messagePayload) {
        if (context.messagePayload.command == 'clansCreate') {
            if (db.playersData[context.senderId].userData.clanData == false) {
                if (db.playersData[context.senderId].balance < db.botSettings.clansSettings.clansPrice) {
                    return context.send({
                        message: `У тебя недостаточно средств для создания клана. Стоимость создания ${util.number_format(db.botSettings.clansSettings.clansPrice)} коинов`
                    })
                }
                let name = await context.question({
                    message: `Введи название своего будущего клана :3`,
                    keyboard: Keyboard.builder()
                        .textButton({
                            label: `Главное меню`,
                            payload: {
                                command: "mainmenu"
                            },
                            color: 'negative'
                        })
                })
                if (name.messagePayload) return context.send({
                    message: `Такое название нельзя использовать :(`,
                    keyboard: keyboards.main_menu
                })
                if (name.text.length < 3) return context.send({
                    message: `Название клана не может быть короче 3-х символов`,
                    keyboard: keyboards.main_menu
                })
                if (name.text.length > 15) return context.send({
                    message: `Название клана не может быть длинее 15-ти символов`,
                    keyboard: keyboards.main_menu
                })

                // Списывание средств
                if (db.playersData[context.senderId].balance < db.botSettings.clansSettings.clansPrice) {
                    return context.send({
                        message: `У тебя недостаточно средств для создания клана. Стоимость создания ${util.number_format(db.botSettings.clansSettings.clansPrice)} коинов`
                    })
                }
                
                db.playersData[context.senderId].balance -= Number(db.botSettings.clansSettings.clansPrice)
                let unicalNumber = 0
                for (i in db.clansData) {
                    unicalNumber++
                }
                db.clansData[Number(unicalNumber + 1)] = {
                    id: Number(unicalNumber + 1),
                    balance: 0,
                    clanInfo: {
                        clanName: name.text,
                        clanShortName: false,
                        clanOwner: context.senderId,
                        clanDescription: false
                    },
                    clanStatistics: {
                        winAllTime: 0,
                        loseAllTime: 0,
                        winDay: 0,
                        loseDay: 0,
                        winWeek: 0,
                        loseWeek: 0
                    },
                    members: []
                }
                db.clansData[Number(unicalNumber + 1)].members.push(context.senderId)
                db.playersData[context.senderId].userData.clanData = Number(unicalNumber + 1)
                return context.send({
                    message: `Клан «${name.text}» успешно создан!`,
                    keyboard: Keyboard.builder()
                    .textButton({
                        label: `Статистика`,
                        payload: {
                            command: "getClanStatistic"
                        }
                    })           
                     })


            }
        }

    }

}