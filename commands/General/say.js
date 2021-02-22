const Discord = require('discord.js')

module.exports = {
  name: 'say',
  description: 'Say something',
  usage: 'say <message>',
  aliases: [],
  required: [],
  user: [],
  category: __dirname.split("commands\\")[1],
  
  premium: false,
  guildOnly: false,
  async execute(message, args, client, data) {
    let msg = args.join(" ")
    if(!msg) return client.missingArgs(message, "Please provide a message to say")
    return message.channel.send(client.baseEmbed(message, {
        description: msg,
        color: client.colors.discord
    }))
  }
}