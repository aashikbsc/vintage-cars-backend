const Car = require("../model/carModel.js");
const Slider = require("../model/sliderModel.js");
const commonUtils = require('../utils/commonUtils');

// This function is used to register car information.
exports.registerCarInfo = async function (req, res) {
	if (req.file && await commonUtils.isAdmin(req.decoded.userId)) {
		var carInfo = new Car({
			name: req.body.name,
		    model: req.body.model,
		    price: req.body.price,
		    brand: req.body.brand,
		    color: req.body.color,
		    image: req.file.path,
		});
		carInfo.save().then(async (result) => {
			res.status(200).json({
				status:true,
	        	message:"Successfully Registered",
	      	})
	    }).catch((error) => {
	      res.status(500).json({
	        status:false,
	        message:"An error occurred while registering car info.",
	      })
	    })	
	} else {
		res.status(400).json({
			status:false,
        	message: !req.file ? "Image data is required" : "Access denied",
        })
	}
}

// This function is used to store slider information.
exports.registerSliderInfo = async function (req, res) {
	if (req.file && await commonUtils.isAdmin(req.decoded.userId)) {
		Slider.findOne({ position: req.body.position }).then((result) => {
			if (result) {
				return res.status(400).json({
					status:false,
	        		message:"The position has already been registered. Please choose another position or delete the existing slide.",
	        	})
			}
			var sliderInfo = new Slider({
			    image: req.file.path,
				position: req.body.position,
			});
			sliderInfo.save().then(async (result) => {
				res.status(200).json({
					status:true,
		        	message:"Successfully Registered",
		      	})
		    }).catch((error) => {
		      res.status(500).json({
		        status:false,
		        message:"An error occurred while registering slider info.",
		      })
		    })
		}).catch((error) => {
			return res.status(500).json({
	        status:false,
	        message:"An error occurred while getting existing slider info.",
	      })
		})
	} else {
		res.status(400).json({
			status:false,
        	message: !req.file ? "Image data is required" : "Access denied",
        })
	}
}