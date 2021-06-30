const Discord = require('discord.js');
const moment = require('moment');

module.exports = {
        name: 'serverinfo',
        aliases: ['serverstats'],
        // cooldown:  ,
        usage: 'c!serverinfo',
        description: 'Gives the server information',

        run: async(bot, message, args) => {
                const guild = message.guild;
                const embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setThumbnail(message.guild.iconURL({ dynamic: true }))
                    .setTitle(message.guild.name)
                    .addField(`<a:Verified_blue:833005234757697616>General Information<a:Verified_blue:833005234757697616>`, [
                        `**》Name:** ${message.guild.name}`,
                        `**》Owner:** ${message.guild.owner}`,
                        `**》Created:** ${moment(guild.createdTimestamp).format("LT")} ${moment(guild.createdTimestamp).format("LL")} ${moment(guild.createdTimestamp).fromNow()}`,
                        `**》Region:** ${guild.region}`,
                    ])
                    .addField(`<a:cute_bunnygirl:853909848662867988>Counts<a:cute_bunnygirl:853909848662867988>`, [
                        `**》Roles:** ${guild.roles.cache.size} roles`,
                        `**》Channels:** ${guild.channels.cache.filter((ch) => ch.type === "text" || ch.type === "voice").size} total (**Text:** ${guild.channels.cache.filter(
                    (ch) => ch.type === "text"
                ).size}, **Voice:** ${guild.channels.cache.filter(
                    (ch) => ch.type === "voice"
                ).size})`,
                        `**》Emojis:** ${guild.emojis.cache.size} (**Regular:** ${guild.emojis.cache.filter(
                    (e) => !e.animated
                ).size}, **Animated:** ${guild.emojis.cache.filter(
                    (e) => e.animated)
                    .size})`,
                        `**》Members:** ${guild.memberCount} (**Human:** ${guild.members.cache.filter(
                    (m) => !m.user.bot
                ).size}, **Bot:** ${guild.members.cache.filter(
                    (m) => m.user.bot)
                    .size})`
                    ])
                    .addField(`<a:fallennitro:853290068666875956>Server Boosting Status<a:fallennitro:853290068666875956>`, [
                            `**》Boost Tier:** ${guild.premiumTier ? `Tier ${guild.premiumTier}` : "None"}`,
                `**》Boost Count:** ${guild.premiumSubscriptionCount || "0"}`
            ])


        message.channel.send(embed);
    }
}