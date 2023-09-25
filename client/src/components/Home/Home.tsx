import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import { Recipe } from '../../types/types';

const Home = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:4000/recipes');
      const data = await response.json();
      setRecipes(data);
    };
    fetchData();
  }, [setRecipes]);

  const filteredRecipes = recipes.filter((recipe) => {
    if (!selectedTag) {
      return true;
    }

    return recipe.tags.includes(selectedTag);
  });

  return (
    <section className={styles.primary}>
      <p className={styles.welcome}>
        Welcome to my recipe hub, stay a while and nourish your body and soul
        with these recipes.
      </p>
      <div className={styles.container}>
        {filteredRecipes.map((recipe) => (
          <>
            <section className={styles.card}>
              <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
                <img
                  alt={recipe.title}
                  src={recipe.image}
                  className={styles.image}
                />{' '}
              </Link>
              <section className={styles.tags}>
                {recipe.tags &&
                  recipe.tags.map((tag) => (
                    <span
                      key={tag}
                      className={styles.tag}
                      onClick={() => {
                        setSelectedTag(tag);
                      }}
                    >
                      {tag}
                    </span>
                  ))}
              </section>
              <h3 className={styles.title}>{recipe.title}</h3>
              <div className={styles.summary}>{recipe.summary}</div>
            </section>
          </>
        ))}
      </div>
    </section>
  );
};

export default Home;

//
