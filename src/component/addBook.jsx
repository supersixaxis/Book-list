import React, { useState } from 'react';
import { updateBookIDB } from '../utils/bookServices';
import { v4 as uuidv4 } from 'uuid';

export default function AddBook() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const newBook = {
            id : uuidv4(),
            title,
            description,
            category,
            imageUrl
        };
        updateBookIDB(newBook);
        
    };

    return (
        <div>
            <h1>Ajouter un livre</h1>
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
                    <label htmlFor="category">Catégorie :</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Sélectionnez une catégorie</option>
                        <option value="Roman">Roman</option>
                        <option value="Poésie">Poésie</option>
                        <option value="Science-fiction">Science-fiction</option>
                        {/* Ajoutez d'autres catégories au besoin */}
                    </select>
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
                <button type="submit">Ajouter le livre</button>
            </form>
        </div>
    );
}
