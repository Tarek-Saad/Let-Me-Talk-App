const express = require('express');
const cors = require('cors');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
require('dotenv').config();
require('./conn/connection')();

// Routes imports
const userRoutes = require('./routes/userRoutes');
// Route test
app.get('/', (req, res) => {
    res.send('Hello World');
});
// Routes main
app.use('/api/v1/auth', userRoutes);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});