const mongoose = require('mongoose');

const PromptSchema = new mongoose.Schema({
  title: { type: String, required: true },
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctIndex: { type: Number, required: true },
  pdfLink: { type: String },  // Optional PDF or image
  siteStage: { type: String, enum: ['excavation', 'foundation', 'structure', 'facade', 'finish'], default: 'excavation' }
}, { timestamps: true });

module.exports = mongoose.model('Prompt', PromptSchema);
