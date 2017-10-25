const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

//requireLogin is a middleware that will check if the user is logged in.
//Posts the payment and resolves with the updated usermodel.

module.exports = (app) => {
    app.post('/api/stripe', requireLogin, async (req, res) => {

        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '5 dollar for 5 credits',
            source: req.body.id
        });

        req.user.credits += 5;
        const user = await req.user.save();
        res.send(user);
    });

};