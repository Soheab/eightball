const {Plugin} = require('powercord/entities');
const Settings = require("./components/Settings.jsx");

module.exports = class Eightball extends Plugin {
  async startPlugin() {
    this.registerSettings(
      'eightball',
      'Eightball',
      Settings
    );
    this.registerCommand(
      'eightball',
      ['8ball'],
      'Ask the magic 8ball a question.',
      '{c} <your question> [--send]',
      (args) => {
        if (args.length < 1) {
          return {
            send: false,
            result: 'You must ask the magic 8ball a question.'
          };
        }
        return this.eightball(args)
      },
    );
  }

  async eightball(args) {
    let answer;
    let send = false;
    if (args[args.length - 1] === '--send') {
      args.pop();
      send = true;
    }
    const answers = [
      "It is certain.",
      "Reply hazy, try again.",
      "Don't count on it.",
      "It is decidedly so.",
      "Ask again later.",
      "My reply is no.",
      "Without a doubt.",
      "Better not tell you now.",
      "My sources say no.",
      "Yes - definitely.",
      "Cannot predict now.",
      "Outlook not so good.",
      "You may rely on it.",
      "Concentrate and ask again.",
      "Very doubtful.",
      "As I see it, yes.",
      "Most likely.",
      "Outlook good.",
      "Yes.",
      "Signs point to yes."
    ];
    const getSettings = (key, defaultValue) => this.settings.get(key, defaultValue);
    if (getSettings('useCustom')) {
      const custom = getSettings('customResponses');
      const combined = [...answers, ...custom.map(x => x.value)].filter(x => x);
      answer = combined[Math.floor(Math.random() * combined.length)];
    } else {
      answer = answers[Math.floor(Math.random() * answers.length)];
    }
    return {
      // TODO: Customize Clyde when sending locally
      send,
      result: `>>> **🎱 Magic 8-ball**\n\n**Question**:\n${args.join(' ')}\n\n**Answer**:\n${answer}`
    };
  }
};
