const Discord = require('discord.js');
const bot = new Discord.Client();

const { token } = require('./config.json');

const { MongoDB } = require('./config.json');

const { readdirSync } = require('fs');

module.exports = bot;

bot.snipes = new Discord.Collection();

//!-----------------------------------------------------MongoDB Connection
const mongoose = require('mongoose');
mongoose.connect(MongoDB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then(console.log('Connected to MongoDB successfully!')).catch(console.error);

//!------------------------------------------------------Command Handler
const ascii = require('ascii-table');
const table = new ascii("Commands");

table.setHeading("Command", "Load Status");
bot.commands = new Discord.Collection();
const commandFolders = readdirSync('./commands/');
for (const folder of commandFolders) {
    const commandFiles = readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        if (command.name) {
            bot.commands.set(command.name, command);
            table.addRow(file, '✅');
        } else {
            table.addRow(file, '❌');
        }
    }
    console.log(table.toString());
}
bot.on("error", console.error);


//!--------------------------------------------------------Event Handler

readdirSync('./events/').forEach((file) => {
    const events = readdirSync('./events/').filter((file) =>
        file.endsWith(".js")
    );

    for (let file of events) {
        let pull = require(`./events/${file}`);

        if (pull.name) {
            bot.events.set(pull.name, pull);
        } else {
            continue;
        }
    }
})


//-------------------------------------------------------------------------------------------------------------------------

bot.login(token);