const util = require('../addons/util')
const Canvas = require('canvas')
const keyboards = require('../addons/keyboards')
const md5 = require('md5')
const {
    Keyboard
} = require('vk-io')
const config = require('../config')

module.exports = async function (db, vk) {


    setInterval(async () => {
        for (i in db.gamesData) {
            if (db.gamesData[i].convData.isActive == true && db.gamesData[i].convData.gamemode == 'crash' && db.gamesData[i].convGame.amount > 0) {
                db.gamesData[i].convGame.timeNow -= Number(1)
                console.log(db.gamesData[i].convGame.timeNow)
                if (db.gamesData[i].convGame.timeNow <= 0) {
                    console.log('Игра закончилась')

                    let str = `Выпавший коэффициент равен: x${db.gamesData[i].convGame.resultData.result}\n\n`

                    for (d in db.gamesData[i].convGame.bets) {
                        // Выигрышный коэффициент

                        for (let o in db.gamesData[i].convGame.bets[d].rations) {
                            if (Number(db.gamesData[i].convGame.bets[d].rations[o].ration) <= Number(db.gamesData[i].convGame.resultData.result) && db.gamesData[i].convGame.bets[d].rations[o].amount > 0) {
                                str += `✅ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].rations[o].amount)} коинов на коэффициент х${db.gamesData[i].convGame.bets[d].rations[o].ration} выиграла (+${util.number_format(db.gamesData[i].convGame.bets[d].rations[o].amount * db.gamesData[i].convGame.bets[d].rations[o].ration)})\n`
                                // Работа с балансом
                                db.playersData[db.gamesData[i].convGame.bets[d].id].balance += Math.floor(db.gamesData[i].convGame.bets[d].rations[o].amount * db.gamesData[i].convGame.bets[d].rations[o].ration)
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data += Math.floor(db.gamesData[i].convGame.bets[d].rations[o].amount * db.gamesData[i].convGame.bets[d].rations[o].ration - db.gamesData[i].convGame.bets[d].rations[o].amount)
                            }
                            if (Number(db.gamesData[i].convGame.bets[d].rations[o].ration) > Number(db.gamesData[i].convGame.resultData.result) && db.gamesData[i].convGame.bets[d].rations[o].amount > 0) {
                                str += `❌ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].rations[o].amount)} коинов на коэффициент х${db.gamesData[i].convGame.bets[d].rations[o].ration} проиграла\n`
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(db.gamesData[i].convGame.bets[d].rations[o].amount)
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
                    let summ = db.gamesData[i].convGame.resultData.result
                    let fixSumm = Number(summ).toFixed(2)
                    
                        let canvas = Canvas.createCanvas(1000, 1000)
                        let ctx = canvas.getContext('2d')
                    
                        await Canvas.loadImage('./pictures/crash/crash.png').then((image) => {
                          ctx.drawImage(image, 0, 0)
                    if(fixSumm.length >= 5){
                          ctx.font = 'bold 100px 20636.ttf'
                      }
                      if(fixSumm.length < 5){
                          ctx.font = 'bold 100px 20636.ttf'
                      }
                          ctx.fillStyle = "#BFBFBF";
                          ctx.strokeStyle = "#BFBFBF";
                          ctx.textAlign = "center"
                          ctx.textBaseline = "middle";
                          ctx.fillText(`x${fixSumm}`, 500, 500);
                          ctx.strokeText(`x${fixSumm}`, 500, 500)
                          vk.upload.messagePhoto({
                            source: {
                                value: canvas.toBuffer()
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
                    })





                    // Генерируем случайный результат
                    let secret = util.str_rand(20)
                    let result = util.crashGame(1, 3).toFixed(2)
                    let hash = md5(`${secret}@${result}`)

                    db.gamesData[i].convGame.resultData.result = Number(result)
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