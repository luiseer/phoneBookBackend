const express = require('express')
const app = express()
const cors = require('cors')
const Person = require('./models/person.js')
const errorHandler = require('./middlewares/errorHandler.js')

require('dotenv').config()
app.use(express.json())
app.use(express.static('dist'))
app.use(cors())



app.get('/api/persons', (req, res) =>{
    Person.find({}).then(persons => {
      res.json(persons)
    }).catch(error => {
      res.status(500).json({ error: error.message })
    })
})

app.get('/api/info', (req, res) =>{
    const reqTime = new Date()
    res.send(`
        <p>Phone book has info for ${persons.length} people<p/>
        <p>${reqTime}<p/>
        `)
})

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id)
    .then(p => {
      res.json(p)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) =>{
    Person.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatePerson => {
      res.json(updatePerson)
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'name or number missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(savedPerson => {
      res.json(savedPerson)
    })
    .catch(error => next(error))
})

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server runnign on port ${PORT}`)
})