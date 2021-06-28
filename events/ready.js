const bot = require('../index');

bot.on('ready', () => {
    console.log(`${bot.user.username} has successfully registered!`);

    bot.user.setActivity(`Coding Camp`, { type: "WATCHING" }).catch(console.error);

    const express = require('express');
    const app = express();

    app.get("/", (req, res) => {
        res.send("Pinging");
    });

    app.listen(3001, () => {
        console.log("Server Started!");
    })
})