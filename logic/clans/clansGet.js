const {
    Keyboard
} = require('vk-io')
module.exports = async function (db, vk, context, limits) {
    if (context.isChat) return
    if (context.messagePayload) {
        if (context.messagePayload.command == 'clansGet') {
            if (db.playersData[context.senderId].userData.clanData == false) {
                return context.send({
                    message: `Вы пока не состоите в клане :(`,
                    keyboard: Keyboard.builder()
                        .textButton({
                            label: `Создать клан`,
                            payload: {
                                command: 'clansCreate'
                            }
                        }).row()
                        .textButton({
                            label: `Главное меню`,
                            payload: {
                                command: `mainmenu`
                            },
                            color: 'negative'
                        })
                })
            }

            // Админка :3
                if(db.clansData[db.playersData[context.senderId].userData.clanData].clanInfo.clanOwner == context.senderId) {
                    return context.send({
                        message: `Вы перешли в меню клана «${db.clansData[db.playersData[context.senderId].userData.clanData].clanInfo.clanName}»\n\n`,
                        keyboard: Keyboard.builder()
                        .textButton({
                            label: `Статистика`,
                            payload: {
                                command: "getClanStatistic"
                            }
                        })
                    })
                }

                // Простой пользователь
                return context.send({
                    message: `Вы перешли в меню клана «${db.clansData[db.playersData[context.senderId].userData.clanData].clanInfo.clanName}»\n\n`,
                })






        }

    }

}