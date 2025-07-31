const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('./config/db')

connectDB()

const app = express()
const authRoutes = require('./routes/authroutes')
const ticketRoutes = require('./routes/ticketroutes')
const adminRoutes = require('./routes/adminroutes')

app.use('/api/auth', authRoutes)
app.use('/api/tickets', ticketRoutes)
app.use('/api/admin', adminRoutes)


dotenv.config();


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});