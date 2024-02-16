import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { updateBooksAPI, getBookById } from '../api/BookAPI.js'
export default function EditBook() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [category, setCategory] = useState('');

   
    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const book = await getBookById(id);
                setTitle(book.title);
                setDescription(book.description);
                setImageUrl(book.imageUrl);
                setCategory(book.category);
            } catch (error) {
                console.error('Erreur lors de la récupération des détails du livre :', error);
            }
        };

        fetchBookDetails();
    }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateBooksAPI(id, title, description, category, imageUrl)
    window.location.href = '/';
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
