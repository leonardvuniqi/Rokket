const express        = require('express');
const requestPromise = require('request-promise');
const router         = express.Router();

// gets the next 5 launches by default - change this later to be according to user input
router.get('/', (req, res) => {
    var options = {
        uri: 'https://launchlibrary.net/1.4/launch/next/5',
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true
    };

    requestPromise(options)
        .then(launchesData => {
            res.json({
                launches: launchesData.launches
            });
        })
        .catch(err => {
            console.log(err);
        });
});

module.exports = router;