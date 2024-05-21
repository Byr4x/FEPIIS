const Permission = require('../models/permission');

const createPermission = async (req, res) => {
    const { name, description } = req.body;

    try {
        const existingPermission = await Permission.findOne({ name });
        if (existingPermission) {
            return res.status(400).json({ message: 'El permiso ya existe' });
        }

        const permission = new Permission({ name, description });
        await permission.save();

        res.status(201).json({ message: 'Permiso creado correctamente', permission });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error al crear permiso' });
    }
};

const getAllPermissions = async (req, res) => {
    try {
        const permissions = await Permission.find();
        res.json(permissions);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error al obtener todos los permisos' });
    }
};

const getPermissionById = async (req, res) => {
    const { id } = req.params;

    try {
        const permission = await Permission.findById(id);
        if (!permission) {
            return res.status(404).json({ message: 'Permiso no encontrado' });
        }

        res.json(permission);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error al obtener permiso por ID' });
    }
};

const updatePermission = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
        const existingPermission = await Permission.findOne({ name });
        if (existingPermission && existingPermission._id.toString() !== id) {
            return res.status(400).json({ message: 'El nombre del permiso ya está en uso' });
        }

        const permission = await Permission.findByIdAndUpdate(id, { name, description }, { new: true });
        if (!permission) {
            return res.status(404).json({ message: 'Permiso no encontrado' });
        }

        res.json({ message: 'Permiso actualizado correctamente', permission });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error al actualizar permiso' });
    }
};

const disablePermission = async (req, res) => {
    const { id } = req.params;

    try {
        const permission = await Permission.findByIdAndUpdate(id, { active: false }, { new: true });
        if (!permission) {
            return res.status(404).json({ message: 'Permiso no encontrado' });
        }

        res.json({ message: 'Permiso inhabilitado correctamente', permission });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error al inhabilitar permiso' });
    }
};

module.exports = {
    createPermission,
    getAllPermissions,
    getPermissionById,
    updatePermission,
    disablePermission,
};