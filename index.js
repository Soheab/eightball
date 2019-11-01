const { Plugin } = require('powercord/entities');
const { get } = require('powercord/http');
const Settings = require("./components/Settings.jsx")

module.exports = class Eightball extends Plugin {
	async startPlugin () {
		this.registerSettings('eightball', 'Eightball', Settings);
		this.registerCommand(
			'eightball',
			['8ball'],
			'Ask the 8ball wizard.',
			'{c} <your question> [--send]',
			this.eightball.bind(this)
		);
	}

	async eightball (args) {
		let send = false;
		if (args[args.length - 1] === '--send') {
			args.pop();
			send = true;
		}
		let replies = ["Maybe.","Certainly not.","I hope so.","There is a good chance.",
		"Quite likely.","I think so.","I hope not.","I hope so.",
		"Never!","Pfft.","Hell, yes.","Hell to the no.","The future is bleak.",
		"The future is uncertain.","I would rather not say.","Who cares?","Possibly.","Never, ever, ever.",
		"There is a small chance.","Yes!","lol no.","There is a high probability.",
		"What difference does it makes?", "Not my problem.","Ask someone else.","lol",
		"senpai", "pls no ;-;", "no... baka", "no... (╯°□°）╯︵ ┻━┻", "You'll be the judge",
		"Might be possible", "Sure", "Take a wild guess...", "It is certain", "It is decidedly so",
		"Without a doubt", "Yes definitely", "You may rely on it", "As I see it, yes", "Most likely",
		"Outlook good", "Yes", "No", "Signs point to yes", "Reply hazy try again","Ask again later",
		"Better not tell you now", "Cannot predict now", "Concentrate and ask again","Don\"t count on it",
		"My reply is no", "My sources say no", "Outlook not so good", "Very doubtful", "haha, no."
	]
		const getSettings = (key, defaultValue) => this.settings.get(key, defaultValue);
		const data = await get(`https://nekos.life/api/v2/8ball`).then(r => r.body)
		if (getSettings('useAPI')) {
			var response = data['response']
		} else {
			var response = replies[Math.floor(Math.random() * replies.length)];
		}
		let result
		return {
			send,
			result: `Question: ${args.join(' ')}\n\n**🎱 Eightball Says....** ${response}`
		};
	}
};
