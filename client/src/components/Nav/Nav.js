import { Link } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
  return (
    <nav className="nav-primary">
        <Link className="nav__home" to="/">Home</Link>
        <Link className="nav__add" to="/recipe/new">Add Recipe</Link>
    </nav>
  );
};

export default Nav;
