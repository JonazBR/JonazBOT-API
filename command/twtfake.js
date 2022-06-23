const { loadImage, createCanvas } = require('canvas')
const { Canvacord } = require('canvacord')
const axios = require('axios').default
const now = new Date
const moment = require('moment-timezone')
moment.tz.setDefault('America/Sao_Paulo').locale('br')
let time = moment().format('H:mm')
const monName = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "agosto", "outubro", "novembro", "dezembro"]

let baseApi = 'https://twitter.com/i/api/graphql/Bhlf1dYJ3bYCKmLfeEQ31A/UserByScreenName'

async function tweetfake(user, text) {
	return new Promise(async (resolve) => {
		const response = await axios.get(baseApi, {
			params: {
				'variables': {
					"screen_name": user,
					"withSafetyModeUserFields": true,
					"withSuperFollowsUserFields": true
				}
			},
			headers: {
				'authority': 'twitter.com',
				'accept': '*/*',
				'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
				'authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
				'content-type': 'application/json',
				'cookie': 'guest_id_marketing=v1%3A165453640475701797; guest_id_ads=v1%3A165453640475701797; personalization_id="v1_capFQbwP1AGPHaHqFlTOKQ=="; guest_id=v1%3A165453640475701797; _ga=GA1.2.1177416032.1654536406; _sl=1; _twitter_sess=BAh7CSIKZmxhc2hJQzonQWN0aW9uQ29udHJvbGxlcjo6Rmxhc2g6OkZsYXNo%250ASGFzaHsABjoKQHVzZWR7ADoPY3JlYXRlZF9hdGwrCI2LL5GBAToMY3NyZl9p%250AZCIlNDgzZTE3NzJjMmU1Y2FiM2U1MjE2MDhiNzk5ZWVlYWY6B2lkIiU5NDNl%250ANzQwNDcxZTk2ZDc0OTdlY2U0M2Q2OGJhYWE2Mw%253D%253D--139d5d9d1a755e5293785038dcc94488ea758139; _gid=GA1.2.1762273910.1655998221; att=1-JqcBBQnDrwOEsUxahtmHzAtT8JrrjL4h0oVFZnpf; external_referer=padhuUp37zjgzgv1mFWxJ12Ozwit7owX|0|8e8t2xd8A2w%3D; g_state={"i_l":0}; kdt=PeiCR6x12CAFksyQU9SLB073ZIG0zqOYki4SufK6; auth_token=71b35d15ea67744feb6d5290e862f00b6c515f50; gt=1539994395432321025; twid=u%3D1539994332236861442; ct0=9388250a2a5cc4c08ffb95ef42901616639f0630e1e5299a874577c1a14ae37ee03484ae6a8ef7804328b7b81d624ecb5d56d184b478123c0c93969880d8b10ed0fe684cb8e55b6ad6c48f8aede40fac',
				'referer': 'https://twitter.com/neymarjr',
				'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="102", "Google Chrome";v="102"',
				'sec-ch-ua-mobile': '?0',
				'sec-ch-ua-platform': '"Windows"',
				'sec-fetch-dest': 'empty',
				'sec-fetch-mode': 'cors',
				'sec-fetch-site': 'same-origin',
				'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36',
				'x-csrf-token': '9388250a2a5cc4c08ffb95ef42901616639f0630e1e5299a874577c1a14ae37ee03484ae6a8ef7804328b7b81d624ecb5d56d184b478123c0c93969880d8b10ed0fe684cb8e55b6ad6c48f8aede40fac',
				'x-twitter-active-user': 'yes',
				'x-twitter-auth-type': 'OAuth2Session',
				'x-twitter-client-language': 'en'
			}
		})

		function formatAMPM(data) {
			var hours = data.split(':')[0];
			var ampm = hours >= 12 ? 'PM' : 'AM';
			let strTime = `${data} ${ampm}`;
			return strTime;
		}

		function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
			ctx.font = '30px Arial'
			var words = text.split(' ');
			var line = '';

			for (var n = 0; n < words.length; n++) {
				var testLine = line + words[n] + ' ';
				var metrics = ctx.measureText(testLine);
				var testWidth = metrics.width;
				if (testWidth > maxWidth && n > 0) {
					ctx.fillText(line, x, y);
					line = words[n] + ' ';
					y += lineHeight;
				} else {
					line = testLine;
				}
			}
			ctx.fillText(line, x, y);
		}

		function drawText(ctx, config = {
			text: String,
			x: Number,
			y: Number,
			font: String,
			color: String,
			bold: Boolean
		}) {
			let { text, x, y, font, color, bold } = config
			ctx.font = `${bold ? 'bold' : ''} ${font}`
			ctx.fillStyle = color ? color : 'black'
			ctx.fillText(text, x, y);
		}


		let data = response.data.data.user?.result.legacy
		let users = {
			userName: data?.name || user,
			Screen_name: data?.screen_name || user,
			profile_picture: data?.profile_image_url_https || './media/twitter/no_pfp.jpg'
		}

		let length = 0
		let c = 0
		for (let i = 0; i < text.length; i++) {
			c++
			if (c == 60) {
				c = 0
				length++
			}
		}
		let w = 770
		let h = 300 + length * 30
		const canvas = createCanvas(w, h)
		const ctx = canvas.getContext('2d')

		const icon = await Canvacord.circle(users.profile_picture)
		const img = await loadImage(icon)
		const dots = await loadImage('./media/twitter/dots.png')
		const down = await loadImage('./media/twitter/down.png')

		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, canvas.width, canvas.height);


		ctx.drawImage(img, 20, 10, 70, 70)
		ctx.drawImage(dots, 660, 3, 70, 70)
		ctx.drawImage(down, 15, h - 85, down.width, down.height)

		drawText(ctx, {
			text: '@' + users.Screen_name,
			x: 110,
			y: 70,
			font: '25px Arial',
			color: "rgb(50, 50, 50)"
		})

		wrapText(ctx, text, 20, 125, 740, 30)

		drawText(ctx, {
			text: `${formatAMPM(time)} • ${now.getDate()} ${monName[now.getMonth()]} de ${now.getFullYear()} • Twitter for Android`,
			x: 20,
			y: h - 100,
			font: '20px Arial',
			color: 'gray'
		})
		drawText(ctx, {
			text: users.userName,
			x: 114,
			y: 40,
			font: '20px Arial',
			bold: true
		})
		const buffer = canvas.toBuffer()
		resolve(buffer)

	})

}
module.exports = tweetfake