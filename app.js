const express = require('express');
const mongoose = require('mongoose');
const uploadRoutes = require('./src/routes/upload');
const statusRoutes = require('./src/routes/status');
const dotenv = require('dotenv');

const app = express();
dotenv.config();
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use('/api', uploadRoutes);
app.use('/api', statusRoutes);

module.exports = app;