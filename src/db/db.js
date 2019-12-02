const mongoose = require('mongoose')
const connectionURL = 'mongodb+srv://admin:admin@marcelacluster-qiczh.mongodb.net/ProyectoFinalWeb?retryWrites=true&w=majority'

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true,  
  useUnifiedTopology: true,
  useFindAndModify: false
})