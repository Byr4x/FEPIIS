const Permission = require('../models/permission');
const Role = require('../models/role');

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
    const { name, description, active } = req.body;

    try {
        const existingPermission = await Permission.findOne({ name });
        if (existingPermission && existingPermission._id.toString() !== id) {
            return res.status(400).json({ message: 'El permiso ya existe' });
        }

        const permission = await Permission.findByIdAndUpdate(id, { name, description, active }, { new: true });
        if (!permission) {
            return res.status(404).json({ message: 'Permiso no encontrado' });
        }

        res.json({ message: 'Permiso actualizado correctamente', permission });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error al actualizar permiso' });
    }
};

const togglePermissionStatus = async (req, res) => {
    const { id } = req.params;
    const { active } = req.body;

    try {
        const permission = await Permission.findByIdAndUpdate(id, { active }, { new: true });
        if (!permission) {
            return res.status(404).json({ message: 'Permiso no encontrado' });
        }

        res.json({ message: `Permiso ${active ? 'habilitado' : 'inhabilitado'} correctamente`, permission });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: `Error al ${active ? 'habilitar' : 'inhabilitar'} permiso` });
    }
};

const deletePermission = async (req, res) => {
    const { id } = req.params;

    try {
        const rolesWithPermission = await Role.find({ permissions: id });
        if (rolesWithPermission.length > 0) {
            return res.status(400).json({ message: 'No se puede eliminar el permiso porque está asignado a uno o más roles' });
        }

        const permission = await Permission.findByIdAndDelete(id);
        if (!permission) {
            return res.status(404).json({ message: 'Permiso no encontrado' });
        }

        res.json({ message: 'Permiso eliminado correctamente' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error al eliminar permiso' });
    }
};

module.exports = {
    createPermission,
    getAllPermissions,
    getPermissionById,
    updatePermission,
    togglePermissionStatus,
    deletePermission,
};
