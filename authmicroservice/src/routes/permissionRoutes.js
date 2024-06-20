const express = require('express');
const router = express.Router();
const PermissionController = require('../controllers/permissionController');
const { authenticateToken, authorizeAdmin } = require('../middlewares/auth');

router.post('/create', PermissionController.createPermission);
router.put('/:id', PermissionController.updatePermission);
router.get('/:id', PermissionController.getPermissionById);
router.get('/', PermissionController.getAllPermissions);
router.patch('/:id/toggle', PermissionController.togglePermissionStatus);
router.delete('/:id', PermissionController.deletePermission);

module.exports = router;