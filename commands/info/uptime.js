const Discord = require('discord.js');

module.exports = {
    name: 'uptime',
    aliases: ['up'],
    // cooldown:  ,
    usage: 'c!uptime',
    description: 'Tells the bot uptime',

    run: async(bot, message, args) => {
        const days = Math.floor(bot.uptime / 86400000)
        const hours = Math.floor(bot.uptime / 3600000) % 24 // 1 Day = 24 Hours
        const minutes = Math.floor(bot.uptime / 60000) % 60 // 1 Hour = 60 Minutes
        const seconds = Math.floor(bot.uptime / 1000) % 60 // 1 Minute = 60 Seconds

        //  Send As Embed
        const embed = new Discord.MessageEmbed()
            .setAuthor(`${bot.user.username}`)
            .setColor('RANDOM')
            .setDescription(`
My Uptime Is:-
**${days}** Days **${hours}** Hours **${minutes}** Minutes **${seconds}** Seconds
    `)
            .setTimestamp()

        message.channel.send(embed)
    }
}