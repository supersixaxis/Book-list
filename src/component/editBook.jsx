import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { updateBookIDB } from '../utils/bookServices';
export default function EditBook() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [category, setCategory] = useState('');

   
    useEffect(() => {
      const fetchBookData = () => {
          const request = indexedDB.open('libraryDB', 2);

          request.onsuccess = function(event) {
              const db = event.target.result;
              const transaction = db.transaction(['books'], 'readonly');
              const bookStore = transaction.objectStore('books');
              const getRequest = bookStore.get(parseInt(id));

              getRequest.onsuccess = function() {
                  const bookData = getRequest.result;
                  setTitle(bookData.title);
                  setDescription(bookData.description);
                  setImageUrl(bookData.imageUrl);
                  setCategory(bookData.category);
              };

              getRequest.onerror = function() {
                  console.error('Erreur lors de la récupération des données du livre');
              };
          };

          request.onerror = function() {
              console.error('Erreur lors de l\'ouverture de la base de données');
          };
      };

      fetchBookData();
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const updatedBook = {
        id: parseInt(id),
        title: title,
        description: description,
        imageUrl: imageUrl,
        category: category
    };
    updateBookIDB(updatedBook);
};

    return (
        <div>
            <h1>Éditer le livre {id}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Titre :</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description :</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="imageUrl">URL de l'image :</label>
                    <input
                        type="text"
                        id="imageUrl"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="category">Catégorie :</label>
                    <input
                        type="text"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>
                <button type="submit">Enregistrer les modifications</button>
            </form>
        </div>
    );
}
