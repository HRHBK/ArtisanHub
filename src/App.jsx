import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use BrowserRouter as Router
import Home from './Pages/Home';
import Shop from './Pages/Shop';

function App() {


  return (
    <Router>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop/>}/>
        
      </Routes>
    </Router>
  )
}

export default  App
