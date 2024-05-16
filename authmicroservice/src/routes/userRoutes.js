const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authenticateToken, authorizeAdmin } = require('../middlewares/auth');

router.post('/create', UserController.createUser);
router.put('/:id', authenticateToken, authorizeAdmin, UserController.updateUser);
router.get('/:id', authenticateToken, authorizeAdmin, UserController.getUserById);
router.get('/', authenticateToken, authorizeAdmin, UserController.getAllUsers);
router.delete('/:id', authenticateToken, authorizeAdmin, UserController.disableUser);

module.exports = router;