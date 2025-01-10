var express = require('Express');
var router = express.Router();
var authValidation = require('../middleWare/authValidation')
var carModuleValidation = require('../middleWare/carModuleValidation')
var controller = require('../controller/carController')
var path = require('path');
var multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
    	let folderName = req.originalUrl === "/cars/register-car-info" ? "carImages" : "sliderImages"
        cb(null, folderName);
    },
    filename: (req,file,cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif" || file.mimetype == "video/mp4") {
            cb(null, true);
        } else {
            return cb(new Error('Only .png, and .jpg and .jpeg and .gif and .mp4 format allowed'));
        }
    },
    limits:{ fileSize: 3 * 1024 * 1024}
});
const imageData = upload.single("images")

router.post('/register-car-info', authValidation, imageData, carModuleValidation.carInfoValidation, controller.registerCarInfo);
router.post('/register-slider-info', authValidation, imageData, carModuleValidation.sliderInfoValidation, controller.registerSliderInfo);
router.get('/car-list', authValidation, controller.getCarsInfo);
router.get('/slider-list', authValidation, controller.getSlidersInfo);
router.delete('/delete-slider-info', authValidation, controller.deleteSliderInfo);
router.delete('/delete-car-info', authValidation, controller.deleteCarInfo);
module.exports = router