require('dotenv').config();
let express = require('express'); 
let app = express();
let sequelize = require('./db');

let journal = require('./controllers/journalcontroller');
let user = require('./controllers/usercontroller');

// let about = require('./controllers/journalcontroller')
// app.use('/test', function(req, res){
//     res.send('This is a message from the test endpoint on the server!')
// })

sequelize.sync();

app.use(express.json());  //9.2.3

app.use('/journal', journal);
app.use('/user', user);

// app.use('/about', about)

app.listen(3000, function(){
    console.log('App is listening on port 3000');
});