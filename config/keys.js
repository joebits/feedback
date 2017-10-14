if (process.env.NODE_ENV === 'production') {
    //production
    module.exports = require('./prod');
} else {
    //development
    console.log('------- You are in the development environment --------')
    module.exports = require('./dev');
}