var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var dotenv = require('dotenv')
var cors = require('cors')
var io = require('socket.io')()
var iochatbox = io.of('/chatbox')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tablesRouter = require('./routes/tables')
var simulationsRouter = require('./routes/simulations')

const {updateLobby }= require('./socket');
const { required } = require('@hapi/joi');


dotenv.config()

var app = express();

// database connexion
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true , useUnifiedTopology: true })
  .then(()=> {
    console.log('Connexion etablie à la base de donnée')
  })
  .catch((er)=>{
    console.log(` ERROR on db Connexion: ${er}`)
  })


  app.use(cors())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tables', tablesRouter)
app.use('/simulations', simulationsRouter)


// socket io stuff
io.listen(2600)

let interval

io.on("connection", (socket) => {
  console.log("New Lobby client connected");
  if (interval) {
    clearInterval(interval);
  }

  interval = setInterval(() => getApiAndEmit(socket), 200000);

  socket.on('client-message', (data, callback) => {
    console.log(data)
    socket.emit('message', data)
    callback()
  })

  socket.on('join', (data, callback) => {
   socket.emit('message',{'message': 'welcome', 'author':'paul'})
  })

 
  socket.on("disconnect", () => {
    console.log("Client Lobby disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = async socket => {
  const response = new Date();
  const tables = await  updateLobby()
  //console.log(tables)
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
  socket.emit('lobbyUpdate', tables)
};


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
