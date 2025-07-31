const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const corsOptions = require('./utils/corsOptions'); // 👈 Missing piece

dotenv.config();

const connectDB = require('./config/db');
connectDB();

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

const authRoutes = require('./routes/authroutes');
const ticketRoutes = require('./routes/ticketroutes');
const adminRoutes = require('./routes/adminroutes');

app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
