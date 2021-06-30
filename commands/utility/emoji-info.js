const Discord = require('discord.js');
const { Client, Message, MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
    name: 'emoji-info',
    aliases: [],
    // cooldown:  ,
    usage: 'c!emoji-info <emoji>',
    description: 'Gives information about the emoji',
    userPermissions: [],
    botPermissions: [],

    /** *

    * @param { Client } bot
    * @param { Message }message
    * @param { String[] } args
    */

    run: async(bot, message, args) => {
        const emote = args[0];

        const regex = emote.replace(/^<a?:\w+:(\d+)>$/, '$1');

        const emoji = message.guild.emojis.cache.find((emj) => emj.name === emote || emj.id === regex);

        if (!emoji) return message.reply("Please provide a valid custom emoji from this server!");

        const authorfetch = await emoji.fetchAuthor();

        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setThumbnail(emoji.url)
            .addField(`**Emoji Information for __${emoji.name.toLowerCase()}__**`, [
                `**》ID:** ${emoji.id}`,
                `**》URL:** [Link to Emoji](${emoji.url})`,
                `**》Author:** ${authorfetch.tag}`,
                `**》Time Created:** ${moment(emoji.createdTimestamp).format("LT")} ${moment(emoji.createdTimestamp).format("LL")} ${moment(emoji.createdTimestamp).fromNow()}`,
                `**》Animated:** ${emoji.animated}`
            ])

        message.channel.send(embed);
    }
}