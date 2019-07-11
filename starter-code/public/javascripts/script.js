document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

  function getAllTheCelebritiesAndPutThemOnThePage(){

    let list = document.getElementById('celebrity-list');//div ID in the hbs

    axios.get('http://localhost:3000/celebritiesCreate')//api datadb not our local one got it?
    .then((response)=>{

      // console.log(response);

      let arrayOfStuff = response.data.reverse();//to reverse it .reverse() here
      list.innerHTML = "";

      arrayOfStuff.forEach((theCelebrity)=>{
        let newDiv = document.createElement('div');

        newDiv.innerHTML = `
          <h4> ${theCelebrity.name} </h4>
          <h6> ${theCelebrity.occupation} </h6>
          <h6> ${theCelebrity.catchPhrase} </h6>
        `
        list.appendChild(newDiv);
      })
    })
    .catch((err)=>{
      console.log(err); 
    })

  }

  // setInterval can be used rather than setTimeout not sure 
  // what's the difference yet. Ask nick hehehe
  setTimeout(getAllTheCelebritiesAndPutThemOnThePage,3000)



  let celebrityButton = document.getElementById('new-celebrity-button');

  celebrityButton.onclick = () => {

    let name = document.getElementById('name');
    let occupation = document.getElementById('occupation');
    let catchPhrase = document.getElementById('catch-phrase');


    axios.post('http://localhost:3000/celebritiesCreate', {name: name.value, occupation: occupation.value, catchPhrase: catchPhrase.value})
    .then((res)=>{
      getAllTheCelebritiesAndPutThemOnThePage(); //function we wrote above called getAllTheCelebritiesAndPutThemOnThePage
    })
    .catch((err)=>{
      console.log(err);
    })

    name.value = "";
    occupation.value = "";
    catchPhrase.value = "";


  }







}, false);
