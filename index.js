require('dotenv').config();
const { log } = require('console');
const { Client, Collection, Message } = require('discord.js');
const {readdirSync, createReadStream} = require('fs');

const commands = readdirSync('./commands');

const client = new Client();
client.prefix = process.env.BOT_PREFIX;
client.commands = new Collection();
client.truths = new Array;
client.dares = new Array;

function readtruths(input) {
    let remaining = '';
    input.on('data',(data)=>{
        remaining += data;
        let index = remaining.indexOf('\n');
        while(index > -1){
            let line = remaining.substring(0,index);
            remaining = remaining.substring(index + 1);
            index = remaining.indexOf('\n');
            client.truths.push(line);
        }
    })
}
function readdares(input) {
    let remaining = '';
    input.on('data',(data)=>{
        remaining += data;
        let index = remaining.indexOf('\n');
        while(index > -1){
            let line = remaining.substring(0,index);
            remaining = remaining.substring(index + 1);
            index = remaining.indexOf('\n');
            client.dares.push(line);
        }
    })
}
readtruths(createReadStream('files/truths.txt'));
readdares(createReadStream('files/dares.txt'));


commands.forEach(command => {
    if(command.endsWith('.js')){
        commandFile = require(`./commands/${command}`)
        client.commands.set(commandFile.name,commandFile)
        console.log(`Loaded ${commandFile.name}`)
    }
});

client.on('ready',()=>{
    console.log(`Logged in as ${client.user.tag}`);
})

client.on('message',(message)=>{
    if(message.author.bot || !message.content.startsWith(client.prefix) || !message.guild) return ;
    const args = message.content.slice(client.prefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();
    if(!client.commands.has(cmd)) return;
        const command = client.commands.get(cmd);
    try{
        command.execute(client,message,args);
        console.log(`${message.author.tag} used ${cmd} command.`)
    }
    catch(error){
        console.error(error)
    };
})

client.login(process.env.BOT_TOKEN);