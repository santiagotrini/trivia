const mongoose = require('mongoose');

// schema y modelo de pregunta
const QuestionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }]
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
