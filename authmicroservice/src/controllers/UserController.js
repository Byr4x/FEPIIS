const bcrypt = require('bcrypt');
const User = require('../models/user');

const createUser = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        let user = await User.findOne({ $or: [{ username }, { email }] });
        if (user) {
            return res.status(400).json({ message: 'El username o email ya está en uso' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ username, email, password: hashedPassword, role });
        await user.save();

        res.status(201).json({ message: 'Usuario registrado exitosamente', user  });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error al registrar usuario' });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { password, role } = req.body;

    try {
        let user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        user.role = role;
        await user.save();

        res.json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error al actualizar usuario' });
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error al obtener usuario por ID' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ active: true });
        res.json(users);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error al obtener todos los usuarios' });
    }
};

const disableUser = async (req, res) => {
    const { id } = req.params;

    try {   
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        user.active = false;
        await user.save();

        res.json({ message: 'Usuario inhabilitado correctamente' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error al inhabilitar usuario' });
    }
};

module.exports = {
    createUser,
    updateUser,
    getUserById,
    getAllUsers,
    disableUser,
};