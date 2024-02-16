import axios from "axios";

const url_get_books = "https://firestore.googleapis.com/v1/projects/" + import.meta.env.VITE_PROJECT_ID + "/databases/(default)/documents/book?key=" + import.meta.env.VITE_API_KEY

export function getBooks(){

    try{
        return axios.get(url_get_books)
        .then(function(response){
            let booksFirebase = response.data.documents
            let books = []
          
            for(let sp of booksFirebase){
            
                let book = {
                    id: sp.name.split('/book/')[1],
                    title: sp.fields.title?.stringValue,
                    description: sp.fields.color?.stringValue,
                    imageURL: sp.fields.imageURL?.stringValue,
                    category: sp.fields.category?.stringValue,
                }
                books.push(book)
            }
            return books
        })

    } catch(e){
        console.error(e)
    }

}


export function getBookById(id) {
    const url_get_book_by_id = `https://firestore.googleapis.com/v1/projects/${import.meta.env.VITE_PROJECT_ID}/databases/(default)/documents/book/${id}?key=${import.meta.env.VITE_API_KEY}`;

    try {
        return axios.get(url_get_book_by_id)
            .then(function(response) {
                const bookData = response.data.fields;
                const book = {
                    id: id,
                    title: bookData.title?.stringValue || '',
                    description: bookData.description?.stringValue || '',
                    imageURL: bookData.imageURL?.stringValue || '',
                    category: bookData.category?.stringValue || ''
                };
                return book;
            });
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const url_add_books = "https://firestore.googleapis.com/v1/projects/" + import.meta.env.VITE_PROJECT_ID + "/databases/(default)/documents/book?key=" + import.meta.env.VITE_API_KEY

export function addBooksAPI(title, description, category, imageURL){

    try{

        return axios.post(
            url_add_books,
            {
                "fields": {
                  "title": {
                    "stringValue": title
                  },
                  "description": {
                    "stringValue": description
                  },
                  "category": {
                    "stringValue": category
                  },
                  "imageURL": {
                    "stringValue": imageURL
                  },
                }
              }
        )
        .then(function(response){
            return response.data.name.split("/book/")[1]
            
        })

    } catch(e){
        console.error(e)
    }

}

export function deleteBooksAPI(id){

    const url_delete_book = "https://firestore.googleapis.com/v1/projects/" + import.meta.env.VITE_PROJECT_ID + "/databases/(default)/documents/book/" + id + "?key=" + import.meta.env.VITE_API_KEY

    try{

        return axios.delete(
            url_delete_book
        )
        .then(function(response){
            console.log(response)
        })

    } catch(e){
        console.error(e)
    }

}

export function updateBooksAPI(id, title, description, category, imageURL) {
    const url_update_book = `https://firestore.googleapis.com/v1/projects/${import.meta.env.VITE_PROJECT_ID}/databases/(default)/documents/book/${id}?key=${import.meta.env.VITE_API_KEY}`;

    try {
        const fields = {
            "title": {
                "stringValue": title
            },
            "description": {
                "stringValue": description
            },
            "category": {
                "stringValue": category
            },
            "imageURL": {
                "stringValue": imageURL || "" 
            }
        };

        return axios.patch(
            url_update_book,
            {
                "fields": fields
            }
        ).then(function(response) {
            console.log(response);
        });

    } catch (e) {
        console.error(e);
    }
}