const keyboards = require('../../../addons/keyboards.js')
module.exports = async function (db, vk, context, limits) {


    // ? Главный файл объявляющий другие команды



    // Dice 
    require('./dice/even')(db, vk, context, limits)
    require('./dice/noteven')(db, vk, context, limits)
    require('./dice/one')(db, vk, context, limits)
    require('./dice/two')(db, vk, context, limits)
    require('./dice/three')(db, vk, context, limits)
    require('./dice/four')(db, vk, context, limits)
    require('./dice/five')(db, vk, context, limits)
    require('./dice/six')(db, vk, context, limits)


    // Double 
    require('./double/x2')(db, vk, context, limits)
    require('./double/x3')(db, vk, context, limits)
    require('./double/x5')(db, vk, context, limits)
    require('./double/x50')(db, vk, context, limits)

    // Dream Catcher 
    require('./dreamcatcher/x1')(db, vk, context, limits)
    require('./dreamcatcher/x2')(db, vk, context, limits)
    require('./dreamcatcher/x5')(db, vk, context, limits)
    require('./dreamcatcher/x10')(db, vk, context, limits)
    require('./dreamcatcher/x20')(db, vk, context, limits)
    require('./dreamcatcher/x40')(db, vk, context, limits)
    // Down7Up
    require('./down7up/down')(db, vk, context, limits)
    require('./down7up/seven')(db, vk, context, limits)
    require('./down7up/up')(db, vk, context, limits)

    // Wheel
    require('./wheel/red')(db, vk, context, limits)
    require('./wheel/black')(db, vk, context, limits)
    require('./wheel/even')(db, vk, context, limits)
    require('./wheel/noteven')(db, vk, context, limits)
    require('./wheel/int112')(db, vk, context, limits)
    require('./wheel/int1324')(db, vk, context, limits)
    require('./wheel/int2536')(db, vk, context, limits)
    require('./wheel/numbers')(db, vk, context, limits)


}