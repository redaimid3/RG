const config = require('../../../config')
module.exports = async function (db, vk, context, limits) {
    if (context.eventPayload.command == 'getCoinMarket') {
        vk.api.messages.sendMessageEventAnswer({
            event_id: context.eventId,
            peer_id: context.peerId,
            conversation_message_ids: context.conversationMessageId,
            user_id: context.userId,


            event_data: JSON.stringify({
                type: "open_link",
                link: `https://yoomoney.ru/quickpay/shop-widget?writer=seller&targets=EnjoyGame%20${context.userId}&targets-hint=&default-sum=10&button-text=11&payment-type-choice=on&mobile-payment-type-choice=on&hint=&successURL=&quickpay=shop&account=${config.currencyApiId}&`
              })


        });



    }


}