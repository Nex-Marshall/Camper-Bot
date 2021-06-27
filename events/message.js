const Discord = require('discord.js');
const bot = require('../index');
const Timeout = new Discord.Collection();
const ms = require('ms');
const { prefix } = require('../config.json');

bot.on('message', async message => {
            if (message.mentions.users.first()) {
                if (message.mentions.users.first().id === bot.user.id) {
                    return message.channel.send(`My prefix for ${message.guild.name} is **${prefix}**`);
                }
            }

            if (message.author.bot) return;
            if (message.channel.type === 'dm') return;

            if (message.content.startsWith(prefix)) {
                const args = message.content.slice(prefix.length).trim().split(/ +/);

                const commandName = args.shift().toLowerCase();

                const command = bot.commands.get(commandName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
                if (!command) return;

                if (command) {

                    if (!message.member.permissions.has(command.userPermissions || []))
                        return message.channel.send("You do not have the permission to use this command!");

                    if (!message.guild.me.permissions.has(command.botPermissions || []))
                        return message.channel.send("I do not have the permission to run this command!");

                    if (command.cooldown) {
                        if (Timeout.has(`${command.name}${message.author.id}`)) return message.reply(`Please wait \`${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), {long: true})}\` before using this command again.`);
        command.run(bot, message, args)
        Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown);
        setTimeout(() => {
           Timeout.delete(`${command.name}${message.author.id}`) 
        }, command.cooldown);
    } else command.run(bot, message, args);
}
}
})