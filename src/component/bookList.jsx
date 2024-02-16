import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { deleteBookIDB } from '../utils/bookServices'
import {useNavigate} from 'react-router-dom'
import { getBooks, deleteBooksAPI } from '../api/BookAPI.js'
const defaultImageUrl = 'https://plus.unsplash.com/premium_photo-1681825268400-c561bd47d586?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
export default function BookList() {
  const [books, setBooks] = useState([]);




  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const fetchedBooks = await getBooks();
        setBooks(fetchedBooks);
      } catch (error) {
        console.error('Erreur lors de la récupération des livres :', error);
      }
    };

    fetchBooks();
  }, []);

  const handleDelete = (id) => {
    deleteBooksAPI(id)
    setBooks(books.filter(book => book.id !== id));
  };

  return (
    <div>
      <h1>Liste des Livres</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
         <img src={book.imageUrl || defaultImageUrl} alt={book.title} style={{ width: '50px', height: '50px' }} />
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