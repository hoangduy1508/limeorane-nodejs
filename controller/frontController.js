
var expressFileupload = require('express-fileupload');
var fs = require('fs');
var formidable = require('formidable');
var multer = require('multer');
var db = require('../config/mysql');
function getUserCart(res, userid) {
    
}
module.exports = function (app) {
    app.use(expressFileupload());
    app.get('/detailproduct/:id', function (req, res) {

        var sql = `SELECT * FROM product WHERE id = ${req.params.id}`;
        db.query(sql, function (err, product) {
            if (err) console.log(err);
            else {
                res.render("detailproduct",{product:product});
                console.log(product);
            }
        });
    })
    app.get('/', function (req, res) {
        // promise all
        let getQuery = (query) => new Promise((resolve, reject) => {
            db.query(query, (error, result) => {
                if (error) return reject(error);
                resolve(result);
            })
        });
         var sqlbannerloai1 = `SELECT * FROM banner WHERE type = '1'`;
         var sqlbannerloai2 = `SELECT * FROM banner WHERE type = '2'`;
         var sqlbannerloai3 = `SELECT * FROM banner WHERE type = '3'`;
         var sqlLime = `SELECT * FROM product WHERE catid = '3'`;
         var sqlAW = `SELECT * FROM product WHERE catid = '4'`;
         var sqlBW = `SELECT * FROM product WHERE catid = '5'`;
         var sqlRHYME = `SELECT * FROM product WHERE catid = '6'`;
         var data = Promise.all([getQuery(sqlbannerloai1), getQuery(sqlbannerloai2), getQuery(sqlbannerloai3), getQuery(sqlLime), getQuery(sqlAW), getQuery(sqlBW), getQuery(sqlRHYME)])
             .then((resultAll) => {
                 let [bannerloai1, bannerloai2, bannerloai3, Lime, AW, BW, RHYME] = resultAll;
                 return {
                     bannerloai1: bannerloai1,
                     bannerloai2: bannerloai2,
                     bannerloai3: bannerloai3,
                     limebasisProductdata: Lime,
                     AWProductdata: AW,
                     BWProductdata: BW,
                     RHYMEProductdata: RHYME
                 }
             });
        data.then(function(data){
            res.render('index', {
                listbanner: data.bannerloai1,
                listbanner2: data.bannerloai2,
                listbanner3: data.bannerloai3,
                limebasisProductdata: data.limebasisProductdata,
                RHYMEProductdata: data.RHYMEProductdata,
                AWProductdata: data.RHYMEProductdata,
                BWProductdata: data.limebasisProductdata
            });
        })
    
         
              
       

       
    })
   
 

    app.get("/orderproduct",function(req,res) {
        // get cartdetail
        var userid = req.session.userId;
        var sqldetail = `SELECT cart.id AS cartid,cartdetail.id AS id,product.name AS productname,product.id AS productid,product.img_sub AS productimg, product.cost AS cost, cartdetail.quantity AS quantity FROM cartdetail JOIN cart ON cartdetail.cartid = cart.id JOIN product ON cartdetail.productid = product.id `;
        var sqlcart = `SELECT cart.id AS id,cart.time AS time,cart.Isdone AS Isdone,cart.userid AS userid,user.username AS username FROM cart JOIN user ON cart.userid = user.id WHERE cart.userid = ${userid} AND Isdone = false ORDER BY time ASC`;

        // lồng danh sách cart và cart detail vào nhau
        db.query(sqldetail, function (err, cartdetail) {
            if (err) res.json(err);
            if (cartdetail.length == 0) {
                res.json("dsad");
            }
            else {
                db.query(sqlcart, function (err, cart) {
                    danhsach = new Array;

                    cart.forEach(item2 => {
                        cartdetailist = new Array;
                        cartid = item2.id;
                        time = item2.time;

                        if (item2.Isdone == true) {
                            var Isdone = {
                                status: "Đã xong",
                                check: true
                            }

                        }
                        else {
                            var Isdone = {
                                status: "Chưa xong",
                                check: false
                            }
                        }
                        userid = item2.userid;
                        username = item2.username;
                        var tongtien = 0;
                        var soluongpro = 0;
                        cartdetail.forEach(item => {

                            if (item.cartid == cartid) {
                                cartdetailist.push(item);
                                tongtien = tongtien + (item.cost * item.quantity);
                                soluongpro++;
                            }
                        });
                        itempush = {
                            cartid: cartid,
                            userid: userid,
                            time: time,
                            Isdone: Isdone,
                            username: username,
                            cartdetaillist: cartdetailist,
                            tongtien: tongtien,
                            soluongpro: soluongpro
                        }
                        if (cartdetailist.length != 0) { danhsach.push(itempush); }

                    });       
                    res.render("orderproduct", { product: danhsach});
                });
            }

        });
    });
    app.get("/search",function (req,res) {
        console.log(req.query.product_name);
        var sqldetail = `SELECT * FROM product WHERE name like '%${req.query.product_name}%' `;
        db.query(sqldetail, function (err, product) {
            res.render("search.ejs", { product: product });
        });
       
    });
    app.get("/category/:category", function (req, res) {
     
        // lấy catid
       
        var sqlcatid = `SELECT id FROM category WHERE REPLACE(name," ","") like '%${req.params.category}%' `;
        db.query(sqlcatid, function (err, catid) {
           
            var sqldetail = `SELECT * FROM product WHERE catid='${catid[0].id}' `;
            db.query(sqldetail, function (err, product) {
                console.log(product);
                res.render("category.ejs", { product: product });
            });
        });
        // lấy thông tin product từ catid 
        
       
    });
    app.get("/notication", isLoggedIn, function (req, res) {

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
                res.render("notication", { notication: notication2 });
            }
        });

    });
    app.get("/notication/:id", isLoggedIn, function (req, res) {

        var sql = `SELECT * FROM thongbao where id='${req.params.id}'`;
        db.query(sql, function (err, notication) {
            if (err) console.log(err);
            else {
                console.log(notication[0].content);
                res.render("notication_detail", { notication: notication });
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