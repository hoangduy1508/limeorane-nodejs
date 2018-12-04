var db = require('../config/mysql');
var express = require('express');
var expressValidator = require('express-validator');
var bcrypt = require('bcrypt');


const validatorOptions={

};
// get usser
function getUserInfo(req, res) {

    if (req.session.userId) {
        var sql = "SELECT * FROM user WHERE id = " + req.session.userId;
        db.query(sql, function(err, result) {
            if (err) throw err;
            res.json(result);
        });
    } else {
        console.log("khong co du lieu");
    }

}

function encodepass(password) {
    var salt = bcrypt.genSaltSync(10);
    hash = bcrypt.hashSync(password,salt);
    return hash;
}

module.exports = function(app) {
    app.get("/userinfo", function(req, res) {

        getUserInfo(req, res);
    });
    // =====================================
    // HOME PAGE (Với những link đăng nhập) ========
  
    // =====================================
    // LOGIN ===============================
    // =====================================
    // Hiển thị form login
    app.get('/login', function(req, res) {

        // Hiển thị trang và truyển lại những tin nhắn từ phía server nếu có

        if (req.session.userId)
            res.redirect('/');
        // Nếu chưa, đưa về trang chủ
        else { res.render('login.ejs', { tinnhan: "" }) };

    });
    // log thong tin user cho trang chu 
    app.get("/user", isLoggedIn, function(req, res) {
        User.findById({ _id: req.session.userId }, function(err, user) {
            if (err) {
                throw err;
            } else {
                res.json(user);
            }
        });
    });
    // Hiển thị man hinh dang nhap
    app.get('/index-login', function(req, res) {
        // Hiển thị trang và truyển lại những tin nhắn từ phía server nếu có
        if (req.session.userId) res.redirect("/profile");
        else
            res.render('index-login.ejs', { message: req.flash('loginMessage') });

    });
    // Xử lý thông tin khi có người thực hiện đăng nhập


    app.post("/login", function(req, res, next) {


        var sql = `SELECT * FROM user WHERE username='${req.body.username}'`;
        db.query(sql, function(err, result) {

            if (result.length == 0) {
                res.render("login",{tinnhan:"Tài khoản hoặc mật khẩu không đúng"});
            } else {
                console.log("dang nhap thanh cong")
                if (bcrypt.compareSync(req.body.password, result[0].password)==true)
                {
                    req.session.userId = result[0].id;
                    res.redirect("/");
                }
                else
                {
                    res.render("login", { tinnhan: "Tài khoản hoặc mật khẩu không đúng" });
                }
            }


        });

    });
    // app.post('/login', chúng ta sẽ xử lý với passport ở đây);
    // =====================================
    // SIGNUP ==============================
    // =====================================
    // Hiển thị trang đăng ký
    app.get('/signup', function(req, res) {
        console.log(req.session.userId);
        if (req.session.userId) res.redirect('/');
        else
            res.render('signup.ejs', { messages: [] });
    });

    // Xử lý thông tin khi có người đăng ký


    app.post("/signup", function(req, res, next) {
        var user = {
                username: req.body.username,
                password: req.body.password
            }
            // find all athletes that play tennis

        //check form validation
     
        req.checkBody("username", "user is required").notEmpty();
        req.checkBody("password", "password is required").notEmpty();
        req.checkBody('password', 'Xác nhận mật khẩu không giống nhau, vui lòng kiểm tra lại.').equals(req.body.repassword);

        //check for errors
        var errors = req.validationErrors();
        var messages = new Array;
        if (errors){
           
            errors.forEach(function (error) {
                messages.push(error.msg);
            });
            res.render('signup', {messages: messages });
        }
        else{
            var password = encodepass(req.body.password);

            var sql = `INSERT INTO user (username, password) VALUES ('${req.body.username}' ,'${password}')`;
            db.query(sql, function (err, result) {
                if (err) console.log(err);
                else {
                    db.query("SELECT id FROM user WHERE username='" +
                        req.body.username + "'",
                        function (err, result, fields) {
                            if (err) console.log(err);
                            req.session.userId = result[0].id;
                            return res.redirect('/');
                        });
                }
            });
        }
        


    });
    // app.post('/signup', chúng ta sẽ xử lý với passport ở đây);
    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // Đây là trang sẽ được bảo vệ, chỉ những người đã đăng nhập mới có thể xem được
    // Chúng ta sẽ sử dụng route middleware để kiểm tra xem người đó đã đăng nhập chưa
    // hàm isLoggedIn sẽ làm việc đó.

    
    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res, next) {

        if (req.session) {
            // delete session object
            req.session.destroy(function(err) {
                if (err) {
                    return next(err);
                } else {
                    return res.redirect('/');
                }
            });
        }
    });
    
};

// route middleware để kiểm tra một user đã đăng nhập hay chưa?
function isLoggedIn(req, res, next) {
    // Nếu một user đã xác thực, cho đi tiếp

    if (req.session.userId)
        return next();
    // Nếu chưa, đưa về trang chủ
    res.redirect('/index-login');
}