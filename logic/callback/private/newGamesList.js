const { Keyboard } = require('vk-io')
module.exports = async function(db, vk, context, limits) {

    if(context.userId > 0 && context.eventPayload ) {
        if(context.eventPayload.command == 'gamesList_wheel') {
            vk.upload.messagePhoto({
                source: {
                    value: `./pictures/previews/wheel.png`
                }
            }).then((attachment) =>

            vk.api.messages.edit({
                peer_id: context.peerId,
                conversation_message_id: context.conversationMessageId,
                message: `«Wheel» — классическая рулетка с диапазоном чисел 0-36. В нём есть различные варианты исходов с разными коэффициентами.\n\nЧтобы приступить к игре - жми кнопку "Играть"`,
                attachment,
                keyboard: Keyboard.builder()
                .callbackButton({
                    label: `Начать игру`,
                    payload: { command: `gamesList_wheelLink`}
                }).row()
                .callbackButton({
                    label: `⏪`,
                    payload: { command: `gamesList_dreamcatcher`}
                })
                .callbackButton({
                    label: `⏩`,
                    payload: { command: `gamesList_dice`}
                }).inline()
            })
        ).catch((err) => {
            console.log(`Ошибка при отправлке сообщения ${err}`);
        })



        }
    }
}