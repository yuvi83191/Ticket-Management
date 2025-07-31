const express = require('express')
const router = express.Router()
const ticketController = require('../controllers/ticketcontroller')
const { authenticate } = require('../middleware/authmiddleware')

router.post('/', authenticate, ticketController.createTicket)
router.get('/my', authenticate, ticketController.getMyTickets)
router.get('/', authenticate, ticketController.getAllTickets)
router.get('/:id', authenticate, ticketController.getSingleTicket)
router.put('/:id', authenticate, ticketController.updateTicket)
router.delete('/:id', authenticate, ticketController.deleteTicket)

module.exports = router