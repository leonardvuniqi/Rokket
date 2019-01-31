const express        = require('express');
const path           = require('path');
const config         = require('./config');
const routes         = require('./routes/index');

const app = express();

// set our app to use the views from /views dir
app.set('views', path.join(__dirname, '/views'));

// set up our app to use EJS templating
app.set('view engine', 'ejs');

//serve our static files
app.use(express.static(__dirname + '/public'));

// mount our routes
app.use(routes);

// listen on the port in config file
app.listen(config.PORT, function(){
    console.log(`Server is running at http://localhost:${config.PORT}`);
});
