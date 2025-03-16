const config = require('../config')
const util = require('../addons/util')
const {
    Keyboard
} = require('vk-io')


// Dream Catcher
exports.getDreamCatcherAdminMenu = function getDreamCatcherAdminMenu(db, vk, context, limits, _coin, type) {
    vk.api.messages.send({
        message: `Игрок [id${context.senderId}|${db.playersData[context.senderId].name}] сделал ставку в Dream Catcher на коэффициент ${type}\n\nРазмер ставки: ${util.number_format(_coin)}\n\nИсход: ${db.gamesData[context.peerId].convGame.resultData.result}\nДо конца раунда: ${util.unixStampLeft(db.gamesData[context.peerId].convGame.timeNow)}`,
        keyboard: Keyboard.builder()
            .textButton({
                label: `x1`,
                payload: {
                    command: `admin_Change_dreamcatcher_${context.peerId}_x1`
                }
            })
            .textButton({
                label: `x2`,
                payload: {
                    command: `admin_Change_dreamcatcher_${context.peerId}_x2`
                }
            }).row()
            .textButton({
                label: `x5`,
                payload: {
                    command: `admin_Change_dreamcatcher_${context.peerId}_x5`
                }
            })
            .textButton({
                label: `x10`,
                payload: {
                    command: `admin_Change_dreamcatcher_${context.peerId}_x10`
                }
            }).row()
            .textButton({
                label: `x20`,
                payload: {
                    command: `admin_Change_dreamcatcher_${context.peerId}_x20`
                }
            })
            .textButton({
                label: `x40`,
                payload: {
                    command: `admin_Change_dreamcatcher_${context.peerId}_x40`
                }
            }).row()
            .inline(),
        peer_id: config.adminConv,
        random_id: util.random(-20000000000, 2000000000000)
    }).catch((err) => {
        console.log(`Ошибка при отправке админ подкрутки ${err}`);
    })
}

// Crash
exports.getcrashAdminMenu = function getDreamCatcherAdminMenu(db, vk, context, limits, _coin, type) {
    vk.api.messages.send({
        message: `Игрок [id${context.senderId}|${db.playersData[context.senderId].name}] сделал ставку в Crash на коэффициент ${type}\n\nРазмер ставки: ${util.number_format(_coin)}\n\nИсход: ${db.gamesData[context.peerId].convGame.resultData.result}\nДо конца раунда: ${util.unixStampLeft(db.gamesData[context.peerId].convGame.timeNow)}`,
        keyboard: Keyboard.builder()
            .textButton({
                label: `x1.00`,
                payload: {
                    command: `admin_Change_crash_${context.peerId}_1.00`
                }
            })
            .textButton({
                label: `x1.25`,
                payload: {
                    command: `admin_Change_crash_${context.peerId}_1.25`
                }
            }).row()
            .textButton({
                label: `x1.50`,
                payload: {
                    command: `admin_Change_crash_${context.peerId}_1.50`
                }
            })
            .textButton({
                label: `x2.00`,
                payload: {
                    command: `admin_Change_crash_${context.peerId}_2.00`
                }
            }).row()
            .textButton({
                label: `x3`,
                payload: {
                    command: `admin_Change_crash_${context.peerId}_3.00`
                }
            })
            .textButton({
                label: `x100`,
                payload: {
                    command: `admin_Change_crash_${context.peerId}_100.00`
                }
            }).row()
            .inline(),
        peer_id: config.adminConv,
        random_id: util.random(-20000000000, 2000000000000)
    }).catch((err) => {
        console.log(`Ошибка при отправке админ подкрутки ${err}`);
    })
}

// Down7Up 
exports.getDown7UpAdminMenu = function getDown7UpAdminMenu(db, vk, context, limits, _coin, type) {
    vk.api.messages.send({
        message: `Игрок [id${context.senderId}|${db.playersData[context.senderId].name}] сделал ставку в Down7Up на ${type}\n\nРазмер ставки: ${util.number_format(_coin)}\n\nИсход: ${db.gamesData[context.peerId].convGame.resultData.result}\nДо конца раунда: ${util.unixStampLeft(db.gamesData[context.peerId].convGame.timeNow)}`,
        keyboard: Keyboard.builder()
            .textButton({
                label: `< 7`,
                payload: {
                    command: `admin_Change_down7up_${context.peerId}_3`
                }
            })
            .textButton({
                label: `= 7`,
                payload: {
                    command: `admin_Change_down7up_${context.peerId}_7`
                }
            })
            .textButton({
                label: `> 7`,
                payload: {
                    command: `admin_Change_down7up_${context.peerId}_10`
                }
            })
            .inline(),
        peer_id: config.adminConv,
        random_id: util.random(-20000000000, 2000000000000)
    }).catch((err) => {
        console.log(`Ошибка при отправке админ подкрутки ${err}`);
    })
}


// Double 
exports.getDoubleAdminMenu = function getDoubleAdminMenu(db, vk, context, limits, _coin, type) {
    vk.api.messages.send({
        message: `Игрок [id${context.senderId}|${db.playersData[context.senderId].name}] сделал ставку в Double на ${type}\n\nРазмер ставки: ${util.number_format(_coin)}\n\nИсход: ${db.gamesData[context.peerId].convGame.resultData.result}\nДо конца раунда: ${util.unixStampLeft(db.gamesData[context.peerId].convGame.timeNow)}`,
        keyboard: Keyboard.builder()
            .textButton({
                label: `x2`,
                payload: {
                    command: `admin_Change_double_${context.peerId}_x2`
                }
            })
            .textButton({
                label: `x3`,
                payload: {
                    command: `admin_Change_double_${context.peerId}_x3`
                }
            }).row()
            .textButton({
                label: `x5`,
                payload: {
                    command: `admin_Change_double_${context.peerId}_x5`
                }
            })
            .textButton({
                label: `x50`,
                payload: {
                    command: `admin_Change_double_${context.peerId}_x50`
                }
            }).row()
            .inline(),
        peer_id: config.adminConv,
        random_id: util.random(-20000000000, 2000000000000)
    }).catch((err) => {
        console.log(`Ошибка при отправке админ подкрутки ${err}`);
    })
}


// DIce
exports.getDiceAdminMenu = function getDiceAdminMenu(db, vk, context, limits, _coin, type) {
    vk.api.messages.send({
        message: `Игрок [id${context.senderId}|${db.playersData[context.senderId].name}] сделал ставку в Dice на ${type}\n\nРазмер ставки: ${util.number_format(_coin)}\n\nИсход: ${db.gamesData[context.peerId].convGame.resultData.result}\nДо конца раунда: ${util.unixStampLeft(db.gamesData[context.peerId].convGame.timeNow)}`,
        keyboard: Keyboard.builder()
            .textButton({
                label: `1`,
                payload: {
                    command: `admin_Change_dice_${context.peerId}_1`
                }
            })
            .textButton({
                label: `2`,
                payload: {
                    command: `admin_Change_dice_${context.peerId}_2`
                }
            })
            .textButton({
                label: `3`,
                payload: {
                    command: `admin_Change_dice_${context.peerId}_3`
                }
            }).row()
            .textButton({
                label: `4`,
                payload: {
                    command: `admin_Change_dice_${context.peerId}_4`
                }
            })
            .textButton({
                label: `5`,
                payload: {
                    command: `admin_Change_dice_${context.peerId}_5`
                }
            })
            .textButton({
                label: `6`,
                payload: {
                    command: `admin_Change_dice_${context.peerId}_6`
                }
            }).row()
            .inline(),
        peer_id: config.adminConv,
        random_id: util.random(-20000000000, 2000000000000)
    }).catch((err) => {
        console.log(`Ошибка при отправке админ подкрутки ${err}`);
    })
}

// Wheel
exports.getWheelAdminMenu = function getWheelAdminMenu(db, vk, context, limits, _coin, type) {
    vk.api.messages.send({
        message: `Игрок [id${context.senderId}|${db.playersData[context.senderId].name}] сделал ставку в Wheel на ${type}\n\nРазмер ставки: ${util.number_format(_coin)}\n\nИсход: ${db.gamesData[context.peerId].convGame.resultData.result}\nДо конца раунда: ${util.unixStampLeft(db.gamesData[context.peerId].convGame.timeNow)}`,
        keyboard: Keyboard.builder()
            .textButton({
                label: `0`,
                payload: {
                    command: `admin_Change_wheel_${context.peerId}_0`
                }
            })
            .textButton({
                label: `3`,
                payload: {
                    command: `admin_Change_wheel_${context.peerId}_3`
                }
            })
            .textButton({
                label: `16`,
                payload: {
                    command: `admin_Change_wheel_${context.peerId}_16`
                }
            }).row()
            .textButton({
                label: `11`,
                payload: {
                    command: `admin_Change_wheel_${context.peerId}_11`
                }
            })
            .textButton({
                label: `25`,
                payload: {
                    command: `admin_Change_wheel_${context.peerId}_25`
                }
            })
            .textButton({
                label: `36`,
                payload: {
                    command: `admin_Change_wheel_${context.peerId}_36`
                }
            }).row()
            .inline(),
        peer_id: config.adminConv,
        random_id: util.random(-20000000000, 2000000000000)
    }).catch((err) => {
        console.log(`Ошибка при отправке админ подкрутки ${err}`);
    })
}