const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const errorMiddleware = require('./middleware/error');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'BaiTorng API is running' });
});

// Feature Routes (Placeholder)
// app.use('/api/auth', require('./features/auth/auth.route'));
// app.use('/api/users', require('./features/user/user.route'));
// app.use('/api/products', require('./features/product/product.route'));
// app.use('/api/demands', require('./features/demand/demand.route'));
// app.use('/api/matches', require('./features/match/match.route'));
// app.use('/api/comments', require('./features/comment/comment.route'));
// app.use('/api/follows', require('./features/follow/follow.route'));

// Error handling
app.use(errorMiddleware);

module.exports = app;
