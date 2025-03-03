const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan'); 
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();


connectDB();


const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');
const dietChartRoutes = require('./routes/dietChartRoutes');
const deliveryRoutes = require('./routes/deliveryRoutes');
const pantryRoutes = require('./routes/pantryRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/diet-charts', dietChartRoutes);
app.use('/api/deliveries', deliveryRoutes);
app.use('/api/pantry', pantryRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => 
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);