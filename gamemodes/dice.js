const util = require('../addons/util')
const keyboards = require('../addons/keyboards')
const md5 = require('md5')
const {
    Keyboard
} = require('vk-io')
const config = require('../config')


module.exports = async function (db, vk) {
    let even_numbers = [2, 4, 6]
    let noteven_numbers = [1, 3, 5]


    setInterval(async () => {
        for (i in db.gamesData) {
            if (db.gamesData[i].convData.isActive == true && db.gamesData[i].convData.gamemode == 'dice' && db.gamesData[i].convGame.amount > 0) {
                db.gamesData[i].convGame.timeNow -= Number(1)
                console.log(db.gamesData[i].convGame.timeNow)

                if (db.gamesData[i].convGame.timeNow <= 0) {
                    console.log('Игра закончилась')
                    let type = null
                    if (noteven_numbers.includes(db.gamesData[i].convGame.resultData.result)) {
                        type = 'нечетное'
                    }
                    if (even_numbers.includes(db.gamesData[i].convGame.resultData.result)) {
                        type = 'четное'
                    }

                    let str = `Выпало число ${db.gamesData[i].convGame.resultData.result}, ${type}\n\n`

                    for (d in db.gamesData[i].convGame.bets) {
                        // Четное проверка
                        if (db.gamesData[i].convGame.bets[d].even > 0) {
                            // ? Ставка выиграла
                            if (even_numbers.includes(db.gamesData[i].convGame.resultData.result)) {
                                str += `✅ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].even)} коинов на четное выиграла (+${util.number_format(db.gamesData[i].convGame.bets[d].even * 1.9)})\n`

                                // Работа с балансом
                                db.playersData[db.gamesData[i].convGame.bets[d].id].balance += Math.floor(db.gamesData[i].convGame.bets[d].even * 1.9)
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data += Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].even * 1.9 - db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].even)
                            }
                            // Проигрыш
                            if (!even_numbers.includes(db.gamesData[i].convGame.resultData.result)) {
                                str += `❌ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].even)} коинов на четное проиграла\n`
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].even)
                            }

                        }

                        if (db.gamesData[i].convGame.bets[d].noteven > 0) {
                            // ? Ставка выиграла
                            if (noteven_numbers.includes(db.gamesData[i].convGame.resultData.result)) {
                                str += `✅ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].noteven)} коинов на нечетное выиграла (+${util.number_format(db.gamesData[i].convGame.bets[d].noteven * 1.9)})\n`

                                // Работа с балансом
                                db.playersData[db.gamesData[i].convGame.bets[d].id].balance += Math.floor(db.gamesData[i].convGame.bets[d].noteven * 1.9)
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data += Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].noteven * 1.9 - db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].noteven)
                            }
                            // Проигрыш
                            if (!noteven_numbers.includes(db.gamesData[i].convGame.resultData.result)) {
                                str += `❌ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].noteven)} коинов на нечетное проиграла\n`
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].noteven)
                            }
                        }
                        // Числа
                        if (db.gamesData[i].convGame.bets[d].one > 0) {
                            // ? Ставка выиграла
                            if (db.gamesData[i].convGame.resultData.result == 1) {

                                str += `✅ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].one)} коинов на число 1 выиграла (+${util.number_format(db.gamesData[i].convGame.bets[d].one * 5.3)})\n`

                                // Работа с балансом
                                db.playersData[db.gamesData[i].convGame.bets[d].id].balance += Math.floor(db.gamesData[i].convGame.bets[d].one * 5.3)
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data += Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].one * 5.3 - db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].one)
                            }
                            // Проигрыш
                            if (db.gamesData[i].convGame.resultData.result != 1) {

                                str += `❌ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].one)} коинов на число 1 проиграла\n`
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].one)
                            }
                        }
                        if (db.gamesData[i].convGame.bets[d].two > 0) {
                            // ? Ставка выиграла
                            if (db.gamesData[i].convGame.resultData.result == 2) {

                                str += `✅ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].two)} коинов на число 2 выиграла (+${util.number_format(db.gamesData[i].convGame.bets[d].two * 5.3)})\n`

                                // Работа с балансом
                                db.playersData[db.gamesData[i].convGame.bets[d].id].balance += Math.floor(db.gamesData[i].convGame.bets[d].two * 5.3)
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data += Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].two * 5.3 - db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].two)
                            }
                            // Проигрыш
                            if (db.gamesData[i].convGame.resultData.result != 2) {

                                str += `❌ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].two)} коинов на число 2 проиграла\n`
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].two)
                            }
                        }
                        if (db.gamesData[i].convGame.bets[d].three > 0) {
                            // ? Ставка выиграла
                            if (db.gamesData[i].convGame.resultData.result == 3) {
                                str += `✅ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].three)} коинов на число 3 выиграла (+${util.number_format(db.gamesData[i].convGame.bets[d].three * 5.3)})\n`

                                // Работа с балансом
                                db.playersData[db.gamesData[i].convGame.bets[d].id].balance += Math.floor(db.gamesData[i].convGame.bets[d].three * 5.3)
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data += Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].three * 5.3 - db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].three)
                            }
                            // Проигрыш
                            if (db.gamesData[i].convGame.resultData.result != 3) {
                                str += `❌ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].three)} коинов на число 3 проиграла\n`
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].three)
                            }
                        }
                        if (db.gamesData[i].convGame.bets[d].four > 0) {
                            // ? Ставка выиграла
                            if (db.gamesData[i].convGame.resultData.result == 4) {
                                str += `✅ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].four)} коинов на число 4 выиграла (+${util.number_format(db.gamesData[i].convGame.bets[d].four * 5.3)})\n`

                                // Работа с балансом
                                db.playersData[db.gamesData[i].convGame.bets[d].id].balance += Math.floor(db.gamesData[i].convGame.bets[d].four * 5.3)
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data += Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].four * 5.3 - db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].four)
                            }
                            // Проигрыш
                            if (db.gamesData[i].convGame.resultData.result != 4) {
                                str += `❌ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].four)} коинов на число 4 проиграла\n`
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].four)
                            }
                        }
                        if (db.gamesData[i].convGame.bets[d].five > 0) {
                            // ? Ставка выиграла
                            if (db.gamesData[i].convGame.resultData.result == 5) {
                                str += `✅ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].five)} коинов на число 5 выиграла (+${util.number_format(db.gamesData[i].convGame.bets[d].five * 5.3)})\n`

                                // Работа с балансом
                                db.playersData[db.gamesData[i].convGame.bets[d].id].balance += Math.floor(db.gamesData[i].convGame.bets[d].five * 5.3)
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data += Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].five * 5.3 - db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].five)
                            }
                            // Проигрыш
                            if (db.gamesData[i].convGame.resultData.result != 5) {
                                str += `❌ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].five)} коинов на число 5 проиграла\n`
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].five)
                            }
                        }
                        if (db.gamesData[i].convGame.bets[d].six > 0) {
                            // ? Ставка выиграла
                            if (db.gamesData[i].convGame.resultData.result == 6) {
                                str += `✅ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].six)} коинов на число 6 выиграла (+${util.number_format(db.gamesData[i].convGame.bets[d].six * 5.3)})\n`

                                // Работа с балансом
                                db.playersData[db.gamesData[i].convGame.bets[d].id].balance += Math.floor(db.gamesData[i].convGame.bets[d].six * 5.3)
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data += Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].six * 5.3 - db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].six)
                            }
                            // Проигрыш
                            if (db.gamesData[i].convGame.resultData.result != 6) {
                                str += `❌ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].six)} коинов на число 6 проиграла\n`
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].six)
                            }


                        }

                        // Четное проверка
                        if (db.gamesData[i].convGame.bets[d].veven > 0) {
                            // ? Ставка выиграла
                            if (even_numbers.includes(db.gamesData[i].convGame.resultData.result)) {
                                str += `✅ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].veven)} ${config.botVirtualCurrency} на четное выиграла (+${util.number_format(db.gamesData[i].convGame.bets[d].veven * 1.9)})\n`

                                // Работа с балансом
                                db.playersData[db.gamesData[i].convGame.bets[d].id].vbalance += Math.floor(db.gamesData[i].convGame.bets[d].veven * 1.9)
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data += Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].veven * 1.9 - db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].veven)
                            }
                            // Проигрыш
                            if (!even_numbers.includes(db.gamesData[i].convGame.resultData.result)) {
                                str += `❌ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].veven)} ${config.botVirtualCurrency} на четное проиграла\n`
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].veven)
                            }

                        }

                        if (db.gamesData[i].convGame.bets[d].vnoteven > 0) {
                            // ? Ставка выиграла
                            if (noteven_numbers.includes(db.gamesData[i].convGame.resultData.result)) {
                                str += `✅ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].vnoteven)} ${config.botVirtualCurrency} на нечетное выиграла (+${util.number_format(db.gamesData[i].convGame.bets[d].vnoteven * 1.9)})\n`

                                // Работа с балансом
                                db.playersData[db.gamesData[i].convGame.bets[d].id].vbalance += Math.floor(db.gamesData[i].convGame.bets[d].vnoteven * 1.9)
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data += Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vnoteven * 1.9 - db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vnoteven)
                            }
                            // Проигрыш
                            if (!noteven_numbers.includes(db.gamesData[i].convGame.resultData.result)) {
                                str += `❌ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].vnoteven)} ${config.botVirtualCurrency} на нечетное проиграла\n`
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vnoteven)
                            }
                        }
                        // Числа
                        if (db.gamesData[i].convGame.bets[d].vone > 0) {
                            // ? Ставка выиграла
                            if (db.gamesData[i].convGame.resultData.result == 1) {

                                str += `✅ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].vone)} ${config.botVirtualCurrency} на число 1 выиграла (+${util.number_format(db.gamesData[i].convGame.bets[d].vone * 5.3)})\n`

                                // Работа с балансом
                                db.playersData[db.gamesData[i].convGame.bets[d].id].vbalance += Math.floor(db.gamesData[i].convGame.bets[d].vone * 5.3)
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data += Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vone * 5.3 - db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vone)
                            }
                            // Проигрыш
                            if (db.gamesData[i].convGame.resultData.result != 1) {

                                str += `❌ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].vone)} ${config.botVirtualCurrency} на число 1 проиграла\n`
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vone)
                            }
                        }
                        if (db.gamesData[i].convGame.bets[d].vtwo > 0) {
                            // ? Ставка выиграла
                            if (db.gamesData[i].convGame.resultData.result == 2) {

                                str += `✅ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].vtwo)} ${config.botVirtualCurrency} на число 2 выиграла (+${util.number_format(db.gamesData[i].convGame.bets[d].vtwo * 5.3)})\n`

                                // Работа с балансом
                                db.playersData[db.gamesData[i].convGame.bets[d].id].vbalance += Math.floor(db.gamesData[i].convGame.bets[d].vtwo * 5.3)
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data += Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vtwo * 5.3 - db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vtwo)
                            }
                            // Проигрыш
                            if (db.gamesData[i].convGame.resultData.result != 2) {

                                str += `❌ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].vtwo)} ${config.botVirtualCurrency} на число 2 проиграла\n`
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vtwo)
                            }
                        }
                        if (db.gamesData[i].convGame.bets[d].vthree > 0) {
                            // ? Ставка выиграла
                            if (db.gamesData[i].convGame.resultData.result == 3) {
                                str += `✅ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].vthree)} ${config.botVirtualCurrency} на число 3 выиграла (+${util.number_format(db.gamesData[i].convGame.bets[d].vthree * 5.3)})\n`

                                // Работа с балансом
                                db.playersData[db.gamesData[i].convGame.bets[d].id].vbalance += Math.floor(db.gamesData[i].convGame.bets[d].vthree * 5.3)
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data += Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vthree * 5.3 - db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vthree)
                            }
                            // Проигрыш
                            if (db.gamesData[i].convGame.resultData.result != 3) {
                                str += `❌ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].vthree)} ${config.botVirtualCurrency} на число 3 проиграла\n`
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vthree)
                            }
                        }
                        if (db.gamesData[i].convGame.bets[d].vfour > 0) {
                            // ? Ставка выиграла
                            if (db.gamesData[i].convGame.resultData.result == 4) {
                                str += `✅ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].vfour)} ${config.botVirtualCurrency} на число 4 выиграла (+${util.number_format(db.gamesData[i].convGame.bets[d].vfour * 5.3)})\n`

                                // Работа с балансом
                                db.playersData[db.gamesData[i].convGame.bets[d].id].vbalance += Math.floor(db.gamesData[i].convGame.bets[d].vfour * 5.3)
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data += Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vfour * 5.3 - db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vfour)
                            }
                            // Проигрыш
                            if (db.gamesData[i].convGame.resultData.result != 4) {
                                str += `❌ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].vfour)} ${config.botVirtualCurrency} на число 4 проиграла\n`
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vfour)
                            }
                        }
                        if (db.gamesData[i].convGame.bets[d].vfive > 0) {
                            // ? Ставка выиграла
                            if (db.gamesData[i].convGame.resultData.result == 5) {
                                str += `✅ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].vfive)} ${config.botVirtualCurrency} на число 5 выиграла (+${util.number_format(db.gamesData[i].convGame.bets[d].vfive * 5.3)})\n`

                                // Работа с балансом
                                db.playersData[db.gamesData[i].convGame.bets[d].id].vbalance += Math.floor(db.gamesData[i].convGame.bets[d].vfive * 5.3)
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data += Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vfive * 5.3 - db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vfive)
                            }
                            // Проигрыш
                            if (db.gamesData[i].convGame.resultData.result != 5) {
                                str += `❌ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].vfive)} ${config.botVirtualCurrency} на число 5 проиграла\n`
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vfive)
                            }
                        }
                        if (db.gamesData[i].convGame.bets[d].vsix > 0) {
                            // ? Ставка выиграла
                            if (db.gamesData[i].convGame.resultData.result == 6) {
                                str += `✅ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].vsix)} ${config.botVirtualCurrency} на число 6 выиграла (+${util.number_format(db.gamesData[i].convGame.bets[d].vsix * 5.3)})\n`

                                // Работа с балансом
                                db.playersData[db.gamesData[i].convGame.bets[d].id].vbalance += Math.floor(db.gamesData[i].convGame.bets[d].vsix * 5.3)
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data += Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vsix * 5.3 - db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vsix)
                            }
                            // Проигрыш
                            if (db.gamesData[i].convGame.resultData.result != 6) {
                                str += `❌ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].vsix)} ${config.botVirtualCurrency} на число 6 проиграла\n`
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vsix)
                            }


                        }
                        // Сам топ
                        console.log('top', db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data)

                        if (db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data < 0) {
                            db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data = 0
                        }

                        db.playersData[db.gamesData[i].convGame.bets[d].id].userStatistics.winAllTime += Number(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data)
                        db.playersData[db.gamesData[i].convGame.bets[d].id].userStatistics.winDay += Number(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data)
                        db.playersData[db.gamesData[i].convGame.bets[d].id].userStatistics.winWeek += Number(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data)




                    }
                    str += `\n\nХэш игры: ${db.gamesData[i].convGame.resultData.hash}\nПроверка честности: ${db.gamesData[i].convGame.resultData.secret}@${db.gamesData[i].convGame.resultData.result}`

                    let sendId = db.gamesData[i].id

                    vk.api.messages.send({
                        peer_id: sendId,
                        message: `Итак, результаты раунда...`,
                        random_id: util.random(-200000000, 20000000000)
                    })
                    vk.upload.messagePhoto({
                        source: {
                            value: `./pictures/dice/${db.gamesData[i].convGame.resultData.result}.jpg`
                        }
                    }).then((attachment) =>
                        vk.api.messages.send({
                            peer_id: sendId,
                            message: str,
                            attachment,
                            random_id: util.random(-200000000, 20000000000)
                        }).then(() => {
                            if (db.gamesData[db.gamesData[i].id].convSettings.adsMessage == true) {
                                 vk.api.messages.send({
                                        peer_id: sendId,
                                        message: `📺 Купить или продать свои коины ты можешь в нашем маркете!`,
                                        keyboard: Keyboard.builder().urlButton({
                                            label: `Перейти`,
                                            url: config.hashCheckLink
                                        }).inline(),
                                        random_id: util.random(-200000000, 20000000000)
                                    }).catch((err) => {
                                        console.log(`Ошибка при отправлке сообщения ${err}`);
                                    })
                            }
                        })
                    ).catch((err) => {
                        console.log(`Ошибка при отправлке сообщения ${err}`);
                    })



                    // Генерируем случайный результат
                    let secret = util.str_rand(20)
                    let result = util.random(1, 6)
                    let hash = md5(`${secret}@${result}`)

                    db.gamesData[i].convGame.resultData.result = result
                    db.gamesData[i].convGame.resultData.secret = secret
                    db.gamesData[i].convGame.resultData.hash = hash

                    // Обнуляем данные игры
                    db.gamesData[i].convGame.timeNow = Number(db.gamesData[i].convSettings.maxTime)
                    db.gamesData[i].convGame.bets = {}
                    db.gamesData[i].convGame.amount = 0

                }
            }
        }
    }, 1000)
}