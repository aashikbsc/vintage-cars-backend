var express = require('Express');
var router = express.Router();
var validation = require('../middleWare/validation')
var authValidation = require('../middleWare/authValidation')
var controller = require('../controller/userController')

router.post('/generate-otp', validation.generateOTPValidation, controller.generateOTP);
router.post('/register', validation.signUpValidation, controller.signUp);
router.post('/login', validation.loginValidation, controller.signIn);
router.get('/list', authValidation, controller.listUsers);
router.post('/delete', authValidation, validation.deleteUserInfoValidation, controller.deleteUsers);
router.put('/update-user-info', authValidation, validation.updateUserInfoValidation, controller.updateUserInfo);
router.put('/update-contact', authValidation, validation.updateContactInfoValidation, controller.updateContactInfo);
module.exports = router