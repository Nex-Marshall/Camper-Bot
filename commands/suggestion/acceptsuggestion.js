const Discord = require('discord.js');

module.exports = {
    name: 'accept-suggestion',
    aliases: [],
    // cooldown: ,
    usage: 'izumi accept-suggestion [message_ID] [reason]',
    description: 'Accepts a suggestion',
    userPermissions: ["MANAGE_MESSAGES"],

    run: async(bot, message, args) => {
        const messageID = args[0];
        const acceptQuery = args.slice(1).join(" ");
        const acceptchannel = message.guild.channels.cache.get("859005073508925460");

        if (!messageID) return message.reply("Please specify a message ID!");
        if (!acceptQuery) return message.reply("Please specify a reason!");
        try {
            const suggestionChannel = message.guild.channels.cache.get("857629147064434748");
            const suggestionEmbed = await suggestionChannel.messages.fetch(messageID);
            const data = suggestionEmbed.embeds[0];

            const acceptEmbed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(data.author.name, data.author.iconURL)
                .setDescription(data.description)
                .setColor("GREEN")
                .addField("Status (ACCEPTED) ", `**Reason:** ${acceptQuery}`);

            acceptchannel.send(acceptEmbed);
            message.channel.send("Accepted the suggestion");

            const user = await bot.users.cache.find((u) => u.tag === data.author.name);
            user.send("Your suggestion has been accepted by a Moderator.");
        } catch (error) {
            message.channel.send(`That suggestion does not exist.`);
        }
    }
}