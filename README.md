# 🎬 Movie Search App — DOM + AJAX + REST API

This project is a complete web application built using **DOM manipulation**, **AJAX**, and a **REST API**.  
The goal is to interact with an external movie database API, retrieve data dynamically, and display it in a user-friendly interface **without reloading the page**.

---

## 🎯 Project Overview

The application connects to the **OMDb API** (Open Movie Database), an open API that provides information about movies and TV shows:

🔗 https://www.omdbapi.com/

Before starting the development, part of the work involves studying the API documentation and testing different queries to understand how it behaves.

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

---

## 🛠️ Technologies Used

- **HTML5**  
- **CSS3**  
- **JavaScript (ES6+)**  
- **AJAX (XMLHttpRequest / fetch API)**  
- **REST API consumption (OMDb)**

---

## 📦 Summary

This project demonstrates how to:

- Build a dynamic interface using only JavaScript and DOM manipulation  
- Make asynchronous API calls  
- Paginate and display external data  
- Implement view switching without page reload  
- Use infinite scrolling for a smoother user experience  

It is a complete practical example of combining front-end logic with real external data.

---