var MersenneTwister = require('mersenne-twister');
var generator = new MersenneTwister();

module.exports = {
	getTimeStamp: () => {
		function nols(num) {
			if (num < 10) return ('0' + num)
			if (num > 9) return (num)
		}
		let hour = new Date().getHours()
		let minute = new Date().getMinutes()
		let second = new Date().getSeconds()
		let day = new Date().getDate()
		let mounth = new Date().getMonth()
		let years = new Date().getFullYear()
		return "Date " + nols(day) + "." + nols(mounth) + "." + nols(years) + " " + "Time " + nols(hour) + "." + nols(minute) + "." + nols(second)
	},
	crashGame: function(x, y) {
		return y ? Math.random() * (y - x) + x : Math.round(Math.random() * x);
	  },


	getTime: () => {
		function nols(num) {
			if (num < 10) return ('0' + num)
			if (num > 9) return (num)
		}
		let hour = new Date().getHours()
		let minute = new Date().getMinutes()
		let second = new Date().getSeconds()
		return nols(hour) + ":" + nols(minute) + ":" + nols(second)
	},




	getDate: () => {
		function nols(num) {
			if (num < 10) return ('0' + num)
			if (num > 9) return (num)
		}
		let day = new Date().getDate()
		let mounth = new Date().getMonth()
		let years = new Date().getFullYear()
		return nols(day) + "." + nols(mounth) + "." + nols(years)
	},

	checkLink: function (str) {
    main = 0
    regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[A-z\u00a1-\uffff0-9]-*)*[A-z\u00a1-\uffff0-9]+)(?:\.(?:[A-z\u00a1-\uffff0-9]-*)*[A-z\u00a1-\uffff0-9]+)*(?:\.(?:[A-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
 
str = str.replace(/\n/g, " ")
str = str.replace(/\\n/g, '') 
str = str.replace(/\r?\n|\r/, '')
str = str.replace(/[\r\n]+/g, '\n');


    console.log(str)

    let a = str.split(' ')
        let b = str.split('_')
        let c = str.split('-')
        let d = str.split('.')
        let e = str.split(',')  
  let u = str.split('\n')  

      for(i in a) {


        if(regexp.test(a[i])) {
          main += Number(1)
        }
      }

      for(i in b) {

        if(regexp.test(b[i])) {
          main += Number(1)
        }
      }

      for(i in c) {

        if(regexp.test(c[i])) {
          main += Number(1)
        }
      }

      for(i in d) {

        if(regexp.test(d[i])) {
          main += Number(1)
        }
      }

      for(i in e) {

        if(regexp.test(e[i])) {
          main += Number(1)
        }
      }

      for(i in u) {
   
        if(regexp.test(u[i])) {
          main += Number(1)
        }
      }

console.log('main', main)

      if(main == 0) return false
      else return true

		},



	shortnum: function (num) {
		let n = num.toString()
		if (n.length < 4) {
			return n
		}
		if (n.length >= 4 && n.length <= 6) {
			if (Number(n / 1000).toFixed(1).split(`.`)[1] > 0) {
				return Number(n / 1000).toFixed(1) + `к`
			} else {
				return Number(n / 1000).toFixed(0) + `к`
			}
		}
		if (n.length >= 7 && n.length <= 9) {
			if (Number(n / 1000000).toFixed(1).split(`.`)[1] > 0) {
				return Number(n / 1000000).toFixed(1) + `кк`
			} else {
				return Number(n / 1000000).toFixed(0) + `кк`
			}
		}
		if (n.length >= 10 && n.length <= 12) {
			if (Number(n / 1000000000).toFixed(1).split(`.`)[1] > 0) {
				return Number(n / 1000000000).toFixed(1) + `ккк`
			} else {
				return Number(n / 1000000000).toFixed(0) + `ккк`
			}
		}
		if (n.length >= 13 && n.length <= 15) {
			if (Number(n / 1000000000).toFixed(1).split(`.`)[1] > 0) {
				return Number(n / 1000000000).toFixed(1) + `кккк`
			} else {
				return Number(n / 1000000000).toFixed(0) + `кккк`
			}
		}

	},


	random: function (min, max) {
  let rand = min - 0.5 + generator.random_incl() * (max - min + 1);
  return Math.round(rand);	

},
	getRandomInRange: function (min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}, //Функция выбора рандомного числа
	randomInteger: function (min, max) {
		var rand = min - 0.5 + Math.random() * (max - min + 1)
		rand = Math.round(rand);
		return rand;
	},

	str_rand: (num) => {
		let result = '';
		let words = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM!@#$%^&*()?><][';
		let max_position = words.length - 1;

		for (let i = 0; i < num; ++i) {
			let position = Math.floor(Math.random() * max_position);
			result += words.substring(position, position + 1);
		}

		return result;
	},
	nols: function (num) {
		if (num < 10) return ('0' + num)
		if (num > 9) return (num)
	},

	getSecondsToTomorrow: () => {
		let now = new Date();
		let tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
		return tomorrow - now;
	},
	number_format(number, decimals, dec_point, thousands_sep) {
		number = Math.trunc(number);

		return (number)
			.toLocaleString()
			.replace(/,/g, ' ')
			.replace(/\./g, ',');

	},



	unixStampLeft: function (stamp) {
		console.log(stamp)

		let s = stamp % 60;
		stamp = (stamp - s) / 60;

		let m = stamp % 60;
		stamp = (stamp - m) / 60;

		let h = (stamp) % 24;
		let d = (stamp - h) / 24;

		let text = ``;

		if (d > 0) text += Math.floor(d) + " д. ";
		if (h > 0) text += Math.floor(h) + " ч. ";
		if (m > 0) text += Math.floor(m) + " мин. ";
		if (s > 0) text += Math.floor(s) + " с.";

		return text;
	},

	rewrite_numbers: function (num) {
		/*
		var n = num.toString();
		const regex = /(\d)\s+(?=\d)/g;
		const subst = `$1`;
		return n.replace(regex, subst);
		*/
		return num
	},

	unixStampLeftMassiv: function (stamp) {
		let s = stamp % 60;
		stamp = (stamp - s) / 60;

		let m = stamp % 60;
		stamp = (stamp - m) / 60;

		let h = (stamp) % 24;
		let d = (stamp - h) / 24;

		return [(d > 0 ? Math.floor(d) : 0), (h > 0 ? Math.floor(h) : 0), (m > 0 ? Math.floor(m) : 0), (s > 0 ? Math.floor(s) : 0)];
	},
	RandomItem: function (a) {
		var sum = 0;

		for (var i = 0; i < Object.keys(a).length; i++) {
			sum += a[i].procent;
		}

		var rand = Math.floor(Math.random() * sum);
		var i = 0;
		for (var s = a[0].procent; s <= rand; s += a[i].procent) {
			i++;
		}
		return a[i];
	},
	time: () => {
		return parseInt(new Date().getTime() / 1000)
	},
	gi: (int) => {
		int = int.toString();

		let text = ``;
		for (let i = 0; i < int.length; i++) {
			text += `${int[i]}&#8419;`;
		}

		return text;
	},
}