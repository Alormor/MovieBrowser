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
let type = "";
let fetching = false;
let firstSearchDone = false;
let searchType = false;
let loadGif;
let e =[];
let myDivSearch, myInput, myBtnSearch, myIcon, myInputYear, mySelectType;
let error, mySectMovieDetail;

function begin(){
  let mySearchPage = document.getElementById("search");
  let myLandingPage = document.getElementById("landing");
  let myBtnGoSearch = document.getElementById("go-SP");
  let myBtnGoLanding = document.getElementById("go-LP");

  myDivSearch = document.getElementById("search-container");

  myInput = document.getElementById("input-search");
  myInput.value = "";

  myBtnSearch = document.getElementById("btn-search");

  myInputYear = document.getElementById("input-year");
  myInputYear.value = "";

  mySelectType = document.getElementById("select-type");

  mySectMovies = document.getElementById("sectMovies");

  myDivMovies = document.getElementById("divMovies");

  error = document.getElementById("error");

  loadGif = document.getElementById("load");

  mySectMovieDetail = document.getElementById("sectDetailMovie");

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

  myInput.addEventListener("input", (e) =>{
    if(myInput.value.length > 2){
      search();
      fetching = false;
    }
  })

  myDivMovies.addEventListener("click", (e) => {
    if(e.target.className == "img-movie")
      fetchDetails(e.target.id);
  })

  document.addEventListener("click", (e) =>{
    if(e.target.id == "backToSearch" || !mySectMovieDetail.contains(e.target)){
      mySectMovieDetail.style.visibility = "hidden";
      document.body.style.overflow = "auto";
      document.getElementById("search-content").classList.remove("blur-background");
      
    }
  })

}

function search(){
  error.innerHTML = "";
  if(firstSearchDone){
    myDivMovies.remove();

    myDivMovies = document.createElement("div");
    myDivMovies.id="divMovies";
    mySectMovies.appendChild(myDivMovies);

    myDivMovies.addEventListener("click", (e) => {
      if(e.target.className == "img-movie")
        fetchDetails(e.target.id);
    });
  }

  if(!fetching){
    searchType = 0;
    fetchProcess();
    firstSearchDone = true;
  }
}

function fetchProcess(){
  fetching = true;
  loadGif.style.visibility = "visible";
  
  searchName = myInput.value;
  pageCounter = searchType == 0? 1: pageCounter + 1;
  year = myInputYear.value;
  type = mySelectType.value;
  
  fetch("https://www.omdbapi.com/?apikey=dfe7b98e&s="+searchName+"&page="+pageCounter+
    "&y="+year+"&type="+type).then(
  response => response.json()).then(data =>{
    showMovies(data.Search);
    fetching = false;
    myInput.value = searchName;
    loadGif.style.visibility = "hidden";
  })
}

function showMovies(movies){
  console.log(movies);
  if(movies != undefined){
    error.innerHTML = "";
    let moviesLength = movies.length;
    for(let i=0; i<moviesLength; i++){
      let myDiv = document.createElement("div");

      myDivMovies.appendChild(myDiv);

      let myFigure = document.createElement("figure");

      myDiv.appendChild(myFigure);

      let myImg = document.createElement("img");
      myImg.src = movies[i].Poster;

      myImg.onerror = () => {
        myImg.src = "assets/src/images/no-image.png";
        myImg.style.border = "none";
      };
      myImg.className = "img-movie";
      myImg.id = movies[i].imdbID;

      myFigure.appendChild(myImg);

      let myFigCapt = document.createElement("figcaption");
      myFigCapt.innerHTML = movies[i].Title;
      myFigure.appendChild(myFigCapt);
    }
  }else{
    error.innerHTML = "There are no results.";
  }
}

function fetchDetails(id){
  console.log(id);
  fetch("https://www.omdbapi.com/?i="+id+"&apikey=dfe7b98e").then(
  response => response.json()).then(data =>{
    console.log(data);
    console.log("Entró en fetchDetails");
    showDetails(data);
    fetching = false;
    mySectMovieDetail.style.visibility = "visible";
    document.body.style.overflow = "hidden";
    document.getElementById("search-content").classList.add("blur-background"); 
  })
}

function showDetails(details){
  console.log(details);
  if(details != undefined){
    let myDetailPoster = document.getElementById("detail-movie-poster");
    myDetailPoster.src = details.Poster;

    let myDetailTitle = document.getElementById("detail-movie-title");
    myDetailTitle.innerHTML = "<strong>Title:</strong> " + details.Title;

    let myDetailRated = document.getElementById("detail-movie-rated");
    myDetailRated.innerHTML = "<strong>Rated:</strong> " + details.Rated;

    let myDetailReleased = document.getElementById("detail-movie-released");
    myDetailReleased.innerHTML = "<strong>Released:</strong> " + details.Released;

    let myDetailRuntime = document.getElementById("detail-movie-runtime");
    myDetailRuntime.innerHTML = "<strong>Runtime:</strong> " + details.Runtime;

    let myDetailGenre = document.getElementById("detail-movie-genre");
    myDetailGenre.innerHTML = "<strong>Genre:</strong> " + details.Genre;

    let myDetailDirector = document.getElementById("detail-movie-director");
    myDetailDirector.innerHTML = "<strong>Director:</strong> " + details.Director;

    let myDetailWriter = document.getElementById("detail-movie-writer");
    myDetailWriter.innerHTML = "<strong>Writer:</strong> " + details.Writer;

    let myDetailActors = document.getElementById("detail-movie-actors");
    myDetailActors.innerHTML = "<strong>Actors:</strong> " + details.Actors;

    let myDetailPlot = document.getElementById("detail-movie-plot");
    myDetailPlot.innerHTML = "<strong>Plot:</strong> " + details.Plot;

    let myDetailLanguage = document.getElementById("detail-movie-language");
    myDetailLanguage.innerHTML = "<strong>Language:</strong> " + details.Language;

    let myDetailCountry = document.getElementById("detail-movie-country");
    myDetailCountry.innerHTML = "<strong>Country:</strong> " + details.Country;

    let myDetailAwards = document.getElementById("detail-movie-awards");
    myDetailAwards.innerHTML = "<strong>Awards:</strong> " + details.Awards;

    let myDetailRatingsList = document.getElementById("detail-movie-ratings-list");
  
    details.Ratings.forEach(element => {
      let liSource = document.createElement("li");
      let liValue = document.createElement("li");
      let liEmpty = document.createElement("li");
      liEmpty.className = "empty";

      liSource.innerHTML = "<strong>Source: </strong>" + element.Source;
      liValue.innerHTML = "<strong>Value: </strong>" + element.Value;

      myDetailRatingsList.appendChild(liSource);
      myDetailRatingsList.appendChild(liValue);
      myDetailRatingsList.appendChild(liEmpty);
    });
  }
}