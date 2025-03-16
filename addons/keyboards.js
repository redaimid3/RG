const { Keyboard } = require('vk-io')
const config = require('../config')

module.exports = {

    main_menu: Keyboard.keyboard([
        [
            Keyboard.textButton({ label: `Приступить к игре`, payload: { command: 'gamesList'}, color: 'positive' })
        ],
        
        [
            Keyboard.textButton({ label: `Магазин`, color: 'secondary', payload: { command: "getMarket" } }),
            Keyboard.textButton({ label: `Топ игроков`, color: 'secondary', payload: { command: "getAllTimeTop" } })
        ],
        [
            Keyboard.textButton({ label: `Перевести`, color: 'secondary', payload: { command: "getTransfer" } }),
            Keyboard.textButton({ label: `Настройки`, color: 'secondary', payload: { command: "getSettings"} })
        ],
        
[
            Keyboard.textButton({ label: `🔥 Топ дня`, color: 'negative', payload: { command: "getDayTop" } })
        ],
        [
          //  Keyboard.textButton({ label: `🏆 Топ кланов на 1кккк PS`, payload: { command: `clansTop` }, color: 'negative' })
        ]

    ]),


    dreamcatcher_keyboard: Keyboard.keyboard([
        [
            Keyboard.textButton({ label: `Банк`, payload: { command: 'bank'}, color: 'secondary' }),
            Keyboard.textButton({ label: `Баланс`, payload: { command: `balance` }, color: 'secondary' })
        ],
        [
            Keyboard.textButton({ label: `x1`,  payload: { command: 'dreamcatcher_bet_x1'}, color: 'secondary' }),
            Keyboard.textButton({ label: `x2`, payload: { command: 'dreamcatcher_bet_x2'}, color: 'secondary' }),
            Keyboard.textButton({ label: `x5`, payload: { command: 'dreamcatcher_bet_x5'}, color: 'secondary' }),
        ],
        [
            Keyboard.textButton({ label: `x10`,  payload: { command: 'dreamcatcher_bet_x10'}, color: 'secondary' }),
            Keyboard.textButton({ label: `x20`, payload: { command: 'dreamcatcher_bet_x20'}, color: 'secondary' }),
            Keyboard.textButton({ label: `x40`, payload: { command: 'dreamcatcher_bet_x40'}, color: 'secondary' }),
        ],
        [

         Keyboard.urlButton({ label: `Пополнить`, url: `https://vk.com/coin#x${config.vkCoinId}_null_777_1` }),
         Keyboard.textButton({ label: `Вывести`, payload: { command: 'withdraw'}, color: 'secondary' }),

        ]
    ]),


    down7up_keyboard: Keyboard.keyboard([
        [
            Keyboard.textButton({ label: `Банк`, payload: { command: 'bank'}, color: 'secondary' }),
            Keyboard.textButton({ label: `Баланс`, payload: { command: `balance` }, color: 'secondary' })
        ],
        [
            Keyboard.textButton({ label: `Под`,  payload: { command: 'down7up_bet_down'}, color: 'secondary' }),
            Keyboard.textButton({ label: `7`, payload: { command: 'down7up_bet_seven'}, color: 'secondary' }),
            Keyboard.textButton({ label: `Над`, payload: { command: 'down7up_bet_up'}, color: 'secondary' }),
        ],
        [

            Keyboard.urlButton({ label: `Пополнить`, url: `https://vk.com/coin#x${config.vkCoinId}_null_777_1` }),
            Keyboard.textButton({ label: `Вывести`, payload: { command: 'withdraw'}, color: 'secondary' }),
        ]
    ]),




    double_keyboard: Keyboard.keyboard([
        [
            Keyboard.textButton({ label: `Банк`, payload: { command: 'bank'}, color: 'secondary' }),
            Keyboard.textButton({ label: `Баланс`, payload: { command: `balance` }, color: 'secondary' })
        ],
        [
            Keyboard.textButton({ label: `x2`,  payload: { command: 'double_bet_x2'}, color: 'secondary' }),
            Keyboard.textButton({ label: `x3`, payload: { command: 'double_bet_x3'}, color: 'secondary' }),
            Keyboard.textButton({ label: `x5`, payload: { command: 'double_bet_x5'}, color: 'secondary' }),
            Keyboard.textButton({ label: `x50`, payload: { command: 'double_bet_x50'}, color: 'secondary' }),
        ],
        [

            Keyboard.urlButton({ label: `Пополнить`, url: `https://vk.com/coin#x${config.vkCoinId}_null_777_1` }),
            Keyboard.textButton({ label: `Вывести`, payload: { command: 'withdraw'}, color: 'secondary' }),

        ]
    ]),


    dice_keyboard: Keyboard.keyboard([
 
        [
            Keyboard.textButton({ label: `Банк`, payload: { command: 'bank'}, color: 'secondary' }),
            Keyboard.textButton({ label: `Баланс`, payload: { command: `balance` }, color: 'secondary' })
        ],
        [
            Keyboard.textButton({ label: `1`,  payload: { command: 'dice_bet_one'}, color: 'secondary' }),
            Keyboard.textButton({ label: `2`, payload: { command: 'dice_bet_two'}, color: 'secondary' }),
            Keyboard.textButton({ label: `3`, payload: { command: 'dice_bet_three'}, color: 'secondary' }),
        ],
        [
            Keyboard.textButton({ label: `4`,  payload: { command: 'dice_bet_four'}, color: 'secondary' }),
            Keyboard.textButton({ label: `5`,  payload: { command: 'dice_bet_five'}, color: 'secondary' }),
            Keyboard.textButton({ label: `6`,  payload: { command: 'dice_bet_six'}, color: 'secondary' }),        
        ],
        [
            Keyboard.textButton({ label: `Четное`, payload: { command: 'dice_bet_even'}, color: 'secondary' }),
            Keyboard.textButton({ label: `Нечетное`,payload: { command: 'dice_bet_noteven'}, color: 'secondary' }),
    
        ],
        [
            Keyboard.urlButton({ label: `Пополнить`, url: `https://vk.com/coin#x${config.vkCoinId}_null_777_1` }),
            Keyboard.textButton({ label: `Вывести`, payload: { command: 'withdraw'}, color: 'secondary' }),
        ]

    ]),

    wheel_keyboard: Keyboard.keyboard([
 
        [
            Keyboard.textButton({ label: `Банк`, payload: { command: 'bank'}, color: 'secondary' }),
            Keyboard.textButton({ label: `Баланс`, payload: { command: `balance` }, color: 'secondary' })
        ],
        [
            Keyboard.textButton({ label: `Красное`,  payload: { command: 'wheel_bet_red'}, color: 'secondary' }),
            Keyboard.textButton({ label: `Черное`, payload: { command: 'wheel_bet_black'}, color: 'secondary' }),
        ],
        [
            Keyboard.textButton({ label: `1-12`,  payload: { command: 'wheel_bet_int112'}, color: 'secondary' }),
            Keyboard.textButton({ label: `13-24`,  payload: { command: 'wheel_bet_int1324'}, color: 'secondary' }),
            Keyboard.textButton({ label: `25-36`,  payload: { command: 'wheel_bet_int2536'}, color: 'secondary' }),        
        ],
        [
            Keyboard.textButton({ label: `Четное`,  payload: { command: 'wheel_bet_even'}, color: 'secondary' }),
            Keyboard.textButton({ label: `На число`,  payload: { command: 'wheel_bet_numbers'}, color: 'secondary' }),
            Keyboard.textButton({ label: `Нечетное`,  payload: { command: 'wheel_bet_noteven'}, color: 'secondary' }),        
        ],

        [
            Keyboard.urlButton({ label: `Пополнить`, url: `https://vk.com/coin#x${config.vkCoinId}_null_777_1` }),
            Keyboard.textButton({ label: `Вывести`, payload: { command: 'withdraw'}, color: 'secondary' }),
        ]

    ]),

    
    crash_keyboard: Keyboard.keyboard([
        [
            Keyboard.textButton({ label: `Сделать ставку`, payload: { command: 'crash_bet'}, color: 'secondary' }),

        ],
        [
            Keyboard.textButton({ label: `Банк`, payload: { command: 'bank'}, color: 'secondary' }),
            Keyboard.textButton({ label: `Баланс`, payload: { command: `balance` }, color: 'secondary' })
        ],
        [
            Keyboard.urlButton({ label: `Пополнить`, url: `https://vk.com/coin#x${config.vkCoinId}_null_777_1` }),
            Keyboard.textButton({ label: `Вывести`, payload: { command: 'withdraw'}, color: 'secondary' }),
        ]
    ]),




}