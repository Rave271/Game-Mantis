const express = require('express');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();
const gameRoutes = require('./routes/gameRoutes');
const connectDB = require('./config/db');

const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error('Database connection error:', error.message);
        res.status(500).json({ message: 'Database connection failed' });
    }
});

app.use('/api/games', gameRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use(express.static(path.join(__dirname, 'public')));
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

app.use('/api/users',userRoutes);

app.get('/' , (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT =  process.env.PORT || 5000;

if (require.main === module) {
    app.listen(PORT , ()=>{
        console.log(`Server running on port ${PORT}`)
    });
}

module.exports = app;
