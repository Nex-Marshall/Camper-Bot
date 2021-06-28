const Discord = require('discord.js');
const { Client, Message } = require('discord.js');

module.exports = {
    name: 'suggest',
    aliases: [],
    // cooldown:  ,
    usage: 'izumi suggest <suggestion>',
    description: 'Suggests your suggestion',
    /**
     * 
     * @param {Client} bot 
     * @param {Message} message 
     * @param {String[]} args 
     * @returns 
     */

    run: async(bot, message, args) => {
        const suggestionQuery = args.join(' ');

        const response = new Discord.MessageEmbed()
            .setTitle(`__SUCCESS__`)
            .setColor("RANDOM")
            .setDescription("Submitted your suggestion!")
            .setTimestamp()
            .setFooter(bot.user.tag, bot.user.displayAvatarURL())

        if (!suggestionQuery) return message.reply("Please specify a suggestion!");
        const embed = new Discord.MessageEmbed()
            .setColor("ORANGE")
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`**Suggestion**: ${suggestionQuery}`)
            .setTimestamp()
            .addField("Status", `**PENDING**`)

        message.channel.send(response).then((response) => {
            message.delete({ timeout: 1000 });
            response.delete({ timeout: 3000 });
        });
        message.guild.channels.cache.get("857629147064434748").send(embed).then(msg => {
            msg.react('✔')
            msg.react('❌');
        })


    }
}