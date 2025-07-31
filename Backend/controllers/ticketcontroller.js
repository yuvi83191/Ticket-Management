const Ticket = require('../models/ticketmodel')

exports.createTicket = async (req, res, next) => {
  try {
    const ticket = await Ticket.create({
      ...req.body,
      createdBy: req.user._id
    })
    res.status(201).json(ticket)
  } catch (err) {
    next(err)
  }
}

exports.getMyTickets = async (req, res, next) => {
  try {
    const tickets = await Ticket.find({ createdBy: req.user._id })
    res.json(tickets)
  } catch (err) {
    next(err)
  }
}

exports.getAllTickets = async (req, res, next) => {
  try {
    const { search, priority, page = 1, limit = 10 } = req.query
    const query = {
      ...(search && { status: new RegExp(search, 'i') }),
      ...(priority && { priority })
    }

    const tickets = await Ticket.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate('createdBy assignedTo', 'name email')

    res.json(tickets)
  } catch (err) {
    next(err)
  }
}

exports.getSingleTicket = async (req, res, next) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
    if (!ticket) return res.status(404).json({ message: 'Not found' })

    if (ticket.createdBy.toString() !== req.user._id.toString() &&
        req.user.role === 'user') {
      return res.status(403).json({ message: 'Access denied' })
    }

    res.json(ticket)
  } catch (err) {
    next(err)
  }
}

exports.updateTicket = async (req, res, next) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
    if (!ticket) return res.status(404).json({ message: 'Not found' })

    if (ticket.createdBy.toString() !== req.user._id.toString() &&
        req.user.role === 'user') {
      return res.status(403).json({ message: 'Access denied' })
    }

    Object.assign(ticket, req.body)
    await ticket.save()
    res.json(ticket)
  } catch (err) {
    next(err)
  }
}

exports.deleteTicket = async (req, res, next) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
    if (!ticket) return res.status(404).json({ message: 'Not found' })

    if (ticket.createdBy.toString() !== req.user._id.toString() &&
        req.user.role === 'user') {
      return res.status(403).json({ message: 'Access denied' })
    }

    await ticket.deleteOne()
    res.json({ message: 'Deleted successfully' })
  } catch (err) {
    next(err)
  }
}