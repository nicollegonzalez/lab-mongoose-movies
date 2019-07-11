const express = require('express');
const router  = express.Router();
const Celebrity  = require('../models/Celebrity');


router.get('/celebritiesCreatePage', (req,res,next)=>{
  res.render('celebrity-views/celebritiesPage');
})

router.get('/celebritiesCreate', (req,res,next)=>{
 
  Celebrity.find()
  .then((listOfCelebrities)=>{

    // res.render('animal-list', 
    // {theAnimals: listOfAnimals})
    // normally we res render a page and pass in the list of animals 
    // or whatever it is that we wrre getting from the DB
    // when were making an API, we res.json instead and just 
    // send the pure info
    res.json(listOfCelebrities)
    //^^^^here is where we created out API yay res.json =]
  })
  .catch((err)=>{
    next(err);
  })
})


  // name: String,
  // occupation: String,
  // catchPhrase: String



router.post('/celebritiesCreate',(req,res,next)=>{

  let name = req.body.name;
  let occupation = req.body.occupation;
  let catchPhrase = req.body.catchPhrase;

  Celebrity.create({
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase,
  })
  .then((response)=>{
    res.json({message: "Successfully Created Celebrity"})
  })
  .catch((err)=>{
    res.json(err);
  })
})


module.exports = router;