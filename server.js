const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Chat = require('./models/Chat');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  socket.on('Input Chat Message', (msg) => {
    connect.then((db) => {
      try {
        const chat = new Chat({
          message: msg.chatMessage,
          sender: msg.userId,
          type: msg.type,
        });
        chat.save((err, doc) => {
          console.log(doc);
          if (err) return res.json({ success: false, err });

          Chat.find({ _id: doc._id })
            .populate('sender')
            .exec((err, doc) => {
              return io.emit('Output Chat Message', doc);
            });
        });
      } catch (error) {
        console.error(error);
      }
    });
  });
});

//routes
const users = require('./routes/users');
const chat = require('./routes/chat');

app.use('/users', users);
app.use('/chat', chat);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
