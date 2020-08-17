require('dotenv').config()
let express = require('express')
let router = express.Router()
let querystring = require('querystring')

// credit to github users pomle & jmperez for their contributions to the spotify documentation
// love to write as little auth as possible.

let stateKey = 'spotify_auth_state';

let generateRandomString = (length) => {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

router.get('/login', function(req, res) {

    let state = generateRandomString(16);
    res.cookie(stateKey, state);

    // your application requests authorization
    let scope = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize?' + querystring.stringify({
        response_type: 'code',
        client_id: process.env.SPOTIFY_CLIENT_ID,
        scope: scope,
        redirect_uri: process.env.REDIRECT_URI,
        state: state
    }));
});

module.exports = router