import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import fetchedBooks  from './books'
import {BrowserRouter} from 'react-router-dom'
const request = indexedDB.open('libaryDB', 2)

request.onupgradeneeded = function(event) {
  let db = event.target.result;
  let spaceStore = db.createObjectStore('books', { keyPath: "id" });

  fetchedBooks.forEach(book => {
      spaceStore.put(book);
  });
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
