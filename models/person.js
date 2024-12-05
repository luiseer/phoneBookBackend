const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

// Conectar a la base de datos
mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message)
  })

// Definición del esquema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    minlength: 8,
    required: true,
    validate: {
      validator: function (v) {
        return /\d{2,3}-\d{5,}/.test(v) // Ejemplo: "12-345678"
      },
      message: props => `${props.value} no es un número válido. Debe seguir el formato "12-345678".`
    }
  }
})

// Configuración del esquema para el formato JSON
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)