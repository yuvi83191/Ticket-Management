const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admincontroller')
const authorizeAdmin  = require('../middleware/authmiddleware')
const authenticate  = require('../middleware/authmiddleware')

router.get('/users', authenticate, authorizeAdmin, adminController.getAllUsers)
router.patch('/users/:id/role', authenticate, authorizeAdmin, adminController.changeUserRole)
router.patch('/users/:id/status', authenticate, authorizeAdmin, adminController.changeUserStatus)

module.exports = router