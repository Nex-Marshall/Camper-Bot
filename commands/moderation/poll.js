const Discord = require('discord.js');
const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'poll',
    aliases: [],
    // cooldown:  ,
    usage: 'c!poll [question]',
    description: 'Creates a poll',
    userPermissions: ["MANAGE_MESSAGES"],
    botPermissions: [],

    /** *

    * @param { Client } bot
    * @param { Message }message
    * @param { String[] } args
    */

    run: async(bot, message, args) => {
        const channelID = message.mentions.channels.first();
        const description = args.slice(1).join(" ");

        if (!channelID) return message.reply("Please mention a channel in which you want to create your poll!");
        if (!description) return message.reply("Please give the poll's message!");

        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`__POLL TIME__`)
            .setDescription(`${description}\nPoll Started By: ${message.author}`)
            .setFooter(bot.user.tag, bot.user.displayAvatarURL())
            .setTimestamp()

        let msgEmbed = await channelID.send(embed)
        await msgEmbed.react('✅')
        await msgEmbed.react('❎')

        await message.channel.send(`Successfully sent your poll in ${channelID}`);
    }
}