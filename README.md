# 🎬 Movie Search App — DOM + AJAX + REST API

This project is a complete web application built using **DOM manipulation**, **AJAX**, and a **REST API**.  
The goal is to interact with an external movie database API, retrieve data dynamically, and display it in a user-friendly interface **without reloading the page**.

---

## 🎯 Project Overview

The application connects to the **OMDb API** (Open Movie Database), an open API that provides information about movies and TV shows:

🔗 https://www.omdbapi.com/

Before starting the development, part of the work involves studying the API documentation and testing different queries to understand how it behaves.

The project is live at:
🔗 https://alormor.github.io/MovieBrowser/

---

## 🚀 Features

### ✔️ Landing Page  
- The app begins with a landing page explaining the purpose of the website.  
- The user can switch to a search page where they can begin.
- The user can go back and forth between the pages.

### ✔️ AJAX Requests  
- All data is loaded through AJAX (asynchronous requests).  
- Results are dynamically inserted into the DOM and rendered in real time.

### ✔️ Search Results  
- Results returned from the OMDb API are displayed in a grid layout.  
- Clicking on a movie shows detailed information about it.  
- Results are paginated: the API returns **10 items per page**.

### ✔️ Infinite Scroll 
- Instead of using a “Load more” button, the application implements **infinite scroll**.  
- When the user scrolls near the bottom, the next 10 results are automatically fetched and added to the list.

### ✔️ Search Filters
- Users can search for both **movies and series**.  
- Automatic search triggers after **typing at least 3 characters**.

### ✔️ Movie Detail View
- Clicking on a movie or series displays full details:  
  - Poster  
  - Director  
  - Actors  
  - Plot / Synopsis  
  - Year  
  - All available ratings from the API  
- Users can return to the previous list **in the same state** without losing scroll position.


### ✔️ Favorites System
- Users can **mark movies as favorites** by clicking on a heart icon overlaying each poster.  
- Favorited movies are **stored in `localStorage`**, so they persist even after refreshing the page.  
- Users can **add or remove movies from favorites** dynamically from both the search results and the favorites page.  
- The **Favorites page** displays all saved movies in a grid layout, with the ability to un-favorite them.  
- Favorites are synchronized with the heart icons, so previously saved movies appear with a **filled heart** in search results.

---

## 🛠️ Technologies Used

- **HTML5**  
- **CSS3**  
- **JavaScript (ES6+)**  
- **AJAX (XMLHttpRequest / fetch API)**  
- **REST API consumption (OMDb)**  