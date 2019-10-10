const api = require('../api/api')
const ytdl = require('ytdl-core-discord')

module.exports = {
    name: "play-music",
    description: "Add music for the playlist and the quizz",
    
    async execute(message, args) {
        const music = await api.getMusic().then(result => {
            return result.data.musics[0]
        })
        .catch(err => {
            console.log(err)
        })

        const channel = message.member.voiceChannel;
        if (!channel) {
            message.reply('You are not in a voice channel')
        }
        else {
            channel.join().then(async connection => {
                message.channel.send(`Playing ${music.title}`)
                const stream = ytdl(music.url)
                const streamOptions = {volume: 0.5}
                const dispatcher = connection.playOpusStream(await stream, streamOptions)
            })
            .catch (err => console.log(err))
        }
        
    }
}