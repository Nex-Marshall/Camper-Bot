const Discord = require('discord.js');
const { Client, Message } = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'docs',
    aliases: [],
    // cooldown:  ,
    usage: 'c!docs [query]',
    description: 'Gives discord.js documentation',
    userPermissions: ["ADMINISTRATOR"],
    botPermissions: [],

    /** *

    * @param { Client } bot
    * @param { Message }message
    * @param { String[] } args
    */

    run: async(bot, message, args) => {
        const query = args.join(" ");
        if (!query) return message.reply("Please specify a query.");
        const url = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(query)}`;

        axios.get(url).then(({ data }) => {
            if (data) {
                message.channel.send({ embed: data });
            }
        })
    }
}