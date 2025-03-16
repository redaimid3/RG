const util = require('../addons/util')
const keyboards = require('../addons/keyboards')
const md5 = require('md5')
const {
    Keyboard
} = require('vk-io')
const config = require('../config')


module.exports = async function (db, vk) {


    let redNumbers = [1, 3, 5, 9, 7, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]
    let blackNumbers = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35]

    //Промежутки
    let int112Numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    let int1324Numbers = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
    let int2536Numbers = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]

    //Четность/Нечетность
    let evenNumbers = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36]
    let notevenNumbers = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35]


    setInterval(async () => {
        for (i in db.gamesData) {
            if (db.gamesData[i].convData.isActive == true && db.gamesData[i].convData.gamemode == 'wheel' && db.gamesData[i].convGame.amount > 0) {
                db.gamesData[i].convGame.timeNow -= Number(1)
                console.log(db.gamesData[i].convGame.timeNow)

                if (db.gamesData[i].convGame.timeNow <= 0) {
                    console.log('Игра закончилась')
                    let type = null

                    if (redNumbers.includes(db.gamesData[i].convGame.resultData.result)) {
                        type = `красное`
                    }
                    if (blackNumbers.includes(db.gamesData[i].convGame.resultData.result)) {
                        type = `черное`
                    }
                    if (db.gamesData[i].convGame.resultData.result == 0) {
                        type = `зеленое`
                    }

                    let str = `Выпало число ${db.gamesData[i].convGame.resultData.result}, ${type}\n\n`
                    for (d in db.gamesData[i].convGame.bets) {


                        // красное проверка
                        if (db.gamesData[i].convGame.bets[d].red > 0) {
                            // ? Ставка выиграла
                            if (redNumbers.includes(db.gamesData[i].convGame.resultData.result)) {
                                str += `✅ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].red)} коинов на красное выиграла (+${util.number_format(db.gamesData[i].convGame.bets[d].red * 2)})\n`

                                // Работа с балансом
                                db.playersData[db.gamesData[i].convGame.bets[d].id].balance += Math.floor(db.gamesData[i].convGame.bets[d].red * 2)
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data += Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].red * 2 - db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].red)
                            }
                            // Проигрыш
                            if (!redNumbers.includes(db.gamesData[i].convGame.resultData.result)) {
                                str += `❌ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].red)} коинов на красное проиграла\n`
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].red)
                            }

                        }

                        // черное проверка
                        if (db.gamesData[i].convGame.bets[d].black > 0) {
                            // ? Ставка выиграла
                            if (blackNumbers.includes(db.gamesData[i].convGame.resultData.result)) {
                                str += `✅ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].black)} коинов на черное выиграла (+${util.number_format(db.gamesData[i].convGame.bets[d].black * 2)})\n`

                                // Работа с балансом
                                db.playersData[db.gamesData[i].convGame.bets[d].id].balance += Math.floor(db.gamesData[i].convGame.bets[d].black * 2)
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data += Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].black * 2 - db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].black)
                            }
                            // Проигрыш
                            if (!blackNumbers.includes(db.gamesData[i].convGame.resultData.result)) {
                                str += `❌ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].black)} коинов на черное проиграла\n`
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].black)
                            }

                        }





                        // Четное проверка
                        if (db.gamesData[i].convGame.bets[d].even > 0) {
                            // ? Ставка выиграла
                            if (evenNumbers.includes(db.gamesData[i].convGame.resultData.result)) {
                                str += `✅ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].even)} коинов на четное выиграла (+${util.number_format(db.gamesData[i].convGame.bets[d].even * 2)})\n`

                                // Работа с балансом
                                db.playersData[db.gamesData[i].convGame.bets[d].id].balance += Math.floor(db.gamesData[i].convGame.bets[d].even * 2)
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data += Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].even * 2 - db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].even)
                            }
                            // Проигрыш
                            if (!evenNumbers.includes(db.gamesData[i].convGame.resultData.result)) {
                                str += `❌ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].even)} коинов на четное проиграла\n`
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].even)
                            }

                        }

                        // нечетное
                        if (db.gamesData[i].convGame.bets[d].noteven > 0) {
                            // ? Ставка выиграла
                            if (notevenNumbers.includes(db.gamesData[i].convGame.resultData.result)) {
                                str += `✅ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].noteven)} коинов на нечетное выиграла (+${util.number_format(db.gamesData[i].convGame.bets[d].noteven * 2)})\n`

                                // Работа с балансом
                                db.playersData[db.gamesData[i].convGame.bets[d].id].balance += Math.floor(db.gamesData[i].convGame.bets[d].noteven * 2)
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data += Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].noteven * 2 - db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].noteven)
                            }
                            // Проигрыш
                            if (!notevenNumbers.includes(db.gamesData[i].convGame.resultData.result)) {
                                str += `❌ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].noteven)} коинов на нечетное проиграла\n`
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].noteven)
                            }
                        }

                        // промежуток 1-12 проверка
                        if (db.gamesData[i].convGame.bets[d].int112 > 0) {
                            // ? Ставка выиграла
                            if (int112Numbers.includes(db.gamesData[i].convGame.resultData.result)) {
                                str += `✅ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].int112)} коинов на промежуток 1-12 выиграла (+${util.number_format(db.gamesData[i].convGame.bets[d].int112 * 3)})\n`

                                // Работа с балансом
                                db.playersData[db.gamesData[i].convGame.bets[d].id].balance += Math.floor(db.gamesData[i].convGame.bets[d].int112 * 3)
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data += Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].int112 * 3 - db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].int112)
                            }
                            // Проигрыш
                            if (!int112Numbers.includes(db.gamesData[i].convGame.resultData.result)) {
                                str += `❌ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].int112)} коинов на промежуток 1-12 проиграла\n`
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].int112)
                            }

                        }
                        // промежуток 13-24 проверка
                        if (db.gamesData[i].convGame.bets[d].int1324 > 0) {
                            // ? Ставка выиграла
                            if (int1324Numbers.includes(db.gamesData[i].convGame.resultData.result)) {
                                str += `✅ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].int1324)} коинов на промежуток 13-24 выиграла (+${util.number_format(db.gamesData[i].convGame.bets[d].int1324 * 3)})\n`

                                // Работа с балансом
                                db.playersData[db.gamesData[i].convGame.bets[d].id].balance += Math.floor(db.gamesData[i].convGame.bets[d].int1324 * 3)
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data += Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].int1324 * 3 - db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].int1324)
                            }
                            // Проигрыш
                            if (!int1324Numbers.includes(db.gamesData[i].convGame.resultData.result)) {
                                str += `❌ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].int1324)} коинов на промежуток 13-24 проиграла\n`
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].int1324)
                            }

                        }
                        // промежуток 25-36 проверка
                        if (db.gamesData[i].convGame.bets[d].int2536 > 0) {
                            // ? Ставка выиграла
                            if (int2536Numbers.includes(db.gamesData[i].convGame.resultData.result)) {
                                str += `✅ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].int2536)} коинов на промежуток 25-36 выиграла (+${util.number_format(db.gamesData[i].convGame.bets[d].int2536 * 3)})\n`

                                // Работа с балансом
                                db.playersData[db.gamesData[i].convGame.bets[d].id].balance += Math.floor(db.gamesData[i].convGame.bets[d].int2536 * 3)
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data += Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].int2536 * 3 - db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].int2536)
                            }
                            // Проигрыш
                            if (!int2536Numbers.includes(db.gamesData[i].convGame.resultData.result)) {
                                str += `❌ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].int2536)} коинов на промежуток 25-36 проиграла\n`
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].int2536)
                            }

                        }


                        // Логика чисел
                        for (let o in db.gamesData[i].convGame.bets[d].numbers) {
                            if (db.gamesData[i].convGame.bets[d].numbers[o].number == db.gamesData[i].convGame.resultData.result && db.gamesData[i].convGame.bets[d].numbers[o].amount > 0) {
                                str += `✅ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].numbers[o].amount)} коинов на число ${db.gamesData[i].convGame.bets[d].numbers[o].number} выиграла (+${util.number_format(db.gamesData[i].convGame.bets[d].numbers[o].amount * 36)})\n`
                                // Работа с балансом
                                db.playersData[db.gamesData[i].convGame.bets[d].id].balance += Math.floor(db.gamesData[i].convGame.bets[d].numbers[o].amount * 36)
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data += Math.floor(db.gamesData[i].convGame.bets[d].numbers[o].number * 36 - db.gamesData[i].convGame.bets[d].numbers[o].amount)
                            }
                        }
                        for (let o in db.gamesData[i].convGame.bets[d].numbers) {
                            if (db.gamesData[i].convGame.bets[d].numbers[o].number != db.gamesData[i].convGame.resultData.result && db.gamesData[i].convGame.bets[d].numbers[o].amount > 0) {
                                str += `❌ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].numbers[o].amount)} коинов на число ${db.gamesData[i].convGame.bets[d].numbers[o].number} проиграла\n`
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(db.gamesData[i].convGame.bets[d].numbers[o].amount)
                            }
                        }

                        //! Виртуальный баланс
                          // красное проверка
  if (db.gamesData[i].convGame.bets[d].vred > 0) {
    // ? Ставка выиграла
    if (redNumbers.includes(db.gamesData[i].convGame.resultData.result)) {
        str += `✅ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].vred)} ${config.botVirtualCurrency} на красное выиграла (+${util.number_format(db.gamesData[i].convGame.bets[d].vred * 2)})\n`

        // Работа с балансом
        db.playersData[db.gamesData[i].convGame.bets[d].id].vbalance += Math.floor(db.gamesData[i].convGame.bets[d].vred * 2)
        // Начисление топа 
        db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data += Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vred * 2 - db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vred)
    }
    // Проигрыш
    if (!redNumbers.includes(db.gamesData[i].convGame.resultData.result)) {
        str += `❌ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].vred)} ${config.botVirtualCurrency} на красное проиграла\n`
        // Начисление топа 
        db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vred)
    }

}

// черное проверка
if (db.gamesData[i].convGame.bets[d].vblack > 0) {
    // ? Ставка выиграла
    if (blackNumbers.includes(db.gamesData[i].convGame.resultData.result)) {
        str += `✅ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].vblack)} ${config.botVirtualCurrency} на черное выиграла (+${util.number_format(db.gamesData[i].convGame.bets[d].vblack * 2)})\n`

        // Работа с балансом
        db.playersData[db.gamesData[i].convGame.bets[d].id].vbalance += Math.floor(db.gamesData[i].convGame.bets[d].vblack * 2)
        // Начисление топа 
        db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data += Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vblack * 2 - db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vblack)
    }
    // Проигрыш
    if (!blackNumbers.includes(db.gamesData[i].convGame.resultData.result)) {
        str += `❌ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].vblack)} ${config.botVirtualCurrency} на черное проиграла\n`
        // Начисление топа 
        db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vblack)
    }

}





// Четное проверка
if (db.gamesData[i].convGame.bets[d].veven > 0) {
    // ? Ставка выиграла
    if (evenNumbers.includes(db.gamesData[i].convGame.resultData.result)) {
        str += `✅ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].veven)} ${config.botVirtualCurrency} на четное выиграла (+${util.number_format(db.gamesData[i].convGame.bets[d].veven * 2)})\n`

        // Работа с балансом
        db.playersData[db.gamesData[i].convGame.bets[d].id].vbalance += Math.floor(db.gamesData[i].convGame.bets[d].veven * 2)
        // Начисление топа 
        db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data += Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].veven * 2 - db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].veven)
    }
    // Проигрыш
    if (!evenNumbers.includes(db.gamesData[i].convGame.resultData.result)) {
        str += `❌ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].veven)} ${config.botVirtualCurrency} на четное проиграла\n`
        // Начисление топа 
        db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].veven)
    }

}

// нечетное
if (db.gamesData[i].convGame.bets[d].vnoteven > 0) {
    // ? Ставка выиграла
    if (notevenNumbers.includes(db.gamesData[i].convGame.resultData.result)) {
        str += `✅ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].vnoteven)} ${config.botVirtualCurrency} на нечетное выиграла (+${util.number_format(db.gamesData[i].convGame.bets[d].vnoteven * 2)})\n`

        // Работа с балансом
        db.playersData[db.gamesData[i].convGame.bets[d].id].vbalance += Math.floor(db.gamesData[i].convGame.bets[d].vnoteven * 2)
        // Начисление топа 
        db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data += Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vnoteven * 2 - db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vnoteven)
    }
    // Проигрыш
    if (!notevenNumbers.includes(db.gamesData[i].convGame.resultData.result)) {
        str += `❌ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].vnoteven)} ${config.botVirtualCurrency} на нечетное проиграла\n`
        // Начисление топа 
        db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vnoteven)
    }
}

// промежуток 1-12 проверка
if (db.gamesData[i].convGame.bets[d].vint112 > 0) {
    // ? Ставка выиграла
    if (int112Numbers.includes(db.gamesData[i].convGame.resultData.result)) {
        str += `✅ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].vint112)} ${config.botVirtualCurrency} на промежуток 1-12 выиграла (+${util.number_format(db.gamesData[i].convGame.bets[d].vint112 * 3)})\n`

        // Работа с балансом
        db.playersData[db.gamesData[i].convGame.bets[d].id].vbalance += Math.floor(db.gamesData[i].convGame.bets[d].vint112 * 3)
        // Начисление топа 
        db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data += Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vint112 * 3 - db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vint112)
    }
    // Проигрыш
    if (!int112Numbers.includes(db.gamesData[i].convGame.resultData.result)) {
        str += `❌ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].vint112)} ${config.botVirtualCurrency} на промежуток 1-12 проиграла\n`
        // Начисление топа 
        db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vint112)
    }

}
// промежуток 13-24 проверка
if (db.gamesData[i].convGame.bets[d].vint1324 > 0) {
    // ? Ставка выиграла
    if (int1324Numbers.includes(db.gamesData[i].convGame.resultData.result)) {
        str += `✅ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].vint1324)} ${config.botVirtualCurrency} на промежуток 13-24 выиграла (+${util.number_format(db.gamesData[i].convGame.bets[d].vint1324 * 3)})\n`

        // Работа с балансом
        db.playersData[db.gamesData[i].convGame.bets[d].id].vbalance += Math.floor(db.gamesData[i].convGame.bets[d].vint1324 * 3)
        // Начисление топа 
        db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data += Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vint1324 * 3 - db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vint1324)
    }
    // Проигрыш
    if (!int1324Numbers.includes(db.gamesData[i].convGame.resultData.result)) {
        str += `❌ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].vint1324)} ${config.botVirtualCurrency} на промежуток 13-24 проиграла\n`
        // Начисление топа 
        db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vint1324)
    }

}
// промежуток 25-36 проверка
if (db.gamesData[i].convGame.bets[d].vint2536 > 0) {
    // ? Ставка выиграла
    if (int2536Numbers.includes(db.gamesData[i].convGame.resultData.result)) {
        str += `✅ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].vint2536)} ${config.botVirtualCurrency} на промежуток 25-36 выиграла (+${util.number_format(db.gamesData[i].convGame.bets[d].vint2536 * 3)})\n`

        // Работа с балансом
        db.playersData[db.gamesData[i].convGame.bets[d].id].vbalance += Math.floor(db.gamesData[i].convGame.bets[d].vint2536 * 3)
        // Начисление топа 
        db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data += Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vint2536 * 3 - db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vint2536)
    }
    // Проигрыш
    if (!int2536Numbers.includes(db.gamesData[i].convGame.resultData.result)) {
        str += `❌ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].vint2536)} ${config.botVirtualCurrency} на промежуток 25-36 проиграла\n`
        // Начисление топа 
        db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vint2536)
    }

}


// Логика чисел
for (let o in db.gamesData[i].convGame.bets[d].vnumbers) {
    if (db.gamesData[i].convGame.bets[d].vnumbers[o].number == db.gamesData[i].convGame.resultData.result && db.gamesData[i].convGame.bets[d].vnumbers[o].amount > 0) {
        str += `✅ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].vnumbers[o].amount)} ${config.botVirtualCurrency} на число ${db.gamesData[i].convGame.bets[d].vnumbers[o].number} выиграла (+${util.number_format(db.gamesData[i].convGame.bets[d].vnumbers[o].amount * 36)})\n`
        // Работа с балансом
        db.playersData[db.gamesData[i].convGame.bets[d].id].vbalance += Math.floor(db.gamesData[i].convGame.bets[d].vnumbers[o].amount * 36)
        // Начисление топа 
        db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data += Math.floor(db.gamesData[i].convGame.bets[d].vnumbers[o].number * 36 - db.gamesData[i].convGame.bets[d].vnumbers[o].amount)
    }
}
for (let o in db.gamesData[i].convGame.bets[d].vnumbers) {
    if (db.gamesData[i].convGame.bets[d].vnumbers[o].number != db.gamesData[i].convGame.resultData.result && db.gamesData[i].convGame.bets[d].vnumbers[o].amount > 0) {
        str += `❌ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].vnumbers[o].amount)} ${config.botVirtualCurrency} на число ${db.gamesData[i].convGame.bets[d].vnumbers[o].number} проиграла\n`
        // Начисление топа 
        db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(db.gamesData[i].convGame.bets[d].vnumbers[o].amount)
    }
}


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
                            value: `./pictures/wheel/${db.gamesData[i].convGame.resultData.result}.jpg`
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
                )


                    // Генерируем случайный результат
                    let secret = util.str_rand(20)
                    let result = util.random(0, 36)
                    let hash = md5(secret + '@' + result)
                    console.log(secret)
                    console.log(result)
                    console.log(hash)



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