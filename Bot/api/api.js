const axios = require('axios');

module.exports = {
    getMusic: () => {
        return axios.get('http://localhost:3000/api/music')
    }
}
