const Discord = require('discord.js');
const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js');
const { Canvas } = require('canvacord');

module.exports = {
    name: 'wasted',
    aliases: [],
    // cooldown:  ,
    usage: 'izumi wasted [user]',
    description: 'Shows a wasted image of the mentioned user',
    userPermissions: [],
    botPermissions: [],

    /** *

    * @param { Client } bot
    * @param { Message }message
    * @param { String[] } args
    */

    run: async(bot, message, args) => {
        const user = message.mentions.users.first() || message.author;
        const avatar = user.displayAvatarURL({ format: 'png' });

        const image = await Canvas.wasted(avatar);
        message.channel.send(
            new MessageAttachment(image, 'wasted.gif')
        );
    }
}