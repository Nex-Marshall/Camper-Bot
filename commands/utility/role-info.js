const Discord = require('discord.js');
const { Client, Message, MessageEmbed, Permissions } = require('discord.js');

module.exports = {
    name: 'roleinfo',
    aliases: [],
    // cooldown: ,
    usage: 'c!roleinfo <role>',
    description: 'Gives informaton about the mentioned role',
    userPermissions: ["MENTION_EVERYONE"],
    botPermissions: [],

    /** *

    * @param { Client } bot
    * @param { Message }message
    * @param { String[] } args
    */

    run: async(bot, message, args) => {
        const role = message.mentions.roles.first();
        if (!role) return message.reply("Please mention a role!");

        let withRole;
        const perms = new Permissions(role.permissions.bitfield).toArray();

        if (role.members.size > 5) withRole = role.members.map(e => `<@${e.id}>`).slice(0, 5).join(", ") + ` and ${role.members.size - 5} more members...`;
        if (role.members.size < 5) withRole = role.members.map(e => `<@${e.id}>`).join(", ");

        const embed = new MessageEmbed()
            .setColor(role.color)
            .setAuthor(message.guild.name, message.guild.iconURL())
            .addField(`Information about __${role.name}__`, [
                `**》Name:** ${role}`,
                `**》ID:** ${role.id}`,
                `**》Mentionable:** ${role.mentionable.toString().replace("true", "Yes").replace("false", "No")}`,
                `**》Members Size:** ${role.members.size || 0}`,
                `**》Members:** ${withRole ? withRole: "No one have the role"}`,
                `**》Permissions:** \`\`\`${perms.join(", ")}\`\`\``
            ])
            .setFooter(bot.user.tag, bot.user.displayAvatarURL())

        message.channel.send(embed);
    }
}