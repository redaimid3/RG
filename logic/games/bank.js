const {
   Keyboard
} = require('vk-io')
const keyboards = require('../../addons/keyboards')
const util = require('../../addons/util')
const config = require('../../config.js')

module.exports = async function (db, vk, context, limits) {
   if (!context.isChat) return



   // ? Dice
   if (db.gamesData[context.peerId].convData.isActive == true && db.gamesData[context.peerId].convData.gamemode == 'dice' && context.messagePayload && context.messagePayload.command == 'bank') {

      let bankText = `На данный момент ставок нет`

      let even_text = ``
      let even_list = ``

      let noteven_text = ``
      let noteven_list = ``

      let number_text = ``
      let number_list = ``

      let betsSum = 0
      let betsMany = 0
      console.log(db.gamesData[context.peerId].convGame.amount)

      if (db.gamesData[context.peerId].convGame.amount <= 0) {
         return context.send({
            message: `${bankText}\n\nХэш игры: ${db.gamesData[context.peerId].convGame.resultData.hash}\n\nДо конца раунда: ${util.unixStampLeft(db.gamesData[context.peerId].convGame.timeNow)}`,
            keyboard: keyboards.dice_keyboard

         })
      }

      if (db.gamesData[context.peerId].convGame.amount > 0) {
         for (i in db.gamesData[context.peerId].convGame.bets) {
            console.log(db.gamesData[context.peerId].convGame.bets[i])

            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].even > 0) {
               even_text = 'Ставки на четное:'
               even_list += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].even)} коинов\n`
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].even)
               betsMany += Number(1)
            }
            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].noteven > 0) {
               noteven_text = 'Ставки на нечетное:'
               noteven_list += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].noteven)} коинов\n`
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].noteven)
               betsMany += Number(1)
            }

            // Числовые
            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].one > 0) {
               number_text = 'Ставки на числа:'
               number_list += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].one)} коинов на число 1\n`
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].one)
               betsMany += Number(1)
            }
            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].two > 0) {
               number_text = 'Ставки на числа:'
               number_list += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].two)} коинов на число 2\n`
               betsMany += Number(1)
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].two)
            }
            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].three > 0) {
               number_text = 'Ставки на числа:'
               number_list += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].three)} коинов на число 3\n`
               betsMany += Number(1)
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].three)
            }
            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].four > 0) {
               number_text = 'Ставки на числа:'
               number_list += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].four)} коинов на число 4\n`
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].four)
               betsMany += Number(1)
            }
            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].five > 0) {
               number_text = 'Ставки на числа:'
               number_list += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].five)} коинов на число 5\n`
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].five)
               betsMany += Number(1)
            }
            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].six > 0) {
               number_text = 'Ставки на числа:'
               number_list += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].six)} коинов на число 6\n`
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].six)
               betsMany += Number(1)
            }


            // ! Виртуальный баланс
            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].veven > 0) {
               even_text = 'Ставки на четное:'
               even_list += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].veven)} ${config.botVirtualCurrency}\n`
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].veven)
               betsMany += Number(1)
            }
            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].vnoteven > 0) {
               noteven_text = 'Ставки на нечетное:'
               noteven_list += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].vnoteven)} ${config.botVirtualCurrency}\n`
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].vnoteven)
               betsMany += Number(1)
            }

            // Числовые
            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].vone > 0) {
               number_text = 'Ставки на числа:'
               number_list += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].vone)} ${config.botVirtualCurrency} на число 1\n`
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].vone)
               betsMany += Number(1)
            }
            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].vtwo > 0) {
               number_text = 'Ставки на числа:'
               number_list += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].vtwo)} ${config.botVirtualCurrency} на число 2\n`
               betsMany += Number(1)
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].vtwo)
            }
            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].vthree > 0) {
               number_text = 'Ставки на числа:'
               number_list += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].vthree)} ${config.botVirtualCurrency} на число 3\n`
               betsMany += Number(1)
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].vthree)
            }
            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].vfour > 0) {
               number_text = 'Ставки на числа:'
               number_list += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].vfour)} ${config.botVirtualCurrency} на число 4\n`
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].vfour)
               betsMany += Number(1)
            }
            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].vfive > 0) {
               number_text = 'Ставки на числа:'
               number_list += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].vfive)} ${config.botVirtualCurrency} на число 5\n`
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].vfive)
               betsMany += Number(1)
            }
            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].vsix > 0) {
               number_text = 'Ставки на числа:'
               number_list += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].vsix)} ${config.botVirtualCurrency} на число 6\n`
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].vsix)
               betsMany += Number(1)
            }
         }

         bankText = `Всего поставлено: ${util.number_format(betsSum)}`

         if (betsMany > db.botSettings.gamesSettings.bankMaxSize) {
            return context.send({
               message: `${bankText}\n\nБанк слишком длинный, невозможно отобразить столько ставок (количество: ${betsMany}). Все ставки на месте, дождись розыгрыша, чтоб узнать, выиграла ли твоя ставка или нет.\n\nХэш игры: ${db.gamesData[context.peerId].convGame.resultData.hash}\n\nДо конца раунда: ${util.unixStampLeft(db.gamesData[context.peerId].convGame.timeNow)}`,
               keyboard: keyboards.dice_keyboard
            })
         }
         return context.send({
            message: `${bankText}\n\n${even_text}\n${even_list}\n\n${noteven_text}\n${noteven_list}\n\n${number_text}\n${number_list}\n\nХэш игры: ${db.gamesData[context.peerId].convGame.resultData.hash}\n\nДо конца раунда: ${util.unixStampLeft(db.gamesData[context.peerId].convGame.timeNow)}`,
            keyboard: keyboards.dice_keyboard
         })

      }





   }
   // ? Double
   if (db.gamesData[context.peerId].convData.isActive == true && db.gamesData[context.peerId].convData.gamemode == 'double' && context.messagePayload && context.messagePayload.command == 'bank') {

      let bankText = `На данный момент ставок нет`

      let x2_text = ``
      let x2_list = ``

      let x3_text = ``
      let x3_list = ``

      let x5_text = ``
      let x5_list = ``

      let x50_text = ``
      let x50_list = ``

      let betsSum = 0
      let betsMany = 0
      console.log(db.gamesData[context.peerId].convGame.amount)

      if (db.gamesData[context.peerId].convGame.amount <= 0) {
         return context.send({
            message: `${bankText}\n\nХэш игры: ${db.gamesData[context.peerId].convGame.resultData.hash}\n\nДо конца раунда: ${util.unixStampLeft(db.gamesData[context.peerId].convGame.timeNow)}`,
            keyboard: keyboards.double_keyboard

         })
      }

      if (db.gamesData[context.peerId].convGame.amount > 0) {
         for (i in db.gamesData[context.peerId].convGame.bets) {
            console.log(db.gamesData[context.peerId].convGame.bets[i])

            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].x2 > 0) {
               x2_text = 'Ставки на x2:'
               x2_list += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].x2)} коинов\n`
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].x2)
               betsMany += Number(1)
            }
            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].x3 > 0) {
               x3_text = 'Ставки на x3:'
               x3_list += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].x3)} коинов\n`
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].x3)
               betsMany += Number(1)
            }
            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].x5 > 0) {
               x5_text = 'Ставки на x5:'
               x5_list += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].x5)} коинов\n`
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].x5)
               betsMany += Number(1)
            }
            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].x50 > 0) {
               x50_text = 'Ставки на x50:'
               x50_list += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].x50)} коинов\n`
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].x50)
               betsMany += Number(1)
            }

            // ! Виртуальный баланс
            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].vx2 > 0) {
               x2_text = 'Ставки на x2:'
               x2_list += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].vx2)} ${config.botVirtualCurrency}\n`
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].vx2)
               betsMany += Number(1)
            }
            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].vx3 > 0) {
               x3_text = 'Ставки на x3:'
               x3_list += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].vx3)} ${config.botVirtualCurrency}\n`
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].vx3)
               betsMany += Number(1)
            }
            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].vx5 > 0) {
               x5_text = 'Ставки на x5:'
               x5_list += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].vx5)} ${config.botVirtualCurrency}\n`
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].vx5)
               betsMany += Number(1)
            }
            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].vx50 > 0) {
               x50_text = 'Ставки на x50:'
               x50_list += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].vx50)} ${config.botVirtualCurrency}\n`
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].vx50)
               betsMany += Number(1)
            }

         }





         bankText = `Всего поставлено: ${util.number_format(betsSum)}`
         if (betsMany > db.botSettings.gamesSettings.bankMaxSize) {
            return context.send({
               message: `${bankText}\n\nБанк слишком длинный, невозможно отобразить столько ставок (количество: ${betsMany}). Все ставки на месте, дождись розыгрыша, чтоб узнать, выиграла ли твоя ставка или нет.\n\nХэш игры: ${db.gamesData[context.peerId].convGame.resultData.hash}\n\nДо конца раунда: ${util.unixStampLeft(db.gamesData[context.peerId].convGame.timeNow)}`,
               keyboard: keyboards.double_keyboard
            })
         }

         return context.send({
            message: `${bankText}\n\n${x2_text}\n${x2_list}\n\n${x3_text}\n${x3_list}\n\n${x5_text}\n${x5_list}\n\n${x50_text}\n${x50_list}\n\nХэш игры: ${db.gamesData[context.peerId].convGame.resultData.hash}\n\nДо конца раунда: ${util.unixStampLeft(db.gamesData[context.peerId].convGame.timeNow)}`,
            keyboard: keyboards.double_keyboard
         })

      }





   }
   // ? Dream Catcher
   if (db.gamesData[context.peerId].convData.isActive == true && db.gamesData[context.peerId].convData.gamemode == 'dreamcatcher' && context.messagePayload && context.messagePayload.command == 'bank') {

      let bankText = `На данный момент ставок нет`

      let x1_text = ``
      let x1_list = ``

      let x2_text = ``
      let x2_list = ``

      let x5_text = ``
      let x5_list = ``

      let x10_text = ``
      let x10_list = ``

      let x20_text = ``
      let x20_list = ``

      let x40_text = ``
      let x40_list = ``

      let betsSum = 0
      let betsMany = 0
      console.log(db.gamesData[context.peerId].convGame.amount)

      if (db.gamesData[context.peerId].convGame.amount <= 0) {
         return context.send({
            message: `${bankText}\n\nХэш игры: ${db.gamesData[context.peerId].convGame.resultData.hash}\n\nДо конца раунда: ${util.unixStampLeft(db.gamesData[context.peerId].convGame.timeNow)}`,
            keyboard: keyboards.dreamcatcher_keyboard

         })
      }

      if (db.gamesData[context.peerId].convGame.amount > 0) {
         for (i in db.gamesData[context.peerId].convGame.bets) {
            console.log(db.gamesData[context.peerId].convGame.bets[i])


            // Основной баланс
            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].x1 > 0) {
               x1_text = 'Ставки на x1:'
               x1_list += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].x1)} коинов\n`
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].x1)
               betsMany += Number(1)
            }
            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].x2 > 0) {
               x2_text = 'Ставки на x2:'
               x2_list += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].x2)} коинов\n`
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].x2)
               betsMany += Number(1)
            }
            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].x5 > 0) {
               x5_text = 'Ставки на x5:'
               x5_list += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].x5)} коинов\n`
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].x5)
               betsMany += Number(1)
            }
            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].x10 > 0) {
               x10_text = 'Ставки на x10:'
               x10_list += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].x10)} коинов\n`
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].x10)
               betsMany += Number(1)
            }
            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].x20 > 0) {
               x20_text = 'Ставки на x20:'
               x20_list += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].x20)} коинов\n`
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].x20)
               betsMany += Number(1)
            }
            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].x40 > 0) {
               x40_text = 'Ставки на x40:'
               x40_list += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].x40)} коинов\n`
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].x40)
               betsMany += Number(1)
            }

            // Виртуальный баланс
            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].vx1 > 0) {
               x1_text = 'Ставки на x1:'
               x1_list += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].vx1)} ${config.botVirtualCurrency}\n`
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].vx1)
               betsMany += Number(1)
            }
            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].vx2 > 0) {
               x2_text = 'Ставки на x2:'
               x2_list += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].vx2)} ${config.botVirtualCurrency}\n`
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].vx2)
               betsMany += Number(1)
            }
            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].vx5 > 0) {
               x5_text = 'Ставки на x5:'
               x5_list += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].vx5)} ${config.botVirtualCurrency}\n`
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].vx5)
               betsMany += Number(1)
            }
            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].vx10 > 0) {
               x10_text = 'Ставки на x10:'
               x10_list += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].vx10)} ${config.botVirtualCurrency}\n`
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].vx10)
               betsMany += Number(1)
            }
            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].vx20 > 0) {
               x20_text = 'Ставки на x20:'
               x20_list += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].vx20)} ${config.botVirtualCurrency}\n`
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].vx20)
               betsMany += Number(1)
            }
            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].vx40 > 0) {
               x40_text = 'Ставки на x40:'
               x40_list += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].vx40)} ${config.botVirtualCurrency}\n`
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].vx40)
               betsMany += Number(1)
            }


         }





         bankText = `Всего поставлено: ${util.number_format(betsSum)}`
         if (betsMany > db.botSettings.gamesSettings.bankMaxSize) {
            return context.send({
               message: `${bankText}\n\nБанк слишком длинный, невозможно отобразить столько ставок (количество: ${betsMany}). Все ставки на месте, дождись розыгрыша, чтоб узнать, выиграла ли твоя ставка или нет.\n\nХэш игры: ${db.gamesData[context.peerId].convGame.resultData.hash}\n\nДо конца раунда: ${util.unixStampLeft(db.gamesData[context.peerId].convGame.timeNow)}`,
               keyboard: keyboards.dreamcatcher_keyboard
            })
         }

         return context.send({
            message: `${bankText}\n\n${x1_text}\n${x1_list}\n\n${x2_text}\n${x2_list}\n\n${x5_text}\n${x5_list}\n\n${x10_text}\n${x10_list}\n\n${x20_text}\n${x20_list}\n\n${x40_text}\n${x40_list}\n\nХэш игры: ${db.gamesData[context.peerId].convGame.resultData.hash}\n\nДо конца раунда: ${util.unixStampLeft(db.gamesData[context.peerId].convGame.timeNow)}`,
            keyboard: keyboards.dreamcatcher_keyboard
         })

      }





   }
   // ? Down7Up
   if (db.gamesData[context.peerId].convData.isActive == true && db.gamesData[context.peerId].convData.gamemode == 'down7up' && context.messagePayload && context.messagePayload.command == 'bank') {

      let bankText = `На данный момент ставок нет`

      let down_text = ``
      let down_list = ``

      let seven_text = ``
      let seven_list = ``

      let up_text = ``
      let up_list = ``

      let betsSum = 0
      let betsMany = 0
      console.log(db.gamesData[context.peerId].convGame.amount)

      if (db.gamesData[context.peerId].convGame.amount <= 0) {
         return context.send({
            message: `${bankText}\n\nХэш игры: ${db.gamesData[context.peerId].convGame.resultData.hash}\n\nДо конца раунда: ${util.unixStampLeft(db.gamesData[context.peerId].convGame.timeNow)}`,
            keyboard: keyboards.down7up_keyboard

         })
      }

      if (db.gamesData[context.peerId].convGame.amount > 0) {
         for (i in db.gamesData[context.peerId].convGame.bets) {
            console.log(db.gamesData[context.peerId].convGame.bets[i])

            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].down > 0) {
               down_text = 'Ставки на выпадение числа меньше 7:'
               down_list += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].down)} коинов\n`
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].down)
               betsMany += Number(1)
            }
            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].seven > 0) {
               seven_text = 'Ставки на выпадение числа 7:'
               seven_list += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].seven)} коинов\n`
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].seven)
               betsMany += Number(1)
            }
            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].up > 0) {
               up_text = 'Ставки на выпадение числа больше 7:'
               up_list += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].up)} коинов\n`
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].up)
               betsMany += Number(1)
            }

            // ! Виртуальный балик
            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].vdown > 0) {
               down_text = 'Ставки на выпадение числа меньше 7:'
               down_list += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].vdown)} ${config.botVirtualCurrency}\n`
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].vdown)
               betsMany += Number(1)
            }
            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].vseven > 0) {
               seven_text = 'Ставки на выпадение числа 7:'
               seven_list += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].vseven)} ${config.botVirtualCurrency}\n`
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].vseven)
               betsMany += Number(1)
            }
            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].vup > 0) {
               up_text = 'Ставки на выпадение числа больше 7:'
               up_list += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].vup)} ${config.botVirtualCurrency}\n`
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].vup)
               betsMany += Number(1)
            }
         }





         bankText = `Всего поставлено: ${util.number_format(betsSum)}`

         if (betsMany > db.botSettings.gamesSettings.bankMaxSize) {
            return context.send({
               message: `${bankText}\n\nБанк слишком длинный, невозможно отобразить столько ставок (количество: ${betsMany}). Все ставки на месте, дождись розыгрыша, чтоб узнать, выиграла ли твоя ставка или нет.\n\nХэш игры: ${db.gamesData[context.peerId].convGame.resultData.hash}\n\nДо конца раунда: ${util.unixStampLeft(db.gamesData[context.peerId].convGame.timeNow)}`,
               keyboard: keyboards.down7up_keyboard
            })
         }


         return context.send({
            message: `${bankText}\n\n${down_text}\n${down_list}\n\n${seven_text}\n${seven_list}\n\n${up_text}\n${up_list}\n\nХэш игры: ${db.gamesData[context.peerId].convGame.resultData.hash}\n\nДо конца раунда: ${util.unixStampLeft(db.gamesData[context.peerId].convGame.timeNow)}`,
            keyboard: keyboards.down7up_keyboard
         })

      }





   }
   // ? Wheel
   if (db.gamesData[context.peerId].convData.isActive == true && db.gamesData[context.peerId].convData.gamemode == 'wheel' && context.messagePayload && context.messagePayload.command == 'bank') {

      let bankText = `На данный момент ставок нет`

      let blackText = ``
      let blackList = ``

      let redText = ``
      let redList = ``

      let evenText = ``
      let evenList = ``

      let notevenText = ``
      let notevenList = ``

      let int112Text = ``
      let int112List = ``

      let int1324Text = ``
      let int1324List = ``

      let int2536Text = ``
      let int2536List = ``

      let numbersText = ``
      let numbersList = ``

      let betsSum = 0
      let betsMany = 0

      console.log(db.gamesData[context.peerId].convGame.amount)

      if (db.gamesData[context.peerId].convGame.amount <= 0) {
         return context.send({
            message: `${bankText}\n\nХэш игры: ${db.gamesData[context.peerId].convGame.resultData.hash}\n\nДо конца раунда: ${util.unixStampLeft(db.gamesData[context.peerId].convGame.timeNow)}`,
            keyboard: keyboards.wheel_keyboard

         })
      }

      if (db.gamesData[context.peerId].convGame.amount > 0) {
         for (i in db.gamesData[context.peerId].convGame.bets) {
            console.log(db.gamesData[context.peerId].convGame.bets[i])

            // Красное
            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].red > 0) {
               redText = 'Ставки на красное:'
               redList += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].red)} коинов\n`
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].red)
               betsMany += Number(1)
            }
            // Черное
            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].black > 0) {
               blackText = 'Ставки на черное:'
               blackList += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].black)} коинов\n`
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].black)
               betsMany += Number(1)
            }

            // Четное
            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].even > 0) {
               evenText = 'Ставки на четное:'
               evenList += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].even)} коинов\n`
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].even)
               betsMany += Number(1)
            }
            // Нечетное
            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].noteven > 0) {
               notevenText = 'Ставки на нечетное:'
               notevenList += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].noteven)} коинов\n`
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].noteven)
               betsMany += Number(1)
            }


            // Промежуток 1-12
            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].int112 > 0) {
               int112Text = 'Ставки на промежуток 1-12:'
               int112List += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].int112)} коинов\n`
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].int112)
               betsMany += Number(1)
            }
            // Промежуток 13-24
            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].int1324 > 0) {
               int1324Text = 'Ставки на промежуток 13-24:'
               int1324List += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].int1324)} коинов\n`
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].int1324)
               betsMany += Number(1)
            }
            // Промежуток 25-36
            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].int2536 > 0) {
               int2536Text = 'Ставки на промежуток 25-36:'
               int2536List += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].int2536)} коинов\n`
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].int2536)
               betsMany += Number(1)
            }






            // Отрисовка чисел
            for (let c in db.gamesData[context.peerId].convGame.bets[i].numbers) {
               if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].numbers[c].amount > 0) {
                  numbersText = `Ставки на числа:`
                  numbersList += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].numbers[c].amount)} коинов на число ${db.gamesData[context.peerId].convGame.bets[i].numbers[c].number}\n`
                  betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].numbers[c].amount)
                  betsMany += Number(1)
               }
            }

            // Красное
            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].vred > 0) {
               redText = 'Ставки на красное:'
               redList += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].vred)} ${config.botVirtualCurrency}\n`
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].vred)
               betsMany += Number(1)
            }
            // Черное
            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].vblack > 0) {
               blackText = 'Ставки на черное:'
               blackList += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].vblack)} ${config.botVirtualCurrency}\n`
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].vblack)
               betsMany += Number(1)
            }

            // Четное
            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].veven > 0) {
               evenText = 'Ставки на четное:'
               evenList += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].veven)} ${config.botVirtualCurrency}\n`
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].veven)
               betsMany += Number(1)
            }
            // Нечетное
            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].vnoteven > 0) {
               notevenText = 'Ставки на нечетное:'
               notevenList += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].vnoteven)} ${config.botVirtualCurrency}\n`
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].vnoteven)
               betsMany += Number(1)
            }


            // Промежуток 1-12
            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].vint112 > 0) {
               int112Text = 'Ставки на промежуток 1-12:'
               int112List += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].vint112)} ${config.botVirtualCurrency}\n`
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].vint112)
               betsMany += Number(1)
            }
            // Промежуток 13-24
            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].vint1324 > 0) {
               int1324Text = 'Ставки на промежуток 13-24:'
               int1324List += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].vint1324)} ${config.botVirtualCurrency}\n`
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].vint1324)
               betsMany += Number(1)
            }
            // Промежуток 25-36
            if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].vint2536 > 0) {
               int2536Text = 'Ставки на промежуток 25-36:'
               int2536List += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].vint2536)} ${config.botVirtualCurrency}\n`
               betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].vint2536)
               betsMany += Number(1)
            }






            // Отрисовка чисел
            for (let c in db.gamesData[context.peerId].convGame.bets[i].vnumbers) {
               if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].vnumbers[c].amount > 0) {
                  numbersText = `Ставки на числа:`
                  numbersList += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].vnumbers[c].amount)} ${config.botVirtualCurrency} на число ${db.gamesData[context.peerId].convGame.bets[i].vnumbers[c].number}\n`
                  betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].vnumbers[c].amount)
                  betsMany += Number(1)
               }
            }


         }
         bankText = `Всего поставлено: ${util.number_format(betsSum)}`
         if (betsMany > db.botSettings.gamesSettings.bankMaxSize) {
            return context.send({
               message: `${bankText}\n\nБанк слишком длинный, невозможно отобразить столько ставок (количество: ${betsMany}). Все ставки на месте, дождись розыгрыша, чтоб узнать, выиграла ли твоя ставка или нет.\n\nХэш игры: ${db.gamesData[context.peerId].convGame.resultData.hash}\n\nДо конца раунда: ${util.unixStampLeft(db.gamesData[context.peerId].convGame.timeNow)}`,
               keyboard: keyboards.wheel_keyboard
            })
         }

         return context.send({
            message: `${bankText}\n\n${blackText}\n${blackList}\n\n${redText}\n${redList}\n\n${evenText}\n${evenList}\n\n${notevenText}\n${notevenList}\n\n${int112Text}\n${int112List}\n\n${int1324Text}\n${int1324List}\n\n${int2536Text}\n${int2536List}\n\n${numbersText}\n${numbersList}\n\nХэш игры: ${db.gamesData[context.peerId].convGame.resultData.hash}\n\nДо конца раунда: ${util.unixStampLeft(db.gamesData[context.peerId].convGame.timeNow)}`,
            keyboard: keyboards.wheel_keyboard
         })

      }





   }
   // ? Crash
   if (db.gamesData[context.peerId].convData.isActive == true && db.gamesData[context.peerId].convData.gamemode == 'crash' && context.messagePayload && context.messagePayload.command == 'bank') {

      let bankText = `На данный момент ставок нет`

      let rationsText = ``
      let rationsList = ``

      let betsSum = 0
      let betsMany = 0

      console.log(db.gamesData[context.peerId].convGame.amount)

      if (db.gamesData[context.peerId].convGame.amount <= 0) {
         return context.send({
            message: `${bankText}\n\nХэш игры: ${db.gamesData[context.peerId].convGame.resultData.hash}\n\nДо конца раунда: ${util.unixStampLeft(db.gamesData[context.peerId].convGame.timeNow)}`,
            keyboard: keyboards.crash_keyboard

         })
      }

      if (db.gamesData[context.peerId].convGame.amount > 0) {
         for (i in db.gamesData[context.peerId].convGame.bets) {
            console.log(db.gamesData[context.peerId].convGame.bets[i])

   
            // Отрисовка чисел
            for (let c in db.gamesData[context.peerId].convGame.bets[i].rations) {
               if (db.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && db.gamesData[context.peerId].convGame.bets[i].rations[c].amount > 0) {
                  rationsText = `Ставки на коэффициенты:`
                  rationsList += `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[context.peerId].convGame.bets[i].id}|${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${db.playersData[db.gamesData[context.peerId].convGame.bets[i].id].name}`} - ${util.number_format(db.gamesData[context.peerId].convGame.bets[i].rations[c].amount)} коинов на коэффициент x${db.gamesData[context.peerId].convGame.bets[i].rations[c].ration}\n`
                  betsSum += Number(db.gamesData[context.peerId].convGame.bets[i].rations[c].amount)
                  betsMany += Number(1)
               }
            }

       

         }
         bankText = `Всего поставлено: ${util.number_format(betsSum)}`
         if (betsMany > db.botSettings.gamesSettings.bankMaxSize) {
            return context.send({
               message: `${bankText}\n\nБанк слишком длинный, невозможно отобразить столько ставок (количество: ${betsMany}). Все ставки на месте, дождись розыгрыша, чтоб узнать, выиграла ли твоя ставка или нет.\n\nХэш игры: ${db.gamesData[context.peerId].convGame.resultData.hash}\n\nДо конца раунда: ${util.unixStampLeft(db.gamesData[context.peerId].convGame.timeNow)}`,
               keyboard: keyboards.crash_keyboard
            })
         }

         return context.send({
            message: `${bankText}\n\n${rationsText}\n${rationsList}\n\nХэш игры: ${db.gamesData[context.peerId].convGame.resultData.hash}\n\nДо конца раунда: ${util.unixStampLeft(db.gamesData[context.peerId].convGame.timeNow)}`,
            keyboard: keyboards.crash_keyboard
         })

      }





   }

}