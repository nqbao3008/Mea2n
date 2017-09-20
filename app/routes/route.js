var mongoose = require('mongoose'),
    ejs = require('ejs'),
    user = mongoose.model('user');


module.exports = function(app) {
    // show about site
    app.get('/about', (req, res) => {
        var item = {};
        item.name = "nguyenquocbao";
        item.age = "21";
        if (!req.session.user) {
            console.log('No session!!!');
            res.status(401).send();
        } else {
            ejs.renderFile('./view/about.ejs', item, (err, html) => {
                res.end(html);
            });
        }
    });

    app.get('/register', (req, res) => {
        ejs.renderFile('./view/register.ejs', {}, (err, html) => {
            res.end(html);
        });
    });

    app.get('/login', (req, res) => {
        ejs.renderFile('./view/login.ejs', {}, (err, html) => {
            res.end(html);
        });
    });

    app.get('/logout', (req, res)=>{
        req.session.destroy();
        console.log('logout done!!!');
        ejs.renderFile('./view/login.ejs', {}, (err, html) => {
            res.end(html);
        });
    });

    app.post('/login', (req, res) => {
        const tmp = req.body;
        var errMes = "";

        if (!tmp.name) {
            errMes += " Need enter user name.";
        }
        if (!tmp.email) {
            errMes += " Need enter user email.";
        }
        if (!tmp.password) {
            errMes += " Need enter user password.";
        }
        if (errMes) {
            ejs.renderFile('./view/login.ejs', { errMes: errMes }, (err, html) => {
                res.end(html);
            });
        } else {
            user.findOne({ email: tmp.email, password: tmp.password, name: tmp.name }, (err, user) => {
                if (err || !user) {

                    errMes = " Failed!";
                    ejs.renderFile('./view/login.ejs', { errMes: errMes }, (err, html) => {
                        res.end(html);
                    });
                } else {

                    ejs.renderFile('./view/about.ejs', { name: tmp.name }, (err, html) => {
                        res.end(html);
                    });

                }
            });
        }
    });

    app.post('/register', (req, res) => {

        const tmp = req.body;
        var errMes = "";

        if (!tmp.name) {
            errMes += " Need enter user name.";
        }
        if (!tmp.email) {
            errMes += " Need enter user email.";
        }
        if (!tmp.password) {
            errMes += " Need enter user password.";
        }
        if (errMes) {
            ejs.renderFile('./view/register.ejs', { errMes: errMes }, (err, html) => {
                res.end(html);
            });
        } else {
            var newUser = user(res.body);
            newUser.save(function(err, user) {
                if (!err) {
                    errMes = " Success!";
                    ejs.renderFile('./view/register.ejs', { errMes: errMes }, (err, html) => {
                        res.end(html);
                    });
                } else {
                    errMes = " Failed!";
                    ejs.renderFile('./view/register.ejs', { errMes: errMes }, (err, html) => {
                        res.end(html);
                    });
                }
            });
        }
    });




    /*    app.get('/login', function(req, res) {
            if (!req.query.username || !req.query.password) {
                res.send('login failed');
            } else if (req.query.username === "amy" || req.query.password === "amyspassword") {
                req.session.user = "amy";
                req.session.admin = true;
                res.send("login success!");
            }
        });*/

};