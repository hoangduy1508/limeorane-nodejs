var express = require('express');
var db = require('../config/mysql');

function getProduct(res,cateid) {

   
    var sql = `SELECT product.id AS id,category.id AS cateid,product.name AS name, product.cost AS cost, category.name AS catename FROM product JOIN category ON product.cateid = category.id WHERE category.id='${cateid}'`;
    db.query(sql, function (err, result) {
        if (err) res.json(err);
        res.json(result);
    });
}
function getAllProduct(res) {
    var sql = `SELECT product.id AS id,category.id AS catid,product.name AS name,product.img_main AS img_main,product.img_sub AS img_sub, product.cost AS cost, category.name AS catname FROM product JOIN category ON product.catid = category.id `;
    db.query(sql, function (err, result) {
        if (err) res.json(err);
        res.json(result);
    });
}
function getNoti(res) {
    var sql = `SELECT * FROM thongbao `;
    db.query(sql, function (err, result) {
        if (err) res.json(err);
        res.json(result);
    });
}
function getAllCart(res) {
    // get cartdetail
    var sqldetail = `SELECT cart.id AS cartid,cartdetail.id AS id,product.name AS productname,product.img_sub AS productimg, product.cost AS cost, cartdetail.quantity AS quantity FROM cartdetail JOIN cart ON cartdetail.cartid = cart.id JOIN product ON cartdetail.productid = product.id `;
    var sqlcart = `SELECT cart.id AS id,cart.time AS time,cart.Isdone AS Isdone,cart.userid AS userid,user.username AS username FROM cart JOIN user ON cart.userid = user.id ORDER BY time ASC`;

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
                       var Isdone={
                            status:"Đã xong",
                            check:true
                        }
                       
                    }
                    else {
                      var  Isdone = {
                            status: "Chưa xong",
                            check: false
                        }
                    }
                    userid = item2.userid;
                    username = item2.username;
                    tongtien = 0;
                    cartdetail.forEach(item => {

                        if (item.cartid == cartid) {
                            cartdetailist.push(item);
                            tongtien = tongtien + (item.cost*item.quantity);
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
                    }
                    if (cartdetailist.length != 0) { danhsach.push(itempush); }

                });
                // console.log(danhsach);
                res.json(danhsach);

            });
        }

    });
}

function getUserCart(res,userid) {
    // get cartdetail
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
                            tongtien = tongtien + item.cost;
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
                // console.log(danhsach);
                res.json(danhsach);

            });
        }

    });
}
function getCate(res) {
    var sql = `select * from category`;
    db.query(sql, function(err, result) {
        res.json(result);
    });
}
function getBanner(res) {
    var sql = `select * from banner`;
    db.query(sql, function (err, result) {
        res.json(result);
    });
}
function getUserInfo(res,userid) {
    var sql = `select * from user where id='${userid}'`;
    db.query(sql, function (err, result) {
        res.json(result);
    });
}
function getTable(res) {
    var sql = `select * from ban`;
    db.query(sql, function(err, result) {
        res.json(result);
    });
}

module.exports = function(app) {
    // // <-- product --> //
    // get  product by cateid
    app.get("/api/productlist",isLoggedIn, function(req, res) {
        if(!req.query.cateid)
        {
            getProduct(res);
        }
        else{
            
            getProduct(res,req.query.cateid)
        }
        
    });
    // get  user info
    app.get("/api/userinfo", isLoggedIn, function (req, res) {
        var userid= req.session.userId;
        getUserInfo(res,userid);
    });
    // get  product by cateid
    app.get("/api/getallproduct", isLoggedIn, function (req, res) {
            getAllProduct(res);
    });

    // add new product
    app.post("/api/addproduct",isLoggedIn, function(req, res) {
        var product = {
            name: req.body.name,
            cost: req.body.cost,
            cateid: req.body.catid,
        };
        var sql = `INSERT INTO product (name,cost,catid) VALUES ('${req.body.name}','${req.body.cost}','${req.body.catid}')`;
        db.query(sql, function(err, result) {
            if (err) console.log(err);
            else {
                getAllProduct(res)
            }
        });
    });
    // add edit product
    app.put("/api/editproduct",isLoggedIn, function(req, res) {
        var sql = `UPDATE product SET name = '${req.body.name}', catid = '${req.body.catid}', cost = '${req.body.cost}' WHERE id = '${req.body.id}'`;
        console.log(sql);
        db.query(sql, function(err) {
            if (err) throw err;
            else {
                getAllProduct(res)
            };
        })
    });
    // delete product
    app.delete("/api/deleteproduct/:id",isLoggedIn, function(req, res) {
       
                var sql = `DELETE FROM product WHERE id = '${req.params.id}'`;
                db.query(sql, function (err, result) {
                    if (err) throw err;
                    else {
                        getAllProduct(res);
                    }


                });
            
           
        
        });
      
   
    // // <-- product --> //

    // // <-- category --> //
    // get all category
    app.get("/api/catelist",isLoggedIn, function(req, res) {
        getCate(res);
    });

    // add new cate
    app.post("/api/addcate", isLoggedIn, function(req, res) {

        var sql = `INSERT INTO category (name) VALUES ('${req.body.name}')`;
        db.query(sql, function(err, result) {
            if (err) console.log(err);
            else {
                getCate(res);
            }
        });
    });
    // add edit cate
    app.put("/api/editcate", isLoggedIn, function(req, res) {

        var sql = `UPDATE category SET name = '${req.body.name}' WHERE id = '${req.body.id}'`;
        db.query(sql, function(err) {
            if (err) throw err;
            else getCate(res);;
        })
    });
    // add delete
    app.delete("/api/deletecate/:id", isLoggedIn, function(req, res) {


        var sql = `DELETE FROM category WHERE id = '${req.params.id}'`;
        db.query(sql, function(err, result) {
            if (err) throw err;
            getCate(res);
        });
    });
    // // <-- category --> //

    // // <-- banner --> //
    // get all banner
    app.get("/api/bannerlist", isLoggedIn, function (req, res) {
        getBanner(res);
    });

    // add edit banner
    app.put("/api/editbanner", isLoggedIn, function (req, res) {

        var sql = `UPDATE banner SET type = '${req.body.type}',link = '${req.body.link}' WHERE id = '${req.body.id}'`;
        db.query(sql, function (err) {
            if (err) throw err;
            else getBanner(res);;
        })
    });
    // add delete banner
    app.delete("/api/deletebanner/:id", isLoggedIn, function (req, res) {


        var sql = `DELETE FROM banner WHERE id = '${req.params.id}'`;
        db.query(sql, function (err, result) {
            if (err) throw err;
            getBanner(res);
        });
    });
    // // <-- banner --> //



    // <-- table --> //
    // get all table
    app.get("/api/tablelist", isLoggedIn, function(req, res) {
        getTable(res);
    });

    // add new table
    app.post("/api/addtable", isLoggedIn, function(req, res) {
        var sql = `INSERT INTO ban (name) VALUES ('${req.body.name}')`;
        db.query(sql, function(err, result) {
            if (err) res.json(err);
            else {
                getTable(res);
            }
        });
    });
    // add edit cate
    app.put("/api/edittable", isLoggedIn, function(req, res) {
        var sql = `UPDATE ban SET name = '${req.body.name}' WHERE id = '${req.body.id}'`;
        db.query(sql, function(err) {
            if (err) throw err;
            else getTable(res);;
        })
    });
    // add delete
    app.delete("/api/deletetable/:id", isLoggedIn, function(req, res) {
        var sql = `DELETE FROM ban WHERE id = '${req.params.id}'`;
        db.query(sql, function(err, result) {
            if (err) throw err;
            getTable(res);
        });
    });
    // <-- table --> //

    // <-- cart --> //
    // get all cart
    app.get("/api/cartdetaillist", isLoggedIn, function(req, res) {
        // get cartdetail
        getcartdetail(res, req.query.cartid);
    });
   
    // add new cart
    app.post("/api/addcartdetail", isLoggedIn, function(req, res) {
        var sql = `INSERT INTO cartdetail (cartid,productid,quantity) VALUES ('${req.body.cartid}','${req.body.productid}','${req.body.quantity}')`;
        db.query(sql, function(err, result) {
            if (err) res.json(err);
            else {
                getcartdetail(res, req.body.cartid);
            }
        });
    });
    // add edit cart
    app.put("/api/editcartdetail", isLoggedIn, function(req, res) {
        console.log(req.body);
        var sql = `UPDATE cartdetail SET productid = '${req.body.productid}', quantity = '${req.body.quantity}' WHERE id = '${req.body.id}'`;
      
        db.query(sql, function (err) {
            if (err) throw err;
            else {
                getcartdetail(res, req.body.cartid);
            }
        })
    });
    // add delete cart
    app.get("/api/deletecartdetail", isLoggedIn, function(req, res) {

        var sql = `DELETE FROM cartdetail WHERE id = '${req.query.id}'`;
        db.query(sql, function(err, result) {
            if (err) throw err;
            getcartdetail(res, req.query.cartid);
        });
    });
    // thanhtoan
    app.put("/api/thanhtoan/", isLoggedIn, function(req, res) {
        var sql = `UPDATE cart SET isDone = true WHERE id = '${req.body.id}'`;
        db.query(sql, function(err) {
            if (err) throw err;
            else res.json("da thanh toan");
        })

    });


    // thong ke
    app.get("/api/statislist", isLoggedIn, function(req, res) {
        // get cartdetail
        var sqldetail = "SELECT cart.id AS cartid,cartdetail.id AS id,product.name AS productname, product.cost AS cost, cartdetail.quantity AS quantity FROM cartdetail JOIN cart ON cartdetail.cartid = cart.id JOIN product ON cartdetail.productid = product.id ";
        var sqlcart = "SELECT *  FROM cart ";
        db.query(sqldetail, function(err, cartdetail) {
            if (err) res.json(err);

            db.query(sqlcart, function(err, cart) {
                danhsach = new Array;
                cart.forEach(item2 => {
                    cartdetailist = new Array;
                    cartid = item2.id;
                    time = item2.time;
                    cartdetail.forEach(item => {


                        if (item.cartid == cartid) cartdetailist.push(item);
                    });
                    itempush = {
                        cartid: cartid,
                        time: time,
                        cartdetaillist: cartdetailist
                    }
                    danhsach.push(itempush);
                });
                // console.log(danhsach);
                res.json(danhsach);

            });
        });


    });
    // tìm kiếm thống kê
    app.get("/api/timkiem", isLoggedIn, function (req, res) {
        if (!req.query.productname) var productname= "";
        else{
            var productname = req.query.productname;
        }
       
        // get cartdetail
        var sqldetail = `SELECT cart.id AS cartid,cartdetail.id AS id,product.name AS productname, product.cost AS cost, cartdetail.quantity AS quantity FROM cartdetail JOIN cart ON cartdetail.cartid = cart.id JOIN product ON cartdetail.productid = product.id  WHERE product.name like '%${productname}%'`;
        var sqlcart = "SELECT *  FROM cart ";
        db.query(sqldetail, function (err, cartdetail) {
            if (err) res.json(err);
            if (cartdetail.length==0){
               res.json([]);
            }
            else
            {
                db.query(sqlcart, function (err, cart) {
                    danhsach = new Array;
                    cart.forEach(item2 => {
                        cartdetailist = new Array;
                        cartid = item2.id;
                        time = item2.time;
                        cartdetail.forEach(item => {


                            if (item.cartid == cartid) cartdetailist.push(item);
                        });
                        itempush = {
                            cartid: cartid,
                            time: time,
                            cartdetaillist: cartdetailist
                        }
                        if (cartdetailist.length != 0) { danhsach.push(itempush);}
                       
                    });
                    // console.log(danhsach);
                    res.json(danhsach);

                });
            }
            
        });


    });
    // add new cart
    app.post("/api/orderproduct", isLoggedIn, function (req, res) {
        
        var sql = `SELECT * FROM cart WHERE userid='${req.session.userId}' AND Isdone=false`;
        db.query(sql, function (err, result) {
            if (err) res.json(err);
            else {
                if (result.length == 0) {
                    var sql = `INSERT INTO cart (userid,Isdone) VALUES ('${req.session.userId}',false)`;
                    db.query(sql, function (err, result2) {
                        if (err) res.json(err);
                        else {
                            console.log(result2.insertId);
                            var sql = `INSERT INTO cartdetail (cartid,productid,quantity) VALUES ('${result2.insertId}','${req.body.productid}','${req.body.quantity}')`;
                            db.query(sql, function (err, result) {
                                if (err) res.json(err);
                                else {
                                    res.json({ status: true});
                                    
                                }
                            });
                        }
                    });
                }
                else {
                    var cartid = result[0].id;
                    var sql = `INSERT INTO cartdetail (cartid,productid,quantity) VALUES ('${cartid}','${req.body.productid}','${req.body.quantity}')`;
                    db.query(sql, function (err, result) {
                        if (err) res.json(err);
                        else {
                            res.json({ status: true });
                        }
                    });
                }
            }
        });


    });


    // list all cart
    app.get("/api/cartlist", isLoggedIn, function (req, res) {
        if (typeof req.query.status == "undefined") {
            var where = "1=1";
        }
        else if (req.query.status == "done") {
            var where = "Isdone=true";
        }
        else {
            var where = "Isdone=false";
        }

        getAllCart(res, where);


    });
    // list user cart
    app.get("/api/usercartlist", isLoggedIn, function (req, res) {

        var userid = req.session.userId;
        getUserCart(res, userid);

    });
    // xac nhận order
    app.put("/api/xacnhanorder", isLoggedIn, function (req, res) {

        var sql = `UPDATE cart SET Isdone = true WHERE id = '${req.body.id}'`;

        db.query(sql, function (err) {
            if (err) throw err;
            else {
                getAllCart(res)
            }
        })
      


    });
    // get all noti
    app.get("/api/notilist", isLoggedIn, function (req, res) {
        // get cartdetail
        getNoti(res);
    });
    // get all noti
    app.delete("/api/deletenoti/:id", isLoggedIn, function (req, res) {
     
        // get cartdetail
        var sql = `DELETE FROM thongbao WHERE id = '${req.params.id}'`;
        db.query(sql, function (err, result) {
            if (err) throw err;
            getNoti(res);
            
        });
       
    });
   
    function getCity(res) {
        var sql = `SELECT * FROM city WHERE IDCITY = PARENT1 AND PARENT2 = 0 `;
        db.query(sql, function (err, result) {
            if (err) res.json(err);
            res.json(result);
        });
    }
     // list store
    function getlistStore(res) {

         // promise all
        let getQuery = (query) => new Promise((resolve, reject) => {
            db.query(query, (error, result) => {
                if (error) return reject(error);
                resolve(result);
            })
        });
        var sql = `SELECT * FROM list_store`;
        getQuery(sql)
            .then(function (result) {
                var data= Promise.all(result.map(function (item) {
                    let sql1 = `SELECT NAME_VN FROM city WHERE IDCITY = '${item.thanhpho}'`;
                    let sql2 = `SELECT NAME_VN FROM city WHERE IDCITY = '${item.huyen}'`;
                    let sql3 = `SELECT NAME_VN FROM city WHERE IDCITY = '${item.phuong}'`;
                    return Promise.all([getQuery(sql1), getQuery(sql2), getQuery(sql3)])
                        .then((resultAll) => {
                           
                            let [result1, result2, result3] = resultAll;
                            return {
                                id: item.id,
                                cityname: result1[0].NAME_VN,
                                huyenname: result2[0].NAME_VN,
                                phuongname: result3[0].NAME_VN,
                                cityid: item.thanhpho,
                                huyenid: item.huyen,
                                phuongid: item.phuong,
                                diachi:item.diachi
                            }
                        })
                }))
                return data;
            })
            .then(function (data) {
                res.json(data);
            })

    }
    // var Getphuongname = new Promise(function (resolve, reject) {
    //     var sql3 = `SELECT NAME_VN FROM city WHERE IDCITY = '${item.phuong}'`;
    //     db.query(sql3, function (err, result) {
    //         if (err) console.log(err);
    //         else {
    //             var phuongname = result[0].NAME_VN;
    //             resolve(phuongname);
    //         }
    //     });

    // });

    function getHuyen(res,city_id) {
        var sql = `SELECT * FROM city WHERE PARENT1 = '${city_id}' AND PARENT2 = PARENT1 `;
        db.query(sql, function (err, result) {
            if (err) res.json(err);
            res.json(result);
        });
    }
    function getPhuong(res,huyen_id) {
        var sql = `SELECT * FROM city WHERE PARENT2= '${huyen_id}' `;
        db.query(sql, function (err, result) {
            if (err) res.json(err);
            res.json(result);
        });
    }
    // get all thành phố
    app.get("/api/citylocate", isLoggedIn, function (req, res) {
        // get cartdetail
        getCity(res);
    });
    // get store thành phố
    app.get("/api/allstorelist", isLoggedIn, function (req, res) {
       
        getlistStore(res);
    });
    // get all quận
    app.get("/api/huyenlocate", isLoggedIn, function (req, res) {
        // get cartdetail
        getHuyen(res,req.query.city_id);
    });
    // get all phường
    app.get("/api/phuonglocate", isLoggedIn, function (req, res) {
        // get cartdetail
        getPhuong(res,req.query.huyen_id);
    });
    // add new store
    app.post("/api/addstore", isLoggedIn, function (req, res) { 
       
        var sql = `INSERT INTO list_store (thanhpho,huyen,phuong,diachi) VALUES ('${req.body.thanhpho}','${req.body.huyen}','${req.body.phuong}','${req.body.diachi}')`;
        db.query(sql, function (err, result) {
            if (err) res.json(err);
            else {
               
                getlistStore(res);
            }
        });

    });
    
    // delete  store
    app.delete("/api/delete/:id", isLoggedIn, function (req, res) {
        var sql = `DELETE FROM list_store WHERE id = '${req.params.id}'`;
        db.query(sql, function (err, result) {
            if (err) res.json(err);
            else {
                getlistStore(res);
            }
        });

    });
// end of all function
}

function isLoggedIn(req, res, next) {

    // Nếu một user đã xác thực, cho đi tiếp
    if (req.session.userId)
        return next();
    // Nếu chưa, đưa về trang chủ
    res.send("Vui lòng đăng nhập");
}