const {MessageEmbed} = require('discord.js')
module.exports = {
    name : 'dare',
    execute(client,message,args){
        let question = client.dares[Math.floor(Math.random()*client.dares.length)]
        const embed = new MessageEmbed()
        .setTitle('Dare')
        .setDescription(question)
        .setColor('RANDOM')
        message.channel.send(embed);
    }
}