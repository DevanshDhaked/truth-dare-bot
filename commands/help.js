module.exports = {
    name : 'help',
    execute(client,message,args){
        message.channel.send(`
        **LIST OF ALL COMMANDS**
${client.prefix}truth -> to get a truth question
${client.prefix}dare -> to get a dare
${client.prefix}help -> to view this message
        `)
    }
}