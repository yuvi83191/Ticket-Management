const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'No token provided' })

  try {
    const decoded = jwt.verify(token, 'your_secret_key')
    req.user = decoded
    next()
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' })
  }
}

module.exports = authenticate