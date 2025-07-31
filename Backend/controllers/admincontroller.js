const User = require('../models/usermodel')

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password')
    res.json(users)
  } catch (err) {
    next(err)
  }
}

exports.changeUserRole = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ message: 'Not found' })

    user.role = req.body.role
    await user.save()
    res.json(user)
  } catch (err) {
    next(err)
  }
}

exports.changeUserStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ message: 'Not found' })

    user.isActive = req.body.isActive
    await user.save()
    res.json(user)
  } catch (err) {
    next(err)
  }
}
const User = require('../models/user.model')

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password')
    res.json(users)
  } catch (err) {
    next(err)
  }
}

exports.changeUserRole = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ message: 'Not found' })

    user.role = req.body.role
    await user.save()
    res.json(user)
  } catch (err) {
    next(err)
  }
}

exports.changeUserStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ message: 'Not found' })

    user.isActive = req.body.isActive
    await user.save()
    res.json(user)
  } catch (err) {
    next(err)
  }
}