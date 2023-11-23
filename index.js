const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost//vehicleDB',{useNewUrlPaser:true, useUnifiedTopology:true});

const vehicleSchema = new mongoose.Schema({
    make: String,
    model: String,
    year: Number,
    colour: String
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

app.get('vehicles', async(req, res) =>{
    try{
        const vehicles = await Vehicle.find()
        res.json(vehicles);
    }catch(error){
        res.json({message: error.message});
    }
});

app.post('/vehicles', async(req, res)=>{
    const vehicle = newVehile(req.body);
    try{
        const savedVehicle = await vehicle.save();
        res.json(savedVehicle);
    }catch(error){
        res.json({message:error.message});
    }
});

applisten(PORT, ()=>{
    console.log('Server is running on port ${PORT}');
});
