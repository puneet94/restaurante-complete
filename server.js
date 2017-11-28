
var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = require('socket.io');//(server, {pingTimeout: 60000});

io = io.listen(server);
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var compression = require('compression');
var cors = require('cors');

mongoose.Promise = global.Promise;


require('dotenv').config();
console.log(process.env.DB_URL);
    app.set('dbUrl', process.env.DB_URL);

  mongoose.connect(app.get('dbUrl'),{
      useMongoClient: true
  });


app.use(cors());
if (app.get('env') === 'production') {
  app.use(function(req, res, next) {
    var protocol = req.get('x-forwarded-proto');
    protocol == 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
  });
}
var orderRouter = require('./routes/order');
var userRouter = require('./routes/user');
var itemRouter = require('./routes/item');
var itemTypeRouter = require('./routes/itemType');
var adminRouter = require('./routes/admin');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(compression());
app.set('port', process.env.PORT || 3000);



app.use('/user',userRouter);
app.use('/admin',adminRouter);
app.use('/item',itemRouter);
app.use('/itemType',itemTypeRouter);
app.use('/order',orderRouter);
app.use(express.static(__dirname + '/restaurante-client/build'));

app.use(function(req, res, next) {
    req.io = io;
    next();
});
console.log(__dirname);

app.get('*', function (req, res) {
    console.log("hello************");
        res.sendFile(__dirname + '/restaurante-client/build/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

io.on('connection', function(socket) {
    
    socket.on('addToChatRoom', function(room) {
      console.log("joined the room singleroom");
        console.log(room);
        socket.join(room.roomId);
    });
    socket.on('addToSingleRoom', function(singleRoom) {
        console.log("joined the room singleroom");
        socket.join(singleRoom.roomId);
    });
    socket.on('addToMessagetRoom',function(messageRoom){
        console.log("joined the message room");
        console.log(messageRoom);
        socket.join(messageRoom.roomId);
    });
    socket.on('removeFromRoom', function(room) {
        console.log("left room");
        console.log(room.roomId);
        socket.leave(room.roomId);
    });
    socket.on('disconnect', function() {
        console.log("disconnected");
    });
});


server.listen(app.get('port'), function() {
        console.log("listening on server");
    });
    
    
