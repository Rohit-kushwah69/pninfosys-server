const express = require('express');
const route = express.Router();
const Technologycontroller = require('../controller/Teachnologycontroller')
const Portfoliocontroller = require('../controller/Portfoliocontroller')
const Eventcontroller = require('../controller/Eventcontroller')
const Teamcontroller = require('../controller/Teamcontroller')
const Placecontroller = require('../controller/Placecontroller');
const Contactcontroller = require('../controller/Contactcontroller');

//adminController
const AdminController = require('../controller/AdminController');


//Admin
route.post('/register', AdminController.adminRegistration)
route.get('/login', AdminController.adminLogin)
route.get('/changePassword', AdminController.changePassword)
route.put('/updateProfile', AdminController.updateProfile)

//Technology
route.post('/techinsert', Technologycontroller.techinsert)
route.get('/techdisplay', Technologycontroller.techdisplay)
route.get('/techview:_id', Technologycontroller.techview)
route.get('/techdelete/:_id', Technologycontroller.techdelete)
route.post('/techupdate/:_id', Technologycontroller.techupdate)

//portfolio
route.post('/portfolioinsert', Portfoliocontroller.portfolioinsert)
route.get('/portfoliodisplay', Portfoliocontroller.portfoliodisplay)
route.get('/portfolioview:_id', Portfoliocontroller.portfolioview)
route.get('/portfoliodelete/:_id', Portfoliocontroller.portfoliodelete)
route.post('/portfolioupdate/:_id', Portfoliocontroller.portfoliodelete)

//events
route.post('/eventinsert', Eventcontroller.eventinsert)
route.get('/eventsdisplay', Eventcontroller.eventsdisplay)
route.get('/eventview:_id', Eventcontroller.eventview)
route.get('/eventdelete/:_id', Eventcontroller.eventdelete)
route.post('/eventupdate/:_id', Eventcontroller.eventupdate)
//about 

//team
route.post('/teaminsert', Teamcontroller.teaminsert)
route.get('/teamdisplay', Teamcontroller.teamdisplay)
route.get('/teamview/:_id', Teamcontroller.teamview)
route.get('/teamdelete/:_id', Teamcontroller.teamdelete)
route.post('/teamupdate/:_id', Teamcontroller.teamupdate)
//placement desk

//place
route.post('/placeinsert', Placecontroller.placeinsert)
route.get('/placedisplay', Placecontroller.placedisplay)
route.get('/placeview:_id', Placecontroller.placeview)
route.get('/placedelete/:_id', Placecontroller.placedelete)
route.post('/placeupdate/:_id', Placecontroller.placeupdate)
//contactpage

route.post('/contactinsert', Contactcontroller.contactinsert)
route.get('/contactdisplay', Contactcontroller.contactdisplay)
route.get('/contactview:_id', Contactcontroller.contactview)
route.get('/contactdelete/:_id', Contactcontroller.contactdelete)
route.post('/contactupdate/:_id', Contactcontroller.contactupdate)







module.exports = route