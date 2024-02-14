import React from 'react'
import { Link } from 'react-router-dom';
export default function HeaderHomePage() {
  return (
    <div>
      <nav>
        <Link to={"/"}>
        <button>Acceuil</button>
        </Link>
        <Link to={`/add-book`}>
              <button>Ajouter un livre</button>
            </Link>
      </nav>
    </div>
  )
}
