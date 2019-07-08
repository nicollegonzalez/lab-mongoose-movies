// bin/seeds.js

const mongoose = require('mongoose');
const  Celebrity = require('../models/Celebrity');

// const dbName = 'library-project';
// mongoose.connect(`mongodb://localhost/${dbName}`);
mongoose
  .connect('mongodb://localhost/celebrities', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });


const celebritiesArr = [
  {
    name: 'Jennifer Aniston',
    occupation: 'Actor',
    catchPhrase: 'There are no regrets in life, just lessons.'
  },
  {
    name: 'Ellen DeGeneres',
    occupation: "Comedian",
    catchPhrase: 'Lets dance'
  },
  {
    name: "Rihanna",
    occupation: "Mogul",
    catchPhrase: "Better have my money" 
  }
]


//pass the books array to this 
Celebrity.create(celebritiesArr)
.then(()=>{
  console.log('yay')
  mongoose.connection.close();
})
.catch(()=>{
  console.log('nooooo')
})