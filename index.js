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

let myDivSearch, myInput, myBtnSearch, myIcon, myInputYear, mySelectType;
let error;

function begin(){
  let mySearchPage = document.getElementById("search");
  let myLandingPage = document.getElementById("landing");
  let myBtnGoSearch = document.getElementById("go-SP");
  let myBtnGoLanding = document.getElementById("go-LP");

  myDivSearch = document.getElementById("search-container");

  myInput = document.getElementById("input-search");

  myBtnSearch = document.getElementById("btn-search");

  myInputYear = document.getElementById("input-year");

  mySelectType = document.getElementById("select-type");

  mySectMovies = document.getElementById("sectMovies");

  myDivMovies = document.getElementById("divMovies");

  error = document.getElementById("error");

  loadGif = document.getElementById("load");

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

}

function search(){
  error.innerHTML = "";
  if(firstSearchDone){
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
  if(movies){
    let moviesLength = movies.length;
    for(let i=0; i<moviesLength; i++){
      let myDiv = document.createElement("div");

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
  }else{
    error.innerHTML = year == "" ?"There was an error, try a different search.": "There are no results.";
  }
}