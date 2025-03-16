const util = require('../addons/util')
const keyboards = require('../addons/keyboards')
const md5 = require('md5')
const {
    Keyboard
} = require('vk-io')
const config = require('../config')

module.exports = async function (db, vk) {
    let down_numbers = [2, 3, 4, 5, 6]
    let up_numbers = [8, 9, 10, 11, 12]

    setInterval(async () => {
        for (i in db.gamesData) {
            if (db.gamesData[i].convData.isActive == true && db.gamesData[i].convData.gamemode == 'down7up' && db.gamesData[i].convGame.amount > 0) {
                db.gamesData[i].convGame.timeNow -= Number(1)
                console.log(db.gamesData[i].convGame.timeNow)
                if (db.gamesData[i].convGame.timeNow <= 0) {
                    console.log('Игра закончилась')
                    let type = null

                    // Проверка для красоты
                    if (db.gamesData[i].convGame.resultData.result == 2) type = '1 и 1'
                    if (db.gamesData[i].convGame.resultData.result == 3) type = '1 и 2'
                    if (db.gamesData[i].convGame.resultData.result == 4) type = '1 и 3'
                    if (db.gamesData[i].convGame.resultData.result == 5) type = '2 и 3'
                    if (db.gamesData[i].convGame.resultData.result == 6) type = '2 и 4'
                    if (db.gamesData[i].convGame.resultData.result == 7) type = '1 и 6'
                    if (db.gamesData[i].convGame.resultData.result == 8) type = '2 и 6'
                    if (db.gamesData[i].convGame.resultData.result == 9) type = '3 и 6'
                    if (db.gamesData[i].convGame.resultData.result == 10) type = '5 и 5'
                    if (db.gamesData[i].convGame.resultData.result == 11) type = '5 и 6'
                    if (db.gamesData[i].convGame.resultData.result == 12) type = '6 и 6'

                    let str = `Выпали числа ${type}, результат: ${db.gamesData[i].convGame.resultData.result}\n\n`

                    for (d in db.gamesData[i].convGame.bets) {
                        // Меньше 7
                        if (db.gamesData[i].convGame.bets[d].down > 0) {
                            // ? Ставка выиграла
                            if (down_numbers.includes(db.gamesData[i].convGame.resultData.result)) {
                                str += `✅ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].down)} коинов на выпадение числа меньше 7 выиграла (+${util.number_format(db.gamesData[i].convGame.bets[d].down * 2.3)})\n`

                                // Работа с балансом
                                db.playersData[db.gamesData[i].convGame.bets[d].id].balance += Math.floor(db.gamesData[i].convGame.bets[d].down * 2.3)
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data += Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].down * 2.3 - db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].down)
                            }
                            // Проигрыш
                            if (!down_numbers.includes(db.gamesData[i].convGame.resultData.result)) {
                                str += `❌ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].down)} коинов на выпадение числа меньше 7 проиграла\n`
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].down)
                            }

                        }
                        // Проверка на число 7
                        if (db.gamesData[i].convGame.bets[d].seven > 0) {
                            // ? Ставка выиграла
                            if (db.gamesData[i].convGame.resultData.result == 7) {
                                str += `✅ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].seven)} коинов на выпадение числа 7 выиграла (+${util.number_format(db.gamesData[i].convGame.bets[d].seven * 5.8)})\n`

                                // Работа с балансом
                                db.playersData[db.gamesData[i].convGame.bets[d].id].balance += Math.floor(db.gamesData[i].convGame.bets[d].seven * 5.8)
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data += Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].seven * 5.8 - db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].seven)
                            }
                            // Проигрыш
                            if (db.gamesData[i].convGame.resultData.result != 7) {
                                str += `❌ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].seven)} коинов на выпадение числа 7 проиграла\n`
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].seven)
                            }
                        }

                        // Больше 7
                        if (db.gamesData[i].convGame.bets[d].up > 0) {
                            // ? Ставка выиграла
                            if (up_numbers.includes(db.gamesData[i].convGame.resultData.result)) {

                                str += `✅ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].up)} коинов на выпадение числа больше 7 выиграла (+${util.number_format(db.gamesData[i].convGame.bets[d].up * 2.3)})\n`

                                // Работа с балансом
                                db.playersData[db.gamesData[i].convGame.bets[d].id].balance += Math.floor(db.gamesData[i].convGame.bets[d].up * 2.3)
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data += Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].up * 2.3 - db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].up)
                            }
                            // Проигрыш
                            if (!up_numbers.includes(db.gamesData[i].convGame.resultData.result)) {
                                str += `❌ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].up)} коинов на выпадение числа больше 7 проиграла\n`
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].up)
                            }
                        }


                        // ! Виртуальный баланс
                        if (db.gamesData[i].convGame.bets[d].vdown > 0) {
                            // ? Ставка выиграла
                            if (down_numbers.includes(db.gamesData[i].convGame.resultData.result)) {
                                str += `✅ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].vdown)} ${config.botVirtualCurrency} на выпадение числа меньше 7 выиграла (+${util.number_format(db.gamesData[i].convGame.bets[d].vdown * 2.3)})\n`
                        
                                // Работа с балансом
                                db.playersData[db.gamesData[i].convGame.bets[d].id].vbalance += Math.floor(db.gamesData[i].convGame.bets[d].vdown * 2.3)
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data += Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vdown * 2.3 - db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vdown)
                            }
                            // Проигрыш
                            if (!down_numbers.includes(db.gamesData[i].convGame.resultData.result)) {
                                str += `❌ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].vdown)} ${config.botVirtualCurrency} на выпадение числа меньше 7 проиграла\n`
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vdown)
                            }
                        
                        }
                        // Проверка на число 7
                        if (db.gamesData[i].convGame.bets[d].vseven > 0) {
                            // ? Ставка выиграла
                            if (db.gamesData[i].convGame.resultData.result == 7) {
                                str += `✅ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].vseven)} ${config.botVirtualCurrency} на выпадение числа 7 выиграла (+${util.number_format(db.gamesData[i].convGame.bets[d].vseven * 5.8)})\n`
                        
                                // Работа с балансом
                                db.playersData[db.gamesData[i].convGame.bets[d].id].vbalance += Math.floor(db.gamesData[i].convGame.bets[d].vseven * 5.8)
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data += Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vseven * 5.8 - db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vseven)
                            }
                            // Проигрыш
                            if (db.gamesData[i].convGame.resultData.result != 7) {
                                str += `❌ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].vseven)} ${config.botVirtualCurrency} на выпадение числа 7 проиграла\n`
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vseven)
                            }
                        }
                        
                        // Больше 7
                        if (db.gamesData[i].convGame.bets[d].vup > 0) {
                            // ? Ставка выиграла
                            if (up_numbers.includes(db.gamesData[i].convGame.resultData.result)) {
                        
                                str += `✅ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].vup)} ${config.botVirtualCurrency} на выпадение числа больше 7 выиграла (+${util.number_format(db.gamesData[i].convGame.bets[d].vup * 2.3)})\n`
                        
                                // Работа с балансом
                                db.playersData[db.gamesData[i].convGame.bets[d].id].vbalance += Math.floor(db.gamesData[i].convGame.bets[d].vup * 2.3)
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data += Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vup * 2.3 - db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vup)
                            }
                            // Проигрыш
                            if (!up_numbers.includes(db.gamesData[i].convGame.resultData.result)) {
                                str += `❌ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].vup)} ${config.botVirtualCurrency} на выпадение числа больше 7 проиграла\n`
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vup)
                            }
                        }
                        



                        // Сам топ
                        console.log('top', db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data)

                        if (db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data < 0) {
                            db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data = 0
                        }

                        // Личный топ
                        db.playersData[db.gamesData[i].convGame.bets[d].id].userStatistics.winAllTime += Number(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data)
                        db.playersData[db.gamesData[i].convGame.bets[d].id].userStatistics.winDay += Number(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data)
                        db.playersData[db.gamesData[i].convGame.bets[d].id].userStatistics.winWeek += Number(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data)

                        // Начисление в команду (если присутсвует :3)


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
                            value: `./pictures/down7up/${db.gamesData[i].convGame.resultData.result}.jpg`
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
                    let result = util.random(2, 12)
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
