const mongoose = require('mongoose')
const password = process.argv[2]

const url = `mongodb+srv://admin:${password}@cluster0.l43f4.mongodb.net/PhoneNumber?retryWrites=true&w=majority`

mongoose.connect(url)

const phoneNumberSchema = new mongoose.Schema({
  name: String,
  number: String,
})
const PhoneNumber = mongoose.model('PhoneNumber', phoneNumberSchema)


if (process.argv.length === 5) {
    const name = process.argv[3]
    const number = process.argv[4]
  
    const contact = new PhoneNumber({
      name: name,
      number: number,
    })
  
    contact.save().then(() => {
      console.log(`Added ${name} number ${number} to phonebook`)
      mongoose.connection.close() 
    })
  } else if (process.argv.length === 3) {
    PhoneNumber.find({}).then((result) => {
      console.log('Phonebook:')
      result.forEach((contact) => {
        console.log(`${contact.name} ${contact.number}`)
      })
      mongoose.connection.close()
    })
  } else {
    console.log('Usage: node mongo.js <password> [name number]')
    mongoose.connection.close()
  }