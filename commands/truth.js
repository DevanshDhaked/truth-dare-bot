const { MessageEmbed } = require('discord.js');
module.exports = {
    name : 'truth',
    execute(client,message,args){
        let question = client.truths[0];
        const embed = new MessageEmbed()
        .setTitle('Truth')
        .setDescription(question)
        .setColor('RANDOM')
        message.channel.send(embed);
    }
}