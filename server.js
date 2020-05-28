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
const connect = mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  socket.on('Sent Message', (payload) => {
    //store in db
    connect.then((db) => {
      try {
        const chat = new Chat({
          message: payload.message,
          sender: payload.userId,
        });
        chat.save((err, data) => {
          if (err) return res.json({ success: false, err });
          Chat.find({ _id: data._id })
            .populate('sender')
            .exec((err, data) => {
              return io.emit('Received Message', data);
            });
        });
      } catch (err) {
        console.log(err);
      }
    });
  });
});

// socket.on('chat message', (message) => {
//   io.emit('message', { message });
//   // save to database
//   connect.then((db) => {
//     try {
//       const chat = new Chat({
//         message: message.chatMessage,
//         sender: message.userId,
//       });
//       chat.save((err, doc) => {
//         console.log(doc);
//         if (err) return res.json({ success: false, err });

//         Chat.find({ _id: doc._id })
//           .populate('sender')
//           .exec((err, doc) => {
//             return io.emit('message', doc);
//           });
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   });
// });
// });

//routes
const users = require('./routes/users');
const chat = require('./routes/chat');

app.use('/users', users);
app.use('/chat', chat);

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
