const express = require('express');
const router = express.Router();
const PermissionController = require('../controllers/permissionController');
const { authenticateToken, authorizeAdmin } = require('../middlewares/auth');

router.post('/create', authenticateToken, authorizeAdmin, PermissionController.createPermission);
router.put('/:id', authenticateToken, authorizeAdmin, PermissionController.updatePermission);
router.get('/:id', authenticateToken, authorizeAdmin, PermissionController.getPermissionById);
router.get('/', authenticateToken, authorizeAdmin, PermissionController.getAllPermissions);
router.delete('/:id', authenticateToken, authorizeAdmin, PermissionController.disablePermission);

module.exports = router;