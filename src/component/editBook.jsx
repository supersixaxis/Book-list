import React from 'react';
import { useParams } from 'react-router-dom';
export default function EditBook() {
    const { id } = useParams();

  // Implémentez la logique d'édition du livre avec l'ID spécifié

  return (
    <div>
      <h1>Editer le livre {id}</h1>
      {/* Formulaire d'édition du livre */}
    </div>
  );
}