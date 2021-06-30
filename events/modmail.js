const bot = require('../index');
const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js');
const db = require('../models/transcript.js');
const fs = require('fs');
const { prefix } = require('../config.json');
const { setTimeout } = require('timers');

/**
 * @param {Message} message
 * @param {Client} bot
 * @param {String[]} args
 */

bot.on('message', async(message) => {
    if (message.author.bot) return;

    const mainGuild = bot.guilds.cache.get("706911830467018874");
    const mainCategory = "858800830488248360";
    const modmailLogs = mainGuild.channels.cache.get("859345746406932502");

    if (message.channel.type === 'dm') {
        checkAndSave(message)
        const checkChannel = !!mainGuild.channels.cache.find(ch => ch.name === message.author.id);

        if (checkChannel === true) {
            const mailChannel = await mainGuild.channels.cache.find(ch => ch.name === message.author.id);

            if (message.attachments && message.content === '') {
                mailChannel.send(new MessageEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    .setColor("RANDOM")
                    .setImage(message.attachments.first().proxyURL)
                    .setTimestamp()
                )
            } else {
                mailChannel.send(new MessageEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    .setColor("RANDOM")
                    .setDescription(message.content)
                    .setTimestamp()
                )
            }
        } else if (checkChannel === false) {
            const mailChannel = await mainGuild.channels.create(message.author.id, {
                type: 'text',
                parent: mainCategory,
                permissionOverwrites: [{
                    id: mainGuild.id,
                    deny: ['VIEW_CHANNEL']
                }]
            })
            modmailLogs.send(new MessageEmbed()
                .setTitle(`__New Ticket__`)
                .setDescription(`**${message.author.tag}** has created a new thread.\n ${mailChannel}`)
                .setColor('GREEN')
            )
            if (message.attachments && message.content === '') {
                mailChannel.send(new MessageEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    .setColor("RANDOM")
                    .setImage(message.attachments.first().proxyURL)
                    .setTimestamp()
                )
            } else {
                mailChannel.send(new MessageEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    .setColor("RANDOM")
                    .setDescription(message.content)
                    .setTimestamp()
                )
            }
        }
    }

    if (!message.guild) return;
    if (message.guild.id === mainGuild.id && message.channel.parentID === mainCategory) {
        if (message.content === prefix + "close") {
            message.channel.send('Deleteing the channel in 5 seconds...');
            setTimeout(() => {
                bot.users.cache.get(message.channel.name).send(new MessageEmbed()
                    .setDescription(`Your tiket has been closed by a Moderator.`)
                    .setColor("RED")
                )
                message.channel.delete().then(ch => {
                    modmailLogs.send(new MessageEmbed()
                        .setColor("RED")
                        .setTitle(`__Ticket Closed__`)
                        .setDescription(`${bot.users.cache.get(ch.name).tag} thread has been closed.\nResponsible Moderator: ${message.author.username}`)
                    )
                })
                sendTranscriptAndDelete(message, modmailLogs)
            }, 5000);
            return;
        } else if (message.content === prefix + "no") return;
        db.findOne({ AuthorID: message.channel.name }, async(err, data) => {
            if (err) throw err;
            if (data) {
                if (message.attachments && message.content === '') {
                    data.Content.push(`${message.author.tag} : ${message.attachments.first().proxyURL}`)
                } else {
                    data.Content.push(`${message.author.tag} : ${message.content}`)
                }
                data.save();
            }
        })
        const user = bot.users.cache.get(message.channel.name);
        if (message.attachments && message.content === '') {
            user.send(new MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setColor("RANDOM")
                .setImage(message.attachments.first().proxyURL)
                .setTimestamp()
            )
        } else {
            user.send(new MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setColor("RANDOM")
                .setDescription(message.content)
                .setTimestamp()
            )
        }
    }
});


function checkAndSave(message) {
    db.findOne({ AuthorID: message.author.id }, async(err, data) => {
        if (err) throw err;
        if (data) {
            if (message.attachments && message.content === '') {
                data.Content.push(`${message.author.tag} : ${message.attachments.first().proxyURL}`)
            } else {
                data.Content.push(`${message.author.tag} : ${message.content}`)
            }
        } else {
            if (message.attachments && message.content === '') {
                data = new db({
                    AuthorID: message.author.id,
                    Content: `${message.author.tag} : ${message.attachments.first().proxyURL}`
                })
            } else {
                data = new db({
                    AuthorID: message.author.id,
                    Content: `${message.author.tag} : ${message.content}`
                })
            }
        }
    })
}


async function sendTranscriptAndDelete(message, channel) {
    db.findOne({ AuthorID: message.channel.name }, async(err, data) => {
        if (err) throw err;
        if (data) {
            fs.writeFileSync(`../${message.channel.name}.txt`, data.Content.join("\n\n"))
            await channel.send(new MessageAttachment(fs.createReadStream(`../${message.channel.name}.txt`)))
            fs.unlinkSync(`../${message.channel.name}.txt`)
            await db.findOneAndDelete({ AuthorID: message.channel.name })
        }
    })
}