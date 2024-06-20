const Role = require('../models/role');
const Permission = require('../models/permission');

const createRole = async (req, res) => {
    const { name, permissions } = req.body;

    try {
        const existingRole = await Role.findOne({ name });
        if (existingRole) {
            return res.status(400).json({ message: 'El rol ya existe' });
        }

        const role = new Role({ name, permissions });
        await role.save();

        res.status(201).json({ message: 'Rol creado correctamente', role });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error al crear rol' });
    }
};

const getAllRoles = async (req, res) => {
    try {
        const roles = await Role.find().populate('permissions');
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
        if (existingRole && existingRole._id.toString() !== id) {
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

const toggleRoleStatus = async (req, res) => {
    const { id } = req.params;
    const { active } = req.body;

    try {
        const role = await Role.findByIdAndUpdate(id, { active }, { new: true });
        if (!role) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }

        res.json({ message: `Rol ${active ? 'habilitado' : 'inhabilitado'} correctamente`, role });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: `Error al ${active ? 'habilitar' : 'inhabilitar'} rol` });
    }
};

const deleteRole = async (req, res) => {
    const { id } = req.params;

    try {
        const role = await Role.findByIdAndDelete(id);
        if (!role) {
            return res.status(404).json({ message: 'Rol no encontrado' });
        }

        res.json({ message: 'Rol eliminado correctamente' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error al eliminar rol' });
    }
};

module.exports = {
    createRole,
    getAllRoles,
    getRoleById,
    updateRole,
    toggleRoleStatus,
    deleteRole,
};
