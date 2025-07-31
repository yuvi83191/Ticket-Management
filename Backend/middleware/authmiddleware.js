const jwt = require('jsonwebtoken')
const  verifyToken  = require('../utils/jwtutils')


const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'No token provided' })

 
  try {
    const user = verifyToken(token)
    req.user = user
    next()
  } catch (err) {
    return res.status(403).json({ message: 'Token invalid' })
  }

}

module.exports = authenticate