import { Routes, Route, BrowserRouter } from "react-router-dom"
import ShowProducts from './components/ShowProducts.jsx'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShowProducts></ShowProducts>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
