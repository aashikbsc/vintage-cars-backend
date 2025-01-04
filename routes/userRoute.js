var express = require('Express');
var router = express.Router();
var validation = require('../middleWare/validation')
var authValidation = require('../middleWare/authValidation')
var controller = require('../controller/userController')

router.post('/register', validation.registerValidation, controller.signUp);
router.post('/verify-otp', validation.verifyOTPValidation, controller.verifyOTP);
router.post('/login', validation.loginValidation, controller.signIn);
router.get('/list', authValidation, controller.listUsers);
router.delete('/delete', authValidation, controller.deleteUsers);
module.exports = router