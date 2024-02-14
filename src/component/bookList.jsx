import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { deleteBookIDB } from '../utils/bookServices'
export default function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const request = indexedDB.open('libraryDB', 2);

    request.onsuccess = function(event) {
      let db = event.target.result;
      const transaction = db.transaction(['books'], 'readonly');
      const bookStore = transaction.objectStore('books');
      const request2 = bookStore.getAll();

      request2.onsuccess = function() {
        setBooks(request2.result);
      };
    };
  }, []);

  const handleDelete = (id) => {
    deleteBookIDB(id);
    setBooks(books.filter(book => book.id !== id));
  };
  return (
    <div>
      <h1>Liste des Livres</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} - {book.category} - {book.description}
            <button onClick={() => handleDelete(book.id)}>Supprimer</button>
            <Link to={`/edit-book/${book.id}`}>
              <button>Editer</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}