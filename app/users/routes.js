const router = require('express').Router();
const multer = require('multer');
const userController = require('./controller');

router.post('/login', multer().none(), userController.login);
router.post('/register', multer().none(), userController.register);

module.exports = router;