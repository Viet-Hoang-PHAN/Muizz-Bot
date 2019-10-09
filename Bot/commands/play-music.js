const api = require('../api/api')

module.exports = {
    name: "play-music",
    description: "Add music for the playlist and the quizz",
    async execute(message, args) {
        message.channel.send('Playing music...')
        const data = await api.getMusic().then(result => result.data)
        data.musics.forEach(music => {
            message.channel.send(`Titre : ${music.title}\n${music.url}`)
        })
        
    }
}