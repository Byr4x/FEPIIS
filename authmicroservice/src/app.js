require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const pkg = require('../package.json');

connectDB();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');
const permissionRoutes = require('./routes/permissionRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

app.set('pkg', pkg);

// Ruta principal
app.get('/', (req, res) => {
  res.json({
    name: app.get('pkg').name,
    description: app.get('pkg').description,
    version: app.get('pkg').version,
    author: app.get('pkg').author
  });
});

// Rutas
app.use('/fepi/auth', authRoutes);
app.use('/fepi/users', userRoutes);
app.use('/fepi/users/roles', roleRoutes);
app.use('/fepi/users/roles/permissions', permissionRoutes);

module.exports = app;