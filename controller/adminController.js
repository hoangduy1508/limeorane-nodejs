
var expressFileupload = require('express-fileupload');
var fs = require('fs');
var formidable = require('formidable');
var multer = require('multer');
var db = require('../config/mysql');

module.exports = function (app) {
   

    app.get('/admin', isLoggedIn, function (req, res) {
     
        var sql = `SELECT * FROM banner`;
        db.query(sql, function (err, result) {
            if (err) console.log(err);
            else {
                
                result.forEach(item => {
                    
                });
                res.render('./admin/index', { listbanner: result});
            }
        });
    })

    app.get('/category', isLoggedIn, function (req, res) {

        var sql = `SELECT * FROM category`;
        db.query(sql, function (err, result) {
            if (err) console.log(err);
            else {
               
                result.forEach(item => {

                });
                res.render('./admin/category', { listcate: result });
            }
        });
    })

    app.get('/product', isLoggedIn, function (req, res) {

        var sql = `SELECT * FROM product`;
        db.query(sql, function (err, result) {
            if (err) console.log(err);
            else {

                result.forEach(item => {

                });
                res.render('./admin/product', { listproduct: result });
            }
        });
    })
    // thembanner
    app.post('/addbanner', isLoggedIn, function (req, res) {
       
        if (!req.files)
            return res.send("no file send!");
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        let file = req.files.file;
        
        // Use the mv() method to place the file somewhere on your server

        var time = new Date().getTime();
        var filepart = "./assets/img/" + time + "_" + file.name;

        file.mv(filepart, function (err) {
            if (err)
                console.log(err);
            else {
                var sql = `INSERT INTO banner (img,link,type) VALUES ('${filepart}' ,'${req.body.link}','${req.body.type}')`;
                db.query(sql, function (err, result) {
                    if (err) console.log(err);
                    else {
                        res.redirect('/admin')
                       
                        
                    }

                });

            }
        });

    });

    // edit img banner
    app.post("/editimgbanner", isLoggedIn, function (req, res) {
        
        var file=req.files.img;
   
        var time = new Date().getTime();
        var filepart = "./assets/img/" + time + "_" + file.name;

        file.mv(filepart, function (err) {
            if (err)
                console.log(err);
            else {
                var sql = `UPDATE banner SET img = '${filepart}' WHERE id = '${req.body.id}'`;

                db.query(sql, function (err) {
                    if (err) console.log(err);
                    else {
                        res.redirect("/admin");
                    };
                })
            }
        });


    });


    
    app.get("/admin/cartlist", isLoggedIn, function (req, res) {

       res.render("./admin/cartlist");


    });
    app.get("/admin/add_notication", isLoggedIn, function (req, res) {
        res.render("./admin/add_notication");

    });
    app.get("/admin/notication", isLoggedIn, function (req, res) {
       
        var sql = `SELECT * FROM thongbao`;
        db.query(sql, function (err, notication) {
            if (err) console.log(err);
            else {

                var i = 1;
                var notication2 = [];
                notication.forEach(item => {
                    item.stt = i;
                    i++;
                    notication2.push(item);
                });
                res.render("./admin/notication", { notication: notication2});
            }
        });

    });
    app.get("/admin/notication/:id", isLoggedIn, function (req, res) {
        
        var sql = `SELECT * FROM thongbao where id='${req.params.id}'`;
        db.query(sql, function (err, notication) {
            if (err) console.log(err);
            else {
               
                res.render("./admin/notication_detail", { notication: notication });
            }
        });

    });
    app.get("/admin/list_store", isLoggedIn, function (req, res) {

       

                res.render("./admin/list_store");
         

    });
    app.post("/admin/add_notication", isLoggedIn, function (req, res) {
     
        if (req.body.title=="")
        {
            res.render("./admin/add_notication",{tinnhan:"bài viết của bạn không có tiêu đề"});
        }
        else if (req.body.contents == "")
        {
            res.render("./admin/add_notication", { tinnhan: "bài viết của bạn không có nội dung" });
        }
        else{
            var sql = `INSERT INTO thongbao (title,content) VALUES ('${req.body.title}' ,'${req.body.contents}')`;
            console.log(req.body);
            db.query(sql, function (err, result) {
                if (err) console.log(err);
                else {
                    res.render("./admin/add_notication", { tinnhan: "Thêm thông báo thành công kiểm tra lại trong danh sách thông báo" });
                }
            });
        }
    });

    
    app.get("/admin/static", isLoggedIn, function (req, res) {
      

        // get cartdetail
        var sql = `SELECT
                        DATE(cart.time) AS time,
                        sum(cartdetail.quantity) as total_quantity,
                        SUM(product.cost*cartdetail.quantity) AS total_cost
                    FROM
                        cartdetail
                    JOIN cart ON cartdetail.cartid = cart.id
                    JOIN product ON cartdetail.productid = product.id
                    WHERE cart.Isdone = true
                    GROUP BY DATE(cart.time) `;
            

            // lồng danh sách cart và cart detail vào nhau
        db.query(sql, function (err, static) {
                if (err) res.json(err);
               
                else {
                    var i=1;
                    var static2=[];
                    static.forEach(item => {
                        item.stt=i;
                        i++;
                        static2.push(item);
                    });
                  
                    res.render("./admin/static",{static:static2});
                }
            });
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