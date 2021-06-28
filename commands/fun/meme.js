const Discord = require('discord.js');
const { Client, Message } = require('discord.js');
const got = require('got');

module.exports = {
    name: 'meme',
    aliases: [],
    // cooldown:  ,
    usage: 'c!meme',
    description: 'Gives random meme',
    userPermissions: [],
    botPermissions: [],

    /** *

    * @param { Client } bot
    * @param { Message }message
    * @param { String[] } args
    */

    run: async(bot, message, args) => {
        got('https://www.reddit.com/r/memes/random/.json').then(res => {
            let content = JSON.parse(res.body);
            message.channel.send(
                new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(content[0].data.children[0].data.title)
                .setImage(content[0].data.children[0].data.url)
                .setFooter(`👍 ${content[0].data.children[0].data.ups} 👎 ${content[0].data.children[0].data.downs} | Comments: ${content[0].data.children[0].data.num_comments}`)
            )
        })
    }
}