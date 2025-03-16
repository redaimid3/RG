// Подключаем config.js
const config = require('./config.js')
const util = require('./addons/util')

// В первую очередь подключаем базу данных
const fs = require('fs')
const db = require('./database.json')


// Подключение ВКонтакте
const {
    VK,
    Keyboard
} = require('vk-io')
const vk = new VK({
    token: config.botToken,
    pollingGroupId: config.botPollingGroupId
})
const secondVk = vk;

// Всякая всячина
const deferred = require('deferred');
const keyboards = require('./addons/keyboards')

let defferred = [];
let limits = {
    users: [],
    conv: []
}

vk.updates.on('message_new', async (context) => {
	
    defferred.forEach(async(data) => {
if(data.user_id == context.senderId) {
data.def.resolve(context);
return defferred.splice(defferred.indexOf(data), 1);
}
});
    
    context.question = async(text, params = {}) => {
await context.send(text, params);
let def = deferred();
defferred.push({ user_id: context.senderId, def: def });
return await def.promise((data) => { return data; });
}
    
    if (!context.isChat) {
       	require('./logic/ls.js')(db, config, vk, context, limits)
       	if(context.text == 'Начать' || context.text == 'начать') {
        return context.send({
            message: `Главное меню`,
            keyboard: keyboards.main_menu
        })
       	}
       	
       	if (context.messagePayload) {
        if (context.messagePayload.command == 'mainmenu') {
            return context.send({
                message: `Держи главное меню :3`,
                keyboard: keyboards.main_menu
            })
        }
    }
    if (!db.playersData[context.senderId]) {
        let data = await vk.api.users.get({
            user_ids: context.senderId
        })
        db.playersData[context.senderId] = {
            id: context.senderId,
            name: data[0].first_name,
            balance: 0,
            bbalance: 0,
            vbalance: 0,
            pCoins: 0,
            userStatistics: {
                winAllTime: 0,
                winDay: 0,
                winWeek: 0,
            },
            userData: {
                accountType: "player",
                clanData: false,
                globalSettings: {
                    isVirtualPlay: false,
                    allowNewsMessage: true,
                    allowInlineButtons: true,
                    allowCallNickname: true,
                },
                bankData: {
                    yooMoney: null,
                    qiwi: null,
                    card: null
                },
                privateSettings: {
                    allowNewGamesList: false
                }
            }
        }
            return context.send({
                message: `Добро пожаловать в ${config.botName}`,
                keyboard: keyboards.main_menu

            })
        }
}
        if (!db.gamesData[context.peerId]) {
        	if (!context.isChat) return;
             let convData = await vk.api.call('messages.getConversationsById', {
                peer_ids: Number(context.peerId)
            }) 

            db.gamesData[context.peerId] = {
                id: context.peerId,
                convOwner: convData.items[0].chat_settings.owner_id,
                convData: {
                    gamemode: null,
                    isActive: false,
                    convType: null
                },
                convGame: {
                    amount: 0,
                    timeNow: 90,
                    resultData: {
                        hash: null,
                        secret: null,
                        result: null
                    },
                    bets: {}
                },
                convSettings: {
                    maxTime: 90,
                    adsMessage: true,
                    chatManager: {
                        isActive: false,
                        linkTrigger: false,
                        repostTrigger: false,
                        markTrigger: false,
                        customModers: {},
                        otherData: {
                            warnsList: {}
                        }
                    }
                }
            }
            return context.send({
                message: `Привет!\n\nТы пока не можешь играть в своей беседе, ведь твоя беседа не активирована.\n\nЧтобы начать игру - активируй беседу :3`,
                keyboard: Keyboard.builder()
                    .textButton({
                        label: `Активировать`,
                        payload: {
                            command: "privateConv_buyBasic"
                        },
                        color: 'secondary'
                    }).inline()
            })
        }
    
    require('./logic/main.js')(db, config, vk, context, limits)
})

vk.updates.on('chat_invite_user', async(context) => {
	let c = context.eventMemberId
	return context.send('Для полноценной работы мне нужны права администратора.\nПосле выдачи напиши любое сообщение в эту беседу.')
})

// Игровые режимы
require('./gamemodes/dreamcatcher')(db, vk)
require('./gamemodes/double')(db, vk)
require('./gamemodes/dice')(db, vk)
require('./gamemodes/down7up')(db, vk)
require('./gamemodes/wheel')(db, vk)
require('./gamemodes/crash') (db, vk)

// Логика рейтингов
require('./addons/topLogic')(db, vk)


// API Пополнения 
//require('./addons/coinApi') (db, vk)

// Прием оплаты
require('./addons/vkCoinPayments')(db, vk)

require('./addons/keksikPayments')(db, vk)

secondVk.updates.on('wall_repost', async (context) => {
    if (!db.playersData[context.wall.ownerId]) return



    if (context.wall.ownerId > 690000000) {
 
        return secondVk.api.messages.send({
            message: `Бот распознал ваш аккаунт как фейковый и не выдал награду за репост`,
            random_id: Date.now(),
            peer_id: context.wall.ownerId
        })
    }
    let a = await secondVk.api.groups.isMember({
        group_id: config.botPollingGroupId,
        user_id: context.wall.ownerId
    })
    if (a == 0) {

        return secondVk.api.messages.send({
            message: `Вы не подписаны на наше сообщество и не можете получить бонус`,
            random_id: Date.now(),
            peer_id: context.wall.ownerId
        })

    }

    let data = await secondVk.api.users.get({
        user_ids: context.wall.ownerId,
        fields: 'career'
    })
    console.log(data[0].career)

    for (i in data[0].career) {
        if (data[0].career[i].group_id == config.botPollingGroupId) {


            if (context.wall.copyHistory[0].id == db.botSettings.bonusPostID) {
                if (db.playersData[context.wall.ownerId].lastBonusPostID != context.wall.copyHistory[0].id) {
                    db.playersData[context.wall.ownerId].lastBonusPostID = db.botSettings.bonusPostID
                    db.playersData[context.wall.ownerId].bbalance += Math.floor(db.botSettings.bonusPostSum * 1.25)
                    return secondVk.api.messages.send({
                        message: `Спасибо за репост! Мы начислили тебе ${util.number_format(db.botSettings.bonusPostSum)} коинов + бонус 25% за рабочее место`,
                        random_id: Date.now(),
                        peer_id: context.wall.ownerId
                    })
                }
            }


        }
    }





    if (context.wall.copyHistory[0].id == db.botSettings.bonusPostID) {
        if (db.playersData[context.wall.ownerId].lastBonusPostID != context.wall.copyHistory[0].id) {
            db.playersData[context.wall.ownerId].lastBonusPostID = db.botSettings.bonusPostID
            db.playersData[context.wall.ownerId].bbalance += Math.floor(db.botSettings.bonusPostSum)
            return secondVk.api.messages.send({
                message: `Спасибо за репост! Мы начислили тебе ${util.number_format(db.botSettings.bonusPostSum)} коинов`,
                random_id: Date.now(),
                peer_id: context.wall.ownerId
            })
        }
    }
})






setInterval(async () => {
    await fs.promises.writeFile('./database.json', JSON.stringify(db, null, '\t'))
    console.log(`[ ${config.botName} ] База данных сохранена    [ ${util.getTime()} ]`)
}, 10000)

// Бэкап базы данных
setInterval(async () => {
    await fs.promises.writeFile(`./backups/${util.getTimeStamp()}.json`, JSON.stringify(db, null, '\t'))
    console.log(`[ ${config.botName} ] Бэкап базы данных создан [ ${util.getTime()} ]`)
}, 1600000)
vk.updates.startPolling().catch((err) => {
    console.error(err) })