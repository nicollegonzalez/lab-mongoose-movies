// bin/seeds.js

const mongoose = require('mongoose');
const  Celebrity = require('../models/Celebrity');
const  Movie = require('../models/Movie');

// const dbName = 'library-project';
// mongoose.connect(`mongodb://localhost/${dbName}`);
mongoose
  .connect('mongodb://localhost/lab-mongoose-movies', {useNewUrlParser: true})
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

const moviesArr = [
  {
    title: 'Hercules in New ',
    genre: 'Action',
    plot: 'Hercules is sent to Earth where he finds true love and starts a promising career in the bodybuilder business.'
  },
  {
    title: 'Hot Tub Time Machine 2',
    genre: 'Sci-fi/Comedy',
    plot: "Five years after the events of the first film, Lou Dorchen and Nick Webber have become rich and famous, with Lou becoming a multi-billionaire and Nick being a successful music singer. At Lou's celebratory party, Lou is shot in the groin. Jacob (Lou's son) and Nick drag him to the hot tub time machine and activate it to travel back in time to find and stop the killer. When they awaken they find themselves ten years in the future, where Jacob is in charge of Lou's mansion. After determining that they are in an alternate timeline where Lou's killer is from this future, they go to their friend Adam Yates's home, only to meet his son Adam Yates Stedmeyer (Adam Jr.) who is engaged to a girl named Jill."
  },
  {
    title: 'Sharknado',
    genre: 'Action/Comedy',
    plot: "Nature's deadliest killer takes to the skies in the ultimate gill-ty pleasure as a group of friends try to save the Santa Monica coast from shark-infested tornadoes."
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

//pass the books array to this 
Movie.create(moviesArr)
.then(()=>{
  console.log('yay')
  mongoose.connection.close();
})
.catch(()=>{
  console.log('nooooo')
})