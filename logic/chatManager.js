const util = require('../addons/util')
const config = require('../config.js')

// Инициализация компонентов чат-менеджера + возможность модерации

module.exports = async function (db, vk, context, limits, next) {

    if (context.isChat && !context.isOutbox && db.gamesData[context.peerId]?.convData.convType == 'official') {
        // ! Проверка на репост какого-то поста :(
        if (context.attachments?.length > 0) {
            for(i in context.attachments) {
                if(!context.attachments[i]?.postType) return
                            }
            console.log(context.attachments[0].StickerAttachment)
            if (context.attachments[0]?.ownerId != -Number(config.botPollingGroupId)) {
                if (!db.gamesData[context.peerId].convSettings.chatManager.otherData[context.senderId]) {
                    db.gamesData[context.peerId].convSettings.chatManager.otherData[context.senderId] = {
                        id: context.senderId,
                        peerId: context.peerId,
                        warns: 0
                    }
                }
                db.gamesData[context.peerId].convSettings.chatManager.otherData[context.senderId].warns += Number(1)
                await vk.api.messages.delete({
                    conversation_message_ids: context.conversationMessageId,
                    delete_for_all: Number(1),
                    peer_id: context.peerId
                }).catch((err) => {
                    console.error('Ошибка при удалении сообщения:', err)
                })

                if (db.gamesData[context.peerId].convSettings.chatManager.otherData[context.senderId].warns < 2) {
                     context.send({
                        message: `[id${context.senderId}|Вам] было выдано предупреждение (${db.gamesData[context.peerId].convSettings.chatManager.otherData[context.senderId].warns}/3)`
                    }).catch((err) => {
                        console.error('Ошибка VKApi:', err)
                    })
                    return next()

                }
                if (db.gamesData[context.peerId].convSettings.chatManager.otherData[context.senderId].warns > 2) {
                    await vk.api.messages.removeChatUser({
                        chat_id: Number(context.peerId - 2000000000),
                        user_id: context.senderId
                    }).catch((err) => {
                        console.error('Ошибка при удалении сообщения:', err)
                    })
                     context.send({
                        message: `[id${context.senderId}|Вам] было выдано предупреждение (${db.gamesData[context.peerId].convSettings.chatManager.otherData[context.senderId].warns}/3). Вы будете исключены из беседы`
                    }).catch((err) => {
                        console.error('Ошибка VKApi:', err)
                    })
                    return next()

                }
            }
        }

        // ! Проверка на ссылку
        if (context.text && util.checkLink(context.text) == true) {
            console.log(1)
            if (!db.gamesData[context.peerId].convSettings.chatManager.otherData[context.senderId]) {
                db.gamesData[context.peerId].convSettings.chatManager.otherData[context.senderId] = {
                    id: context.senderId,
                    peerId: context.peerId,
                    warns: 0
                }
            }
            db.gamesData[context.peerId].convSettings.chatManager.otherData[context.senderId].warns += Number(1)
            await vk.api.messages.delete({
                conversation_message_ids: context.conversationMessageId,
                delete_for_all: Number(1),
                peer_id: context.peerId
            }).catch((err) => {
                console.error('Ошибка при удалении сообщения:', err)
            })

            if (db.gamesData[context.peerId].convSettings.chatManager.otherData[context.senderId].warns < 2) {
             context.send({
                    message: `[id${context.senderId}|Вам] было выдано предупреждение (${db.gamesData[context.peerId].convSettings.chatManager.otherData[context.senderId].warns}/3)`
                }).catch((err) => {
                    console.error('Ошибка при удалении сообщения:', err)
                })
                return next()
            }
            if (db.gamesData[context.peerId].convSettings.chatManager.otherData[context.senderId].warns > 2) {
                await vk.api.messages.removeChatUser({
                    chat_id: Number(context.peerId - 2000000000),
                    user_id: context.senderId
                }).catch((err) => {
                    console.error('Ошибка VKApi:', err)
                })
             context.send({
                    message: `[id${context.senderId}|Вам] было выдано предупреждение (${db.gamesData[context.peerId].convSettings.chatManager.otherData[context.senderId].warns}/3). Вы будете исключены из беседы`
                }).catch((err) => {
                    console.error('Ошибка VKApi:', err)
                })
                return next()
            }
        }
    }
    next()
}