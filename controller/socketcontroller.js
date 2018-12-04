
var db = require('../config/mysql');




module.exports = function(io) {
    var user_online = 0;
    io.on("connection", function (socket) {
        // io.sockets.emit("server-send-all-user", listOnline);
        // đếm số người online
        user_online++;
        socket.on("disconnect", function () {
            user_online = user_online - 1;
            io.sockets.emit("useronline", user_online);
        })
        io.sockets.emit("useronline", user_online);

        // gửi thông tin người dùng khi đăng nhập
        


        // kiểm tra chat
        socket.on("chatting", function (data) {
            
            if (data.chatting == true) {

                socket.broadcast.emit("server-send-status", {
                    user: data.user,
                    status: true
                });
            } else {
                socket.broadcast.emit("server-send-status", {
                    user: data.user,
                    status: false
                });
            }

        });
        // server send dat hang
        function serverSendOrder() {
            var sql = `SELECT count(id) as soluong FROM cart WHERE Isdone=false`;
            db.query(sql, function (err, result) {
                if (err) console.log(err);
                
                io.sockets.emit("ordernumber", result[0].soluong);
            });
            
        }
        
        serverSendOrder();
        // user order product event
        socket.on("orderproduct", function () {
            serverSendOrder()
            io.sockets.emit("server-send-info-order");
            console.log("da nhan 1 su kien order");

        });
        // // user send chat
        // socket.on("user-send-chat", function (data) {
        //     var chat = {
        //         user: data.user,
        //         text: data.text
        //     };
        //     var sql = `INSERT INTO chat (user,text) VALUES ('${data.user}','${data.text}') `;
        //     db.query(sql, function (err, result) {
        //         if (err) console.log(err);
        //         else {

        //             console.log(chat);

        //         }
        //     });
        //     io.sockets.emit("server-send-chat", {
        //         user: data.user,
        //         text: data.text
        //     });

        // });
        // // loadd chat data
        // var chatdata = `SELECT * FROM chat `;
        // db.query(chatdata, function (err, result) {
        //     if (err) console.log(err);
        //     else {

        //         socket.emit("server-send-chatdata", result);

        //     }
        // });



    //    end connect
    });

};
