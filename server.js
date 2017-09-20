const express = require('express'),
	  app = express(),
	  express_session = require('express-session'),
	  bodyParser = require('body-parser'),
	  port = process.env.PORT || 8080,
	  mongoose = require('mongoose'),
	  ejs = require('ejs'),
      user = require('./app/Models/user'),
      session = require('express-session'),
      cookieParser = require('cookie-parser');




mongoose.Promise = global.Promise;
var configDB = require('./config/database.js');
mongoose.connect(configDB.url);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'iloveyoubaobao', // session secret
    resave: false,
    saveUninitialized: true
}));
// app.get('/login', function (req, res) {
//   if (!req.query.username || !req.query.password) {
//     res.send('login failed');    
//   } else if(req.query.username === "amy" || req.query.password === "amyspassword") {
//     req.session.user = "amy";
//     req.session.admin = true;
//     res.send("login success!");
//   }
// });
 


var routes = require('./app/routes/route.js'); //importing route
routes(app);

app.get('/mydemo', (req, res)=>
{
	res.send('Hello World!');
});

app.listen(port,()=>
{
	console.log('listened port'+ port);
});

