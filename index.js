const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
require('./models/User');
require('./models/Survey');
require('./services/passport.js');

mongoose.connect(keys.mongoURI);

const app = express();

//Middlewares used in the app.
//There's also middlewares used for specific routes
// See billingRoutes.js as an example
app.use(bodyParser.json());
app.use(cookieSession({
        maxAge: 30 *  24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    const path = require('path');

    //Express will serve up production assets
    app.use(express.static(path.join(__dirname, 'client/build')));

    //Express serves index.html if it doesn't recognize the route
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
      });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);