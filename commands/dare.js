const {MessageEmbed} = require('discord.js')
module.exports = {
    name : 'dare',
    execute(client,message,args){
        let question = client.dares[0];
        const embed = new MessageEmbed()
        .setTitle('Dare')
        .setDescription(question)
        .setColor('RANDOM')
        .setTimestamp();
        message.channel.send(embed);
    }
}