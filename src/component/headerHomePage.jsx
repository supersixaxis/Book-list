import React from 'react'
import { Link } from 'react-router-dom';
export default function HeaderHomePage() {
  return (
    <div>
      <nav>
        <p>Acceuil</p>
        <Link to={`/add-book`}>
              <button>Ajouter un livre</button>
            </Link>
      </nav>
    </div>
  )
}
