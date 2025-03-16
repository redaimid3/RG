const {
    Keyboard
} = require('vk-io')
const util = require('../../addons/util')
const config = require('../../config')
module.exports = async function (db, vk, context, limits) {

    if (context.isChat) return
    if (context.messagePayload) {
        if (context.messagePayload.command == 'clansTop') {
            // ! Важно отросивать нормально топ
            let top = []
            let topme = []
            let my = 0
            for (let i in db.clansData) { // перебор базы данных
                top.push({
                    id: db.clansData[i].id,
                    name: db.clansData[i].clanInfo.clanName,
                    shortName: db.clansData[i].clanInfo.clanShortName,
                    owner: db.clansData[i].clanInfo.clanOwner,
                    win: db.clansData[i].clanStatistics.winWeek // создание массива

                })
            }
            const find = () => {
                let pos = 1000;

                for (let i = 0; i < top.length; i++) {
                    if (top[i].id === context.senderId) return pos = i;
                }
                return pos;
            }
            top.sort(function (a, b) {
                if (b.win > a.win) return 1
                if (b.win < a.win) return -1
                return 0
            }); //Сортировка
            let text = ""
            for (let s = 0; s < top.length; s++) {
                topme.push(top[s].id)
            }
            if (top.length < 5) {
                for (let j = 0; j < top.length; j++) {
                    console.log('my', my)
                    my += Number(1)
                    text += `${my}. ${db.clansData[top[j].id].clanInfo.clanShortName == false ? '': `[${db.clansData[top[j].id].clanInfo.clanShortName}]`} [id${db.clansData[top[j].id].clanInfo.clanOwner}|${db.clansData[top[j].id].clanInfo.clanName}] - ${util.number_format(top[j].win)} коинов (Награда: ${util.shortnum(db.botSettings.topSettings.clansTop.amount[my - 1])})\n`
                }

            } else {
                for (let j = 0; j < 5; j++) {
                    my += Number(1)
                    text += `${my}. ${db.clansData[top[j].id].clanInfo.clanShortName == false ? '': `[${db.clansData[top[j].id].clanInfo.clanShortName}]`} [id${db.clansData[top[j].id].clanInfo.clanOwner}|${db.clansData[top[j].id].clanInfo.clanName}] - ${util.number_format(top[j].win)} коинов (Награда: ${util.shortnum(db.botSettings.topSettings.clansTop.amount[my - 1])})\n`
                }
            }
            console.log(top)

            return context.send({
                message: text,
                keyboard: Keyboard.builder()
                    .urlButton({
                        label: `Подробнее про кланы`,
                        url: config.clansInfoLink
                    }).inline()

            })



        }
    }
}