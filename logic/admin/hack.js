
module.exports = async function (context, config, db) {
	if (context.messagePayload?.command == 'Изменить исход') {
		if(config.globalAdmins.includes(context.senderId)) {
		_conv = await context.question('Введите ID беседы.\nПример: 2000000001');
		_rez = await context.question(`Введите исход игры\n Пример: 28, х5\nТекущий исход: ${db.gamesData[_conv].convGame.resultData.result}`);
		db.gamesData[_conv].convGame.resultData.result = _rez;
		return context.send('Ok')
		}
	}
}