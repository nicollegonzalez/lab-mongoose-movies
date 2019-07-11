const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/Celebrity');
// const Movie = require('../models/Movie');


router.get('/celebrities', (req, res, next)=>{

  Celebrity.find()
  .then((allTheCelebrities)=>{
    res.render('celebrity-views/celebrities',{allTheCelebrities:
      allTheCelebrities})
  })
  .catch((err)=>{
    next(err);
  })
  
})

router.get('/celebrities/details/:id', (req,res,next)=>{

  let theId = req.params.id;
  Celebrity.findById(theId)
  .then((oneSingleCelebrity)=>{
    console.log(oneSingleCelebrity);
    res.render('celebrity-views/celebrityDetails', {theCelebrity: 
      oneSingleCelebrity})
  })
  .catch((err)=>{
    next(err);
  })
})

/*Get new route */
router.get('/celebrities/new',(req,res,next)=>{
  res.render('celebrity-views/newCelebrity')
})

/*post new celebrity */
router.post('/celebrities/create-new-celebrity',(req,res,next)=>{
  const {theName, theOccupation, theCatchPhrase} = req.body;
  // this is like saying
    // const title = req.body.title;
    // const descrtiption = req.body.descrition;
    // etc.
  let newCelebrity = {name: theName, occupation: theOccupation, catchPhrase: theCatchPhrase}
  
  Celebrity.create(newCelebrity)
  .then(()=>{
    res.redirect('/celebrities')
  })
  .catch((err)=>{
    next(err);
  })
})

/*Delete Celebrity */
router.post('/celebrities/delete/:id', (req, res, next)=>{

  Celebrity.findByIdAndRemove(req.params.id)
  .then(()=>{
      res.redirect('/celebrities');
  })
  .catch((err)=>{
      next(err);
  })
});


/*Edit Celebrity*/
router.get('/celebrities/edit/:id', (req, res, next)=>{
  Celebrity.findById(req.params.id)
  .then((celebrityFromDb)=>{
          res.render('celebrity-views/editCelebrity', {celebrity: celebrityFromDb})
  })
  .catch((err)=>{
      next(err);
  })
})

router.post('/celebrities/update/:celebrityID', (req, res, next)=>{
  let theID = req.params.celebrityID;
  Celebrity.findByIdAndUpdate(theID, req.body)
  .then((celebrity)=>{
    console.log("It worked")
    console.log(theID)
    // console.log("KJHKJHKJHLKJHLKJHKLJHLKHKLJH")
    console.log(req.body)
      res.redirect('/celebrities/details/'+theID)
  })
  .catch((err)=>{
    console.log("didnt work :(")
      next(err);
  })
})




module.exports = router;
