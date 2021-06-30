const bot = require('../index');

bot.on('messageDelete', (message) => {
    let snipes = bot.snipes.get(message.channel.id) || [];
    if (snipes.length > 5) snipes = snipes.slice(0, 4);

    snipes.unshift({
        msg: message,
        image: message.attachments.first() ? message.attachments.first().proxyURL : null,
        time: Date.now()
    })

    bot.snipes.set(message.channel.id, snipes);
})