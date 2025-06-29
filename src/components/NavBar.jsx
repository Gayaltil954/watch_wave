import { Link } from "react-router-dom";
import "../css/NavBar.css"


function NavBar() {
    return <nav className="navbar">
        <div className="navbar-brand"> 
            <Link to="/">WatchWave</Link>
        </div>
        <div className="navbar-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/favorites" className="nav-link">Favorites</Link>
            <Link to="/categories" className="nav-link">Categories</Link>
        </div>
    </nav>
}

export default NavBar;