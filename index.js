const express = require('express')
// const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const app = express()

app.use(express.json())
app.use(express.static('dist'))
app.use(cors())
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
// morgan.token('body', (req) => {
//   return JSON.stringify(req.body)
// })

persons = 
[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) =>{
    res.json(persons)
})

app.get('/api/info', (req, res) =>{
    const requestTime = new Date()
    res.send(`
        <p>Phone book has info for ${persons.length} people<p/>
        <p>${requestTime}<p/>
        `)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find( p => p.id === id)

    if (!person) {
      res.status(404).end()
      } else {
        res.json(person)
    }
})

app.delete('/api/persons/:id', (req, res) =>{
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)
    res.status(204).end()
})

const generateId = (nmin, nmax) => Math.floor(Math.random() * (nmax - nmin) + nmin)

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'Number or name is missing'
    })
  }
  const personExists = persons.find(p => p.name === body.name)

  if (personExists) {
    return res.status(400).json({
      error: 'the person is already exits'
    })
  }

  const newPerson = {
    name: body.name,
    number: body.number,
    id: generateId(5, 500)
  }
  persons = persons.concat(newPerson)

  res.status(201).json(newPerson)
})



const PORT = process.env.PORT || 3001
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server runnign on port ${PORT}`)
})