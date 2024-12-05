const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' })
  }

  // Manejo genérico para otros errores
  response.status(500).json({ error: 'Something went wrong' })

  next(error) // Pasa el error al middleware de manejo de errores predeterminado si es necesario
}

module.exports = errorHandler
