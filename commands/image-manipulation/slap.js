const Discord = require('discord.js');
const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js');
const { Canvas } = require('canvacord');

module.exports = {
    name: 'slap',
    aliases: [],
    // cooldown:  ,
    usage: 'c!slap [user]',
    description: 'Shows a slapping image of the mentioned user',
    userPermissions: [],
    botPermissions: [],

    /** *

    * @param { Client } bot
    * @param { Message }message
    * @param { String[] } args
    */

    run: async(bot, message, args) => {
        const user = message.mentions.users.first();
        if (!user) return message.reply("Please mention a user or I will slap you!");
        const avatar = user.displayAvatarURL({ format: 'png' });

        const image = await Canvas.slap(message.author.displayAvatarURL({ format: 'png' }), avatar);

        message.channel.send(
            new MessageAttachment(image, 'slap.gif')
        );
    }
}