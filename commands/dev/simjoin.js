const Discord = require('discord.js');
const { Client, Message } = require('discord.js');

module.exports = {
    name: 'simjoin',
    aliases: [],
    // cooldown:  ,
    usage: 'c!simjoin',
    description: 'Simulates a join',
    userPermissions: [],
    botPermissions: [],

    /** *

    * @param { Client } bot
    * @param { Message }message
    * @param { String[] } args
    */

    run: async(bot, message, args) => {
        if (message.author.id != "740821019953987664") return;

        bot.emit("guildMemberAdd", message.member);
    }
}