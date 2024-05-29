const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Role = require('../models/role');

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Token de autorización no proporcionado' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Token inválido' });
        req.user = decoded.user;
        next();
    });
};

const authorizeAdmin = async (req, res, next) => {
    const user = await User.findById(req.user.id).populate('role');
    if (!user || !user.active) {
        return res.status(403).json({ message: 'Acceso no autorizado' });
    }

    const adminRole = await Role.findOne({ name: 'Admin' });
    if (!adminRole) {
        return res.status(403).json({ message: 'Rol de administrador no encontrado' });
    }

    if (!user.role || user.role._id.toString() !== adminRole._id.toString()) {
        return res.status(403).json({ message: 'Acceso no autorizado' });
    }

    next();
};

module.exports = { authenticateToken, authorizeAdmin };