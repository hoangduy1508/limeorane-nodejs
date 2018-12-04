

var fs = require('fs');
var formidable = require('formidable');
var multer = require('multer');
var db = require('../config/mysql');

module.exports = function(app) {

    // them san pham
    app.post('/product', function (req, res) {
        console.log(req.files);
        if (!req.files)
            return res.status(400).send('No files were uploaded.');
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        let main_img = req.files.main_img;
        let sub_img = req.files.sub_img;
        
       var time = new Date().getTime();
        var main_img_part = "./assets/img/" + time +"_"+ main_img.name;
        var sub_img_part = "./assets/img/" + time + "_" + sub_img.name;
        
        main_img.mv(main_img_part, function (err) {
            if (err)
                console.log(err);
            else {
               
                sub_img.mv(sub_img_part, function (err) {
                    if (err)
                        console.log(err);
                    else {
                        var sql = `INSERT INTO product (name,cost,catid,img_main,img_sub) VALUES ('${req.body.name}' ,'${req.body.cost}','${req.body.catid}','${main_img_part}','${sub_img_part}')`;
                        db.query(sql, function (err, result) {
                            if (err) console.log(err);
                            else {
                                res.redirect('/product')
                            }
                        });
                    }
                });
            }
        });
    });
    // edit img product
    app.post("/editimgproduct", isLoggedIn, function (req, res) {
        if (!req.files){
            return res.status(400).send('No files were uploaded.');
        }
        else if (req.files.img_main)
        {
            var file = req.files.img_main;
          var  imgname ="img_main";
        }
        else
        {
            var file = req.files.img_sub;
            var imgname = "img_sub";
        };
        
        console.log(req.files);
      
        var time = new Date().getTime();
        var filepart = "./assets/img/" + time + "_" + file.name;
       
        file.mv(filepart, function (err) {
            if (err)
                console.log(err);
            else {
                var sql = `UPDATE product SET ${imgname} = '${filepart}' WHERE id = '${req.body.id}'`;

                db.query(sql, function (err) {
                    if (err) console.log(err);
                    else {
                        res.redirect("/product");
                    };
                })
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