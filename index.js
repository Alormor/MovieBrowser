window.onload = ()=>{
  begin();
}

window.onscroll = () => {
  let closeToEnd = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
  searchType = 1;
  if(closeToEnd && firstSearchDone && !fetching) fetchProcess();
}

let sectionMovies, myDivMovies;
let pageCounter = 1;
let searchName = "";
let year = "";
let fetching = false;
let firstSearchDone = false;
let searchType = false;
let title = "";

let myDivSearch, myInput, myBtnSearch, myIcon, myBtnFilter;
let error, myDivMovieDetail;

function begin(){
  let mySearchPage = document.getElementById("search-page");
  let myLandingPage = document.getElementById("landing-page");
  let myBtnGoSearch = document.getElementById("go-SP");
  let myBtnGoLanding = document.getElementById("go-LP");

  myDivSearch = document.getElementById("search-container");

  myInput = document.getElementById("input-search");

  myBtnSearch = document.getElementById("btn-search");

  myInputYear = document.getElementById("input-year");

  mySectMovies = document.getElementById("sectMovies");

  myDivMovies = document.getElementById("divMovies");

  error = document.getElementById("error");

  myBtnGoSearch.addEventListener("click", (e) => {
    mySearchPage.style.visibility = "visible";
    myLandingPage.style.visibility = "hidden";
  });

  myBtnGoLanding.addEventListener("click", (e) => {
    mySearchPage.style.visibility = "hidden";
    myLandingPage.style.visibility = "visible";
    myInput.value = "";
    myInputYear.value = "";
    if(myDivMovies) myDivMovies.remove();
  });



  myBtnSearch.addEventListener("click", (e) =>{
    if(myInput.value.length > 2){
      search();
    }
  })

  document.addEventListener("keydown", (e) =>{
    if(e.key == "Enter" && myInput.value.length > 2){
      search();
    }
  })

  myDivMovies.addEventListener("click", (e) => {
    if(e.target.className == "img-movie"){
      fetchDetails(e.target.id);
    }
    
  })

}

function search(){
  error.innerHTML = "";
  if(firstSearchDone ){
    myDivMovies.remove();

    myDivMovies = document.createElement("div");
    myDivMovies.id="divMovies";
    mySectMovies.appendChild(myDivMovies);
  }

  if(!fetching){
    searchType = 0;
    fetchProcess();
    firstSearchDone = true;
  }
}

function fetchProcess(){
  year=myInputYear.value;
  searchName = myInput.value;
  fetching = true;
  pageCounter = searchType == 0? 1: pageCounter + 1;
  fetch("https://www.omdbapi.com/?s="+searchName+"&y="+year+"&apikey=dfe7b98e&page="+pageCounter).then(
  response => response.json()).then(data =>{
    showMovies(data.Search);
    fetching = false;
    myInput.value = searchName;
  })
}

function showMovies(movies){
  console.log(movies);
  if(movies != undefined){
    let moviesLength = movies.length;
    for(let i=0; i<moviesLength; i++){
      let myDiv = document.createElement("div");

      myDivMovies.appendChild(myDiv);

      let myFigure = document.createElement("figure");

      myDiv.appendChild(myFigure);

      let myImg = document.createElement("img");
      myImg.src = movies[i].Poster;
      myImg.className = "img-movie";
      myImg.id = movies[i].Title;
      myFigure.appendChild(myImg);

      let myFigCapt = document.createElement("figcaption");
      myFigCapt.innerHTML = movies[i].Title;
      myFigure.appendChild(myFigCapt);
    }
  }else{
    error.innerHTML = "There are no results.";
  }
}

function fetchDetails(title){
  fetch("https://www.omdbapi.com/?t=Thor:%20The%20Dark%20World&apikey=dfe7b98e").then(
  response => response.json()).then(data =>{
    console.log(data.Search);
    showDetails(data.Search);
    fetching = false;
  })
}

function showDetails(details){
  console.log(details);
  if(details != undefined){
    let detailsLength = details.length;
    for(let i=0; i<detailsLength; i++){


      let myDiv = document.createElement("div");
      myDiv.className = "div-movie";

      myDivMovies.appendChild(myDiv);

      let myFigure = document.createElement("figure");

      myDiv.appendChild(myFigure);

      let myImg = document.createElement("img");
      myImg.src = movies[i].Poster;
      myFigure.appendChild(myImg);

      let myFigCapt = document.createElement("figcaption");
      myFigCapt.innerHTML = movies[i].Title;
      myFigure.appendChild(myFigCapt);
    }
  }
}