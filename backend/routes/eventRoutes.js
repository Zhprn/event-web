const express = require('express')
const router = express.Router();
const eventController = require('../controllers/eventController.js')

router.post('/addEvent', eventController.addEvent);

module.exports = router;