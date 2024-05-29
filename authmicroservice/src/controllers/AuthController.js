const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const register = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json(['El username ya está en uso']);
        }
        user = await User.findOne({ email });
        if (user) {
            return res.status(400).json(['El email ya está en uso']);
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        user = new User({ username, email, password: hashedPassword, role });
        await user.save();  

        res.status(201).json(['Usuario registrado exitosamente', user ]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json(['Error al registrar usuario']);
    }
};

const login = async (req, res) => {
    const { usernameOrEmail, password } = req.body;
    const user = await User.findOne({
        $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });

    if (!user) {
        return res.status(401).json(['Credenciales inválidas']);
    }

    if (!user.active) {
        return res.status(401).json(['Usuario inactivo']);
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json(['Credenciales inválidas']);
    }

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });

    // Set the token as a cookie
    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 8 * 60 * 60 * 1000,
        //secure: process.env.NODE_ENV === 'production', // Solo en entorno de producción
        sameSite: 'strict'
    });

    res.json({ message: 'Inicio de sesión exitoso' });
};

const logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });

    res.json({ message: 'Sesión cerrada exitosamente' });
};

module.exports = { register, login, logout };