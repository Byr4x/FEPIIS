const express = require('express');
const router = express.Router();
const RoleController = require('../controllers/roleController');
const { authenticateToken, authorizeAdmin } = require('../middlewares/auth');

router.post('/create', authenticateToken, authorizeAdmin, RoleController.createRole);
router.put('/:id', authenticateToken, authorizeAdmin, RoleController.updateRole);
router.get('/:id', authenticateToken, authorizeAdmin, RoleController.getRoleById);
router.get('/', authenticateToken, authorizeAdmin, RoleController.getAllRoles);
router.delete('/:id', authenticateToken, authorizeAdmin, RoleController.disableRole);

module.exports = router;