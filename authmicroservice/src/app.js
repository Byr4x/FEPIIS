const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./db');
require('dotenv').config();
const pkg = require('../package.json');


const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');
const permissionRoutes = require('./routes/permissionRoutes');

const app = express();

app.use(morgan('dev'));
app.use(cors())
app.use(bodyParser.json());
app.use(cookieParser());

app.set('pkg', pkg);
app.get('/', (req, res) => {
    res.json({
        name: app.get('pkg').name,
        description: app.get('pkg').description,
        version: app.get('pkg').version,
        author: app.get('pkg').author
    });
});

app.use('/fepi/auth', authRoutes);
app.use('/fepi/users', userRoutes);
app.use('/fepi/users/roles', roleRoutes);
app.use('/fepi/users/roles/permissions', permissionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});