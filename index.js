window.onload = ()=>{
  begin();
}

let sectionMovies, myDivMovies;
let pageCounter = 1;
let searchName = "";
let year = "";
let fetching = false;
let firstSearch = false;

let myDivSearch, myInput, myBtnSearch, myIcon, myBtnFilter;
let error;

function begin(){
  myDivSearch = document.createElement("div");
  myDivSearch.className = "search-container";
  document.body.appendChild(myDivSearch);

  myInput = document.createElement("input");
  myInput.placeholder = "Search...";
  myDivSearch.appendChild(myInput);

  myBtnSearch = document.createElement("button");
  myBtnSearch.id = "btn-search";
  myDivSearch.appendChild(myBtnSearch);

  myIcon = document.createElement("i");
  myIcon.className = "fa fa-search";
  myBtnSearch.appendChild(myIcon);

  myBtnFilter = document.createElement("button");
  myBtnFilter.innerHTML = "Filter";
  myDivSearch.appendChild(myBtnFilter);

  mySectMovies = document.createElement("section");
  mySectMovies.id="sectMovies";
  document.body.appendChild(mySectMovies);

  myDivMovies = document.createElement("div");
  myDivMovies.id="divMovies";
  mySectMovies.appendChild(myDivMovies);

  error = document.createElement("p");
  error.id = "error";
  document.body.appendChild(error);

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

  // Filters
}

function search(){
  error.innerHTML = "";
  if(firstSearch){
    myDivMovies.remove();

    myDivMovies = document.createElement("div");
    myDivMovies.id="divMovies";
    mySectMovies.appendChild(myDivMovies);
  }

  let searchType = 0;
  if(!fetching){
    fetchProcess(searchType)
  }

  if(!firstSearch && error.value == undefined){
    searchType = 1;
    firstSearch = true;

    let myBtnLoadDiv = document.createElement("div");
    myBtnLoadDiv.className = "load-container";
    document.body.appendChild(myBtnLoadDiv);
    
    let myBtnLoad = document.createElement("button");
    myBtnLoad.innerHTML = "Load more";
    myBtnLoadDiv.appendChild(myBtnLoad);

    myBtnLoad.addEventListener("click", (e) =>{
      if(!fetching){
        let myLoading = document.createElement("p");
        myLoading.innerHTML = "Loading...";
        myBtnLoadDiv.appendChild(myLoading); 

        fetchProcess(searchType, myLoading);
      }
    })
  }
}

function fetchProcess(searchType, myLoading){
  year="";
  searchName = myInput.value;
  myInput.value = "Loading...";
  fetching = true;
  pageCounter = searchType == 0? 1: pageCounter + 1;
  fetch("https://www.omdbapi.com/?s="+searchName+"&y="+year+"&apikey=dfe7b98e&page="+pageCounter).then(
  response => response.json()).then(data =>{
    showMovies(data.Search);
    fetching = false;
    myInput.value = searchName;
    if(searchType == 1)
      myLoading.remove();
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