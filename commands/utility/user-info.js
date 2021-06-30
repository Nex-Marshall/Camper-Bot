const Discord = require('discord.js');
const moment = require('moment');

module.exports = {
    name: 'userinfo',
    aliases: ['ui', 'whois'],
    usage: 'c!userinfo [user]',
    description: 'This command gives information about the mentioned user.',

    run: async(bot, message, args) => {

        let regdate;
        let user;
        let format;

        if (message.mentions.members.first()) {
            user = message.mentions.users.first();
            regdate = user.createdAt;
            format = moment(regdate).format('Do MMMM YYYY [at] HH:mm:ss');

            //format = your formatted registration date.
        } else {
            user = message.author;
            regdate = user.createdAt;
            format = moment(regdate).format('Do MMMM YYYY [at] HH:mm:ss');
            //format = your formatted registration date.
        }

        let mentionedMember = message.mentions.members.first() || message.member;

        var game = mentionedMember.presence.game;

        var status = mentionedMember.presence.status;

        if (status == 'dnd') status = "Do Not Disturb"
        if (status == 'online') status = "Online"
        if (status == 'offline') status = "Offline"
        if (status == 'idle') status = "Idle"

        const roles = mentionedMember.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(role => role.toString())
            .slice(0, -1);


        let displayRoles;

        if (roles.length < 1) displayRoles = "None";
        if (roles.length < 20) {
            displayRoles = roles.join(" ")
        } else {
            displayRoles = roles.slice(20).join(" ")
        }

        const userEmbed = new Discord.MessageEmbed()
            .setColor(mentionedMember.displayHexColor)
            .setAuthor(`User Information of ${mentionedMember.user.username}`, mentionedMember.user.displayAvatarURL({ dynamic: true, size: 2048 }))
            .setThumbnail(mentionedMember.user.displayAvatarURL({ dynamic: true, size: 512 }))
            .addField(`**Tag: **`, `${mentionedMember.user.tag}`)
            .addField(`**Username: **`, `${mentionedMember.user.username}`)
            .addField(`**ID: **`, `${mentionedMember.id}`)
            .addField(`**Status: **`, `${status}`)
            .addField(`**Game: **`, `${game || 'None'}`)
            .addField(`**Registered At: **`, `${format}`)
            .addField(`**Joined Server At: **`, `${moment(mentionedMember.joinedAt).format("Do MMMM YYYY [at] HH:mm:ss")}`)
            .addField(`**Roles: [${roles.length}]**`, `${displayRoles}`)
            .setTimestamp()
            .setFooter(bot.user.tag, bot.user.displayAvatarURL())

        message.channel.send(userEmbed);

    }

}