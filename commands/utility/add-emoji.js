const Discord = require('discord.js');

module.exports = {
    name: 'steal',
    aliases: [],
    // cooldown:  ,
    usage: 'c!steal <emoji>',
    description: 'Steals emoji to your server',
    userPermissions: ["MANAGE_EMOJIS"],

    run: async(bot, message, args) => {
        if (!args.length) return message.reply("Please specify some emojis!");

        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(bot.user.tag, bot.user.displayAvatarURL())
        for (const rawEmoji of args) {
            const parsedEmoji = Discord.Util.parseEmoji(rawEmoji);

            if (parsedEmoji.id) {
                const extension = parsedEmoji.animated ? ".gif" : ".png";
                const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id + extension}`;

                message.guild.emojis.create(url, parsedEmoji.name)
                    .then((emoji) => message.channel.send(embed
                        .setTitle(`${emoji.name}`)
                        .setDescription(emoji)));
            }
        }
    }
}