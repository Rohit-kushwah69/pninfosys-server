const express = require('express');
const route = express.Router();

//adminController
const AdminController = require('../controller/AdminController');
const TechnologyController = require('../controller/TeachnologyController')
const PortfolioController = require('../controller/PortfolioController')
const EventController = require('../controller/EventController')
const TeamController = require('../controller/TeamController')
const PlaceController = require('../controller/PlaceController');
const ContactController = require('../controller/ContactController');




//Admin
route.post('/register', AdminController.adminRegistration)
route.get('/login', AdminController.adminLogin)
route.get('/changePassword', AdminController.changePassword)
route.put('/updateProfile', AdminController.updateProfile)

//Technology
route.post('/techinsert', TechnologyController.techinsert)
route.get('/techdisplay', TechnologyController.techdisplay)
route.get('/techview:_id', TechnologyController.techview)
route.get('/techdelete/:_id', TechnologyController.techdelete)
route.post('/techupdate/:_id', TechnologyController.techupdate)

//portfolio
route.post('/portfolioinsert', PortfolioController.portfolioinsert)
route.get('/portfoliodisplay', PortfolioController.portfoliodisplay)
route.get('/portfolioview:_id', PortfolioController.portfolioview)
route.get('/portfoliodelete/:_id', PortfolioController.portfoliodelete)
route.post('/portfolioupdate/:_id', PortfolioController.portfoliodelete)

//events
route.post('/eventinsert', EventController.eventinsert)
route.get('/eventsdisplay', EventController.eventsdisplay)
route.get('/eventview:_id', EventController.eventview)
route.get('/eventdelete/:_id', EventController.eventdelete)
route.post('/eventupdate/:_id', EventController.eventupdate)
//about 

//team
route.post('/teaminsert', TeamController.teaminsert)
route.get('/teamdisplay', TeamController.teamdisplay)
route.get('/teamview/:_id', TeamController.teamview)
route.get('/teamdelete/:_id', TeamController.teamdelete)
route.post('/teamupdate/:_id', TeamController.teamupdate)
//placement desk

//place
route.post('/placeinsert', PlaceController.placeinsert)
route.get('/placedisplay', PlaceController.placedisplay)
route.get('/placeview:_id', PlaceController.placeview)
route.get('/placedelete/:_id', PlaceController.placedelete)
route.post('/placeupdate/:_id', PlaceController.placeupdate)
//contactpage

route.post('/contactinsert', ContactController.contactinsert)
route.get('/contactdisplay', ContactController.contactdisplay)
route.get('/contactview:_id', ContactController.contactview)
route.get('/contactdelete/:_id', ContactController.contactdelete)
route.post('/contactupdate/:_id', ContactController.contactupdate)







module.exports = route