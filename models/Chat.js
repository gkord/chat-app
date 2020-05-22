mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ChatSchema = new Schema(
  {
    message: {
      type: String,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    type: {
      type: String,
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model('chat', ChatSchema);
module.exports = Chat;
