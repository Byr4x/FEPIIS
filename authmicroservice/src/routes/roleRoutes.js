const express = require('express');
const router = express.Router();
const RoleController = require('../controllers/roleController');
const { authenticateToken, authorizeAdmin } = require('../middlewares/auth');

router.post('/create', RoleController.createRole);
router.put('/:id', RoleController.updateRole);
router.get('/:id', RoleController.getRoleById);
router.get('/', RoleController.getAllRoles);
router.patch('/:id/toggle', RoleController.toggleRoleStatus);
router.delete('/:id', RoleController.deleteRole);

module.exports = router;