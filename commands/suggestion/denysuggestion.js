const Discord = require('discord.js');

module.exports = {
    name: 'deny-suggestion',
    aliases: [],
    // cooldown: ,
    usage: 'izumi deny-suggestion [message_ID] [reason]',
    description: 'Denies a suggestion',
    userPermissions: ["MANAGE_MESSAGES"],

    run: async(bot, message, args) => {
        const messageID = args[0];
        const denyQuery = args.slice(1).join(" ");
        const denychannel = message.guild.channels.cache.get("859005073508925460");

        if (!messageID) return message.reply("Please specify a message ID!");
        if (!denyQuery) return message.reply("Please specify a reason!");
        try {
            const suggestionChannel = message.guild.channels.cache.get("857629147064434748");
            const suggestionEmbed = await suggestionChannel.messages.fetch(messageID);
            const data = suggestionEmbed.embeds[0];

            const denyEmbed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(data.author.name, data.author.iconURL)
                .setDescription(data.description)
                .setColor("RED")
                .addField("Status (DENIED) ", `**Reason:** ${denyQuery}`);

            denychannel.send(denyEmbed);
            message.channel.send("Denied the suggestion");

            const user = await bot.users.cache.find((u) => u.tag === data.author.name);
            user.send("Your suggestion has been denied by a Moderator.");
        } catch (error) {
            message.channel.send(`That suggestion does not exist.`);
        }
    }
}