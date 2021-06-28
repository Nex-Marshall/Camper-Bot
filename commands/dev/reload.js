const Discord = require('discord.js');
const { Client, Message } = require('discord.js');

module.exports = {
    name: 'reload',
    aliases: [],
    // cooldown: ,
    usage: 'c!reload [folder] [file]',
    description: 'Reloads a command',
    userPermissions: [],
    botPermissions: [],

    /** *

    * @param { Client } bot
    * @param { Message }message
    * @param { String[] } args
    */

    run: async(bot, message, args) => {
        if (message.author.id != "740821019953987664" || message.author.id != "490144751706832898") return message.channel.send("You do not have the permission to use this command!");

        if (!args[0]) return message.reply("Please specify the category of commands!");
        if (!args[1]) return message.reply("Please specify the command name!");

        let category = args[0].toLowerCase();
        let command = args[1].toLowerCase();

        try {
            delete require.cache[require.resolve(`../../commands/${category}/${command}.js`)];
            bot.commands.delete(command);
            const pull = require(`../../commands/${category}/${command}.js`);
            bot.commands.set(command, pull);

            return message.channel.send(`Successfully reloaded **${command}.js**`);
        } catch (error) {
            return message.channel.send(`Error reloading **${command}.js**: \`\`\`${error.message}\`\`\``);
        }

    }
}