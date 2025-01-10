const mongoose = require('mongoose')
var express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
const Yaml = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = Yaml.load("./docs/api.yaml");
const dotenv = require("dotenv");
dotenv.config();
const config = require("./config/config")
var userRoute = require("./routes/userRoute");
var carRoute = require("./routes/carRoute");

mongoose.connect('mongodb://localhost:27017/vintageCarsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

var app = express();
app.use('/carImages', express.static('carImages'));
app.use('/sliderImages', express.static('sliderImages'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors({origin: '*'}));
// app.use(cors({origin: 'http://localhost:4200'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/cars', carRoute);
app.use('/user', userRoute);

app.set("port", config.port);
app.listen(app.get("port"), () =>
console.log(`App started on port ${app.get("port")}`)
);