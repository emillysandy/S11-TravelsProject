const express = require("express");
const router = express.Router();

const travelsController = require("../controllers/travelsControllers");
const passengersController = require("../controllers/passengersControllers");

// VIAGENS
router.get("/travels/", travelsController.getAllTravels); 
router.get("/travels/:id", travelsController.getTravelById);

router.post("/travels/:id/passenger/create", passengersController.createPassenger);

// PASSAGEIROS

router.get("/passengers", passengersController.getAllPassengers);

router.delete("/passengers/:id", passengersController.deletePassenger);

router.put("/passengers/:id", passengersController.replacePassenger);

router.patch("/passenger/updateName/:id", passengersController.updateName);

// EM CASA

router.delete("/travels/:id/delete", travelsController.deleteTravel);

router.post("/travels/:id/driver/create", travelsController.createDriver);

router.put("/travels/:id", travelsController.replaceDriver);




module.exports = router;