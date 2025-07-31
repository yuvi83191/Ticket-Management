const User = require('../models/usermodel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const generateToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  })
}

exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    const existingUser = await User.findOne({ email })
    if (existingUser) return res.status(400).json({ message: 'User already exists' })

    const user = await User.create({ name, email, password })
    const token = generateToken(user._id, user.role)
    res.status(201).json({ token })
  } catch (err) {
    next(err)
  }
}

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user || !user.isActive) return res.status(401).json({ message: 'Unauthorized' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' })

    const token = generateToken(user._id, user.role)
    res.json({ token })
  } catch (err) {
    next(err)
  }
}