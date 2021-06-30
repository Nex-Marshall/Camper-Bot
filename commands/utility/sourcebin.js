const Discord = require('discord.js');
const { create } = require('sourcebin');

module.exports = {
    name: 'sourcebin',
    aliases: ['bin'],
    // cooldown:  ,
    usage: 'c!sourcebin <code>',
    description: 'Uploads your code to sourcebin',

    run: async(bot, message, args) => {
        const content = args.join(' ');
        if (!content) return message.reply("Please specify a code to upload to sourcebin.");


        create([{
            name: 'Javascript Code',
            content,
            language: 'javascript'
        }, ], {
            title: 'Title',
            description: 'Description'
        }).then((value) => {
            message.channel.send(`Your code has been posted to sourcebin: ${value.url}`)
        })

    }
}