require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');

const app = express();
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connection Established Successfully'))
  .catch((err) => console.log("Error occurred", err));

app.use(cors());
app.use(bodyParser.json());

app.use('/api/products', productRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server is running");
});
