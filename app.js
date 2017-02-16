var express = require('express');
var app = express();
var http = require('http').Server(app);
var port = 3000;
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');

})

io.on('connection', function (socket) {
    console.log('a user connected');
    //Mới vào lúc đầu
    socket.on('hello', function (msg) {
        console.log("New username:" + msg);
        io.emit('hello', msg);

    });    
    socket.on('chat message', function (msg) {
        //console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    socket.on('editing', function (msg) {
        io.emit('editing',msg);
    });
    socket.on('endediting', function (msg) {
        io.emit('endediting',msg);
    });


});
http.listen(port, function () {
    console.log('Ung dung dang lang nghe tren port:' + 3000);
}) 