import Homepage from "./component/homepage"
import EditBook from "./component/editBook";
import { Routes, Route } from 'react-router-dom';
import AddBook from "./component/addBook";
function App() {


  return (
    <>
      <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/edit-book/:id" element={<EditBook />} />
            <Route path="/add-book" element={<AddBook />} />
      </Routes>
    </>
  )
}

export default App
