const Car = require("../model/carModel.js");
const Slider = require("../model/sliderModel.js");
const commonUtils = require('../utils/commonUtils');

// This function is used to register car information.
exports.registerCarInfo = async function (req, res) {
	if (req.files && req.files.length > 0 && await commonUtils.isAdmin(req.decoded.userId)) {
		let fileNames = []
		req.files.forEach((file) => {
          fileNames.push(file.path);
        });
		var carInfo = new Car({
			name: req.body.name,
		    model: req.body.model,
		    price: req.body.price,
		    brand: req.body.brand,
		    color: req.body.color,
		    image: fileNames,
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

// This function is used to getting a car info list with and without a filter.
exports.getCarsInfo = async function (req, res) {
	const { brand } = req.query;
	// Build the filter object dynamically
	const filter = brand ? { brand } : {};
	Car.find(filter).then((result) => {
		let carsList = []
		for (let i = 0; i < result.length; i++) {
			carsList.push({
				id: result[i]._id,
				name: result[i].name,
				model: result[i].model,
				price: result[i].price,
				brand: result[i].brand,
				color: result[i].color,
				image: result[i].image,
				createdAt: result[i].createdAt,
			})
		}
		res.status(200).json({
			status:true,
			message:"Successfully retrieved the users list",
			cars: carsList,
		})
	}).catch((error) => {
		return res.status(500).json({
			status:false,
			message:"An error occurred while getting the cars info list.",
		})
	})
}
// This function is used to get a sliders info list.
exports.getSlidersInfo = async function (req, res) {
	Slider.find().then((result) => {
		let slidersList = []
		for (let i = 0; i < result.length; i++) {
			slidersList.push({
				id: result[i]._id,
				image: result[i].image,
				position: result[i].position,
				createdAt: result[i].createdAt,
			})
		}
		res.status(200).json({
			status:true,
			message:"Successfully retrieved the sliders list",
			slides: slidersList,
		})
	}).catch((error) => {
		return res.status(500).json({
			status:false,
			message:"An error occurred while getting the sliders info list.",
		})
	})
}
// This function is used to delete a slider's info..
exports.deleteSliderInfo = async function (req, res) {
	if (await commonUtils.isAdmin(req.decoded.userId)) {
		Slider.deleteOne({ _id: req.body.id }).then((result) => {
			res.status(200).json({
				status:true,
				message: `${result.deletedCount} Slider info is deleted successfully.`,
			})
		}).catch((error) => {
			return res.status(500).json({
				status:false,
				message:"An error occurred while deleting the slider info.",
			})
		})
	}
}
// This function is used to delete a car's info..
exports.deleteCarInfo = async function (req, res) {
	if (await commonUtils.isAdmin(req.decoded.userId)) {
		Car.deleteOne({ _id: req.body.id }).then((result) => {
			res.status(200).json({
				status:true,
				message: `${result.deletedCount} Car info is deleted successfully.`,
			})
		}).catch((error) => {
			return res.status(500).json({
				status:false,
				message:"An error occurred while deleting the car info.",
			})
		})
	}
}