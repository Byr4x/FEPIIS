const Role = require('../models/role');

const createRole = async (req, res) => {
    const { name, permissions, active } = req.body;

    try {
        const existingRole = await Role.findOne({ name });
        if (existingRole) {
            return res.status(400).json({ message: 'El rol ya existe' });
        }

        const role = new Role({ name, permissions, active });
        await role.save();

        res.status(201).json({ message: 'Rol creado correctamente', role });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error al crear rol' });
    }
};

const getAllRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.json(roles);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error al obtener todos los roles' });
    }
};

const getRoleById = async (req, res) => {
    const { id } = req.params;

    try {
        const role = await Role.findById(id);
        if (!role) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }

        res.json(role);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error al obtener rol por ID' });
    }
};

const updateRole = async (req, res) => {
    const { id } = req.params;
    const { name, permissions, active } = req.body;

    try {
        const existingRole = await Role.findOne({ name });
        if (existingRole && existingRole.id !== id) {
            return res.status(400).json({ message: 'El nombre del rol ya está en uso' });
        }

        const role = await Role.findByIdAndUpdate(id, { name, permissions, active }, { new: true });
        if (!role) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }

        res.json({ message: 'Rol actualizado correctamente', role });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error al actualizar rol' });
    }
};

const disableRole = async (req, res) => {
    const { id } = req.params;

    try {
        const role = await Role.findByIdAndUpdate(id, { active: false }, { new: true });
        if (!role) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }

        res.json({ message: 'Rol inhabilitado correctamente', role });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error al inhabilitar rol' });
    }
};

module.exports = {
    createRole,
    getAllRoles,
    getRoleById,
    updateRole,
    disableRole,
};
