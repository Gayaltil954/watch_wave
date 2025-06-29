import "./css/App.css";
import Favorites from "./Pages/Favorites";
import Home from "./Pages/Home";
import {Routes, Route} from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext";
import NavBar from "./components/NavBar";
import Categories from "./Pages/Categories";
import Footer from "./Pages/Footer";

function App() {
  return (
    <MovieProvider>
      <NavBar />
    <main className='main-content'>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/favorites" element={<Favorites />}/>
        <Route path="/categories" element={<Categories />}/>
      </Routes>
    </main>
     <Footer />
    </MovieProvider>
  )
}

export default App;
