const Sequelize = require ('sequelize');
const sequelize = new Sequelize('journal-walkthru2',
'postgres', 'elevenFifty', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize
    .authenticate()
    .then(
    function() {
        console.log('Connected to journal-walkthru2 postgres database');
    },
    function(err){
        console.log(err);

    }
);

User = sequelize.import('./models/user');

module.exports = sequelize;