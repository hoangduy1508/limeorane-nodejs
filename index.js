var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var app = express();
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
var port = process.env.PORT || 8080;
var format = require('format-number');
var sql = require("./config/mysql");
var MySQLStore = require('express-mysql-session')(session);
var userController = require('./controller/userController');
var adminController = require("./controller/adminController");
var frontController = require("./controller/frontController");
var api = require("./controller/api");
var productController = require("./controller/productController");
var expressFileupload = require('express-fileupload');
var socketcontroller = require("./controller/socketcontroller");
var expressValidator = require('express-validator');
const webpush = require('web-push');
const path = require("path");
// setup views
app.use(expressValidator());
// app.use(morgan("dev"));
app.use("/assets", express.static(__dirname + "/assets"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(flash());
console.log(path.join(__dirname, "assets/js"));
// webpush
// VAPID keys should only be generated only once.

const publicKey = "BMLSy7oAs3uK_DkXpWfChedHKhAScADf0d-MWntEexffluMgKlsYDr0YuP2TF5Na9PlR7xyzjNufD5Tw7hFvgXs";
const privateKey = "u0WRjIO1M5w2Hk3ZybrHTNE_snZSYoWQkejsY6K2wQw";


webpush.setVapidDetails('mailto:hoangduy15081995@gmail.com', publicKey, privateKey);
// subcribe route


app.post('/thongbao1', (req, res) => {
    const theodoi = req.body;
    // send 201
    res.status(201).json({
    });
    // create payload
    const payload = JSON.stringify({
        title: 'push test1',
        body: 'Wellcome to limeorange.vn1'
    });
    // pass object into send notification

    webpush.sendNotification(theodoi, payload).catch(err => console.log(err))
});
app.post('/thongbao2', (req, res) => {
    const theodoi = req.body;
    // send 201
    res.status(201).json({
    });
    // create payload
    const payload = JSON.stringify({
        title: 'push test2',
        body: 'Wellcome to limeorange.vn2'
    });
    // pass object into send notification

    webpush.sendNotification(theodoi, payload).catch(err => console.log(err))
});
app.post('/thongbao3', (req, res) => {
    const theodoi = req.body;
    // send 201
    res.status(201).json({
    });
    // create payload
    const payload = JSON.stringify({
         title: 'push test3',
        body:'Wellcome to limeorange.vn3'
 });
    // pass object into send notification

    webpush.sendNotification(theodoi, payload).catch(err => console.log(err))
});

// db info
var options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'limeorange'
};
var sessionStore = new MySQLStore(options);
sql.connect({ dateStrings: true }, function (err) {
    if (err) throw err;
    console.log("Connected!");
});
//use sessions for tracking logins
app.use(session({
    key: 'user',
    secret: 'duy',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

// // ket noi controller
var server = require("http").Server(app);
var io = require("socket.io")(server);
socketcontroller(io);
app.use(expressFileupload());
productController(app);
userController(app);
adminController(app);
frontController(app);
api(app);
server.listen(port, function () {
    console.log("started on port: " + port);
});
 