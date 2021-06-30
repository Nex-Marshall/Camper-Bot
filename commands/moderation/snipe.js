const Discord = require('discord.js');
const { Client, Message } = require('discord.js');
const moment = require('moment');

module.exports = {
    name: 'snipe',
    aliases: [],
    // cooldown:  ,
    usage: 'c!snipe',
    description: 'Snipes deleted messages',
    userPermissions: ["MANAGE_MESSAGES"],
    botPermissions: ["MANAGE_MESSAGES"],
    /**
     * 
     * @param {Client} bot 
     * @param {Message} message 
     * @param {String[]} args 
     * @returns 
     */

    run: async(bot, message, args) => {
        const snipes = bot.snipes.get(message.channel.id);
        if (!snipes) return message.reply("There is no deleted messages in this channel.");

        const snipe = +args[0] - 1 || 0;
        const target = snipes[snipe];

        if (!target) return message.reply(`There is only ${snipes.length} messages!`);

        const { msg, image, time } = target;
        message.channel.send(
            new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true }))
            .setImage(image)
            .setDescription(msg.content)
            .setFooter(`${moment(time).fromNow()} | ${snipe + 1}/${snipes.length}`)
        )
    }
}