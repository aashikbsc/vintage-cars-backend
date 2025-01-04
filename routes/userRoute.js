var express = require('Express');
var router = express.Router();
var validation = require('../middleWare/validation')
var controller = require('../controller/userController')

router.post('/register', validation.registerValidation, controller.signUp)
router.post('/verify-otp', validation.verifyOTPValidation, controller.verifyOTP)
router.post('/login', validation.loginValidation, controller.signIn)
module.exports = router