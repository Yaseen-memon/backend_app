const express = require('express');
const { mongoose } = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // frontend origin
  credentials: true, // if you're using cookies/sessions
}));
app.use(express.json());

// Routes

// const adminRoutes = require('./Routes/AdminRoutes');
// app.use('/api/admin', adminRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDb Connection Error :', err));


const userRoutes = require('./Routes/AdminRoutes');
app.use('/api', userRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
