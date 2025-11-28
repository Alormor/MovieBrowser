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

let myDivSearch, myInput, myBtnSearch, myIcon, myBtnFilter;
let error;

function begin(){
  let mySearchPage = document.getElementById("search-page");
  let myLandingPage = document.getElementById("landing-page");
  let myBtnGoSearch = document.getElementById("go-SP");
  let myBtnGoLanding = document.getElementById("go-LP");

  myDivSearch = document.getElementById("search-container");

  myInput = document.getElementById("input-search");

  myBtnSearch = document.getElementById("btn-search");

  myInputYear = document.createElement("input-year");

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