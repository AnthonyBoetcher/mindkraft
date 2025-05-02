require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');

const promptRoutes = require('./routes/prompt.routes');

const app = express();
const PORT = process.env.PORT || 4000;

// 🛡️ Content Security Policy
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://use.typekit.net"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://use.typekit.net", "https://p.typekit.net"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "https://use.typekit.net", "https://p.typekit.net"],
      connectSrc: ["'self'"],
      imgSrc: ["'self'"],
    }
  }
}));

// 🔧 Middleware
app.use(cors());
app.use(express.json());

// 🔗 Routes
app.use('/api/prompts', promptRoutes);

// 🌍 MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB Atlas');
  app.listen(PORT, () => {
    console.log(`🚀 Backend API running at: http://localhost:${PORT}`);
  });
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
});

