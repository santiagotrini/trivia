const mongoose = require('mongoose');

// schema y modelo de respuesta
const AnswerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  isRight: { type: Boolean, default: false },
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' }
});

const Answer = mongoose.model('Answer', AnswerSchema);

module.exports = Answer;
