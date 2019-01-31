const express = require('express');
const router  = express.Router();
const launch  = require('./launch');

// home page
router.get('/', (req, res) => {
    res.render('index');
});

router.get('/map', (req, res) => {
    res.render('launchMap');
});

router.use('/api/launch', launch);

module.exports = router;