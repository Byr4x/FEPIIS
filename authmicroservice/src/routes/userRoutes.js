const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const { authenticateToken, authorizeAdmin } = require('../middlewares/auth');

router.post('/create', UserController.createUser);
router.put('/:id', UserController.updateUser);
router.get('/:id', UserController.getUserById);
router.get('/', UserController.getAllUsers);
router.delete('/:id', UserController.disableUser);

module.exports = router;