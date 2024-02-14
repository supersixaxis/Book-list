export const updateBookIDB = (newBook) => {


    let request = indexedDB.open('libraryDB', 2)

    request.onsuccess = function(event){

        const db = event.target.result

        const transaction = db.transaction(['books'],'readwrite')

        const bookStore = transaction.objectStore("books")

        const request = bookStore.put(newBook)

        request.onsuccess = function(){
            console.log("Livre ajouté avec succès")
        }

        request.onerror = function(){
            console.error("une erreur est survenue lors de l'ajout du livre")
        }
        window.location.href = '/';

    }

}

export const deleteBookIDB = (bookId) => {


    let request = indexedDB.open('libraryDB', 2)

    request.onsuccess = function(event){

        const db = event.target.result

        const transaction = db.transaction(['books'],'readwrite')

        const bookStore = transaction.objectStore("books")

        const request = bookStore.delete(bookId)

        request.onsuccess = function(){
            console.log("Livre supprimé avec succès")
        }

        request.onerror = function(){
            console.error("une erreur est survenue lors de la suppression du livre")
        }

    }

}