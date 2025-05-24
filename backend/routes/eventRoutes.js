const express = require('express')
const router = express.Router();
const eventController = require('../controllers/eventController.js')

router.post('/addEvent', eventController.addEvent);
router.get('/getAllEvent', eventController.getallEvent);
router.get('/:id', eventController.getOneEvent)
router.delete('/:id', eventController.deleteEvent)
router.put('/:id', eventController.updateEvent)

module.exports = router;