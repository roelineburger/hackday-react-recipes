import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:4000/recipes');
      const data = await response.json();
      setRecipes(data);
    };
    fetchData();
  }, [setRecipes]);
  return (
    <section className={styles.primary}>
      <p className={styles.welcome}>
        Welcome to my recipe hub, stay a while and nourish your body and soul
        with these recipes.
      </p>
      <div className={styles.container}>
        {recipes.map((recipe) => (
          <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
            <section className={styles.card}>
              <img
                alt={recipe.title}
                src={recipe.image}
                className={styles.image}
              />
              <h3 className={styles.title}>{recipe.title}</h3>
              <div className={styles.summary}>{recipe.summary}</div>
            </section>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Home;
