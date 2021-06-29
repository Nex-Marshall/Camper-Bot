const bot = require('../index');
const { MessageEmbed, Message } = require('discord.js');

/**
 * @param {Message} message
 */
bot.on('guildMemberAdd', async(member) => {
    const embed = new MessageEmbed()
        .setColor("DARK BLUE")
        .setThumbnail("https://images-ext-2.discordapp.net/external/NTMudJ53ClX2ITiKZkdo_pPFoohTvyyDwUXt13JAYQI/https/joelcalifa.com/assets/images/blog/design-code-history/wirecs.gif?width=459&height=459")
        .setTitle(`__${member.guild.name}__`)
        .setDescription(`Welcome ${member} to Coding Camp! Be sure to check out ${member.guild.channels.cache.get("850689220187258910")}`)
        .setTimestamp()
        .setFooter(bot.user.username, bot.user.displayAvatarURL())

    member.send(embed);
});