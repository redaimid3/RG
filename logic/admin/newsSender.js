const {
    Keyboard
} = require('vk-io')
const keyboards = require('../../addons/keyboards')

module.exports = async function (db, vk, context, limits) {
    if (context.isChat) return
    if (context.messagePayload && context.messagePayload.command == 'getNewsSender') {
        let text = await context.question({
            message: `Введи текст рассылки...`,
            keyboard: Keyboard.builder()
                .textButton({
                    label: 'Отмена',
                    payload: {
                        command: `mainmenu`
                    },
                    color: 'negative'
                })
        })
        if (text.messagePayload || text.length < 1) return context.send({
            message: `Рассылка отменена`,
            keyboard: keyboards.main_menu
        })

        let atach = await context.question({
            message: `Прикрепи вложения (это обязательно)`,
        })
        if (atach.messagePayload || atach.length < 1) return context.send({
            message: `Рассылка отменена`,
            keyboard: keyboards.main_menu
        })

        vk.api.messages.send({
            peer_id: context.senderId,
            random_id: Date.now(),
            message: text.text,
            attachment: atach.text
        })

        let confirm = await context.question({
            message: `Устраивает?`,
            keyboard: Keyboard.builder()
                .textButton({
                    label: `Да`
                }).textButton({
                    label: `Нет`
                })
        })
        if (confirm.text != "Да") {
            return context.send({
                message: `Рассылка отменена`,
                keyboard: keyboards.main_menu
            })
        }
        context.send({
            message: `Рассылка начата`,
            keyboard: keyboards.main_menu
        })
let users = 0;
let ct = 0;
        for (i in db.playersData) {
            if (db.playersData[i].userData.globalSettings.allowNewsMessage == true) {
                await vk.api.messages.send({
                    peer_id: db.playersData[i].id,
                    random_id: Date.now(),
                    message: `${text.text}\n\nОт рассылки всегда можно отписаться. Сделать ты это можешь в настройках бота`,
                    attachment: atach.text,
                }).catch((err) => {

                })
                users += 1
            }
        }
        for (i in db.gamesData) {
            	await vk.api.messages.send({
                    peer_id: db.gamesData[i].id,
                    random_id: Date.now(),
                    message: `${text.text}\n\nСпасибо за внимание.`,
                    attachment: atach.text,
                }).catch((err) => {

                })
                ct += 1
            }
        return context.send({
            message: `😎 Рассылка завершена!\n\nОтправлено: ${users} юзерам\nОтправлено в ${ct} бесед.`
        })
    }
}