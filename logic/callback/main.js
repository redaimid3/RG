module.exports = async function(db, vk, context, limits) {
    // Новое меню выбора игр
        require('./private/newGamesList') (db, vk, context, limits)
        require('./private/getShopLink') (db, vk, context, limits)

}