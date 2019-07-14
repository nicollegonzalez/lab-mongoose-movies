const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/Celebrity');
const Movie = require('../models/Movie');


router.get('/movies', (req, res, next)=>{

  Movie.find().populate("staring")
  .then((allTheMovies)=>{
    console.log(allTheMovies);
    res.render('movie-views/movies',{allTheMovies:
      allTheMovies})
  })
  .catch((err)=>{
    next(err);
  })
  
})


router.get('/movies/details/:id', (req,res,next)=>{

  let theId = req.params.id;
  Movie.findById(theId).populate("staring")
  .then((oneSingleMovie)=>{
    console.log(oneSingleMovie);
    res.render('movie-views/movieDetails', {theMovie: 
      oneSingleMovie})
  })
  .catch((err)=>{
    next(err);
  })
})

/*Get new route */
router.get('/movies/new',(req,res,next)=>{

  Celebrity.find()
  .then((allTheCelebrities)=>{

    res.render('movie-views/newMovie', {allTheCelebrities:
      allTheCelebrities})
  })
  .catch((err)=>{
    next(err);
  })



})

/*post new movie */
router.post('/movies/create-new-movie',(req,res,next)=>{
  const {theTitle, theGenre, thePlot, theStar} = req.body;
  // this is like saying
    // const title = req.body.title;
    // const descrtiption = req.body.descrition;
    // etc.
  let newMovie = {title: theTitle, genre: theGenre, plot: thePlot, staring: theStar}
  
  Movie.create(newMovie)
  .then(()=>{
    res.redirect('/movies')
  })
  .catch((err)=>{
    next(err);
  })
})

/*Delete Movie */
router.post('/movies/delete/:id', (req, res, next)=>{

  Movie.findByIdAndRemove(req.params.id)
  .then(()=>{
      res.redirect('/movies');
  })
  .catch((err)=>{
      next(err);
  })
});


/*Edit Celebrity*/
router.get('/movies/edit/:id', (req, res, next)=>{
  Movie.findById(req.params.id)
  .then((movieFromDb)=>{
          res.render('movie-views/editMovie', {movie: movieFromDb})
  })
  .catch((err)=>{
      next(err);
  })
})

router.post('/movies/update/:movieID', (req, res, next)=>{
  let theID = req.params.movieID;
  Movie.findByIdAndUpdate(theID, req.body)
  .then((movie)=>{
      res.redirect('/movies/details/'+theID)
  })
  .catch((err)=>{
    console.log("didnt work :(")
      next(err);
  })
})




module.exports = router;
