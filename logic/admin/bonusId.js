const config = require('../../config')

module.exports = async function(context, db) {
    if(context.messagePayload.command == 'getPostId') {
        post = await context.question({
            message: `Введите новый id поста...`
        })
        db.botSettings.bonusPostID = post.text
        
        return context.send({
            message: `✅ Новый пост установлен - ${post.text}`
        })
    } 
}
