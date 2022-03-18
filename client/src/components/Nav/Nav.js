import { Link } from 'react-router-dom';
import styles from './Nav.module.css';

const Nav = () => {
  return (
    <nav className={styles.primary}>
        <Link className={styles.home} to="/">Home</Link>
        <Link className={styles.add} to="/recipe/new">Add Recipe</Link>
    </nav>
  );
};

export default Nav;
