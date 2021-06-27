const Discord = require('discord.js');

module.exports = {
    name: 'ping',
    aliases: [],
    cooldown: 5000,
    usage: 'c!ping',
    description: 'Tells the bot ping',

    run: async(bot, message, args) => {
        var yourping = new Date().getTime() - message.createdTimestamp
        var botping = Math.round(bot.ws.ping)

        const pingEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Pong! Camper Bot is working fine!")
            .setDescription(`\`\`\`js\nLatency: ${yourping}ms\nAPI latency: ${botping}ms\`\`\``)
            .setTimestamp()
            .setFooter(bot.user.tag, bot.user.displayAvatarURL())

        message.channel.send(pingEmbed);
    }
}