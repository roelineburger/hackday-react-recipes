import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import Filter from '../Filter/Filter';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [isFiltered, setIsFiltered] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:4000/recipes');
      const data = await response.json();
      setRecipes(data);
    };
    fetchData();
  }, [setRecipes]);

  //take the recipe array and the tag. filter the array to get the tags, then check if there is a recipe that matches the ta
  // that was clicked.
  // then if there was a match, return the match
  // and then send the match to the filtered
  const filterRecipes = (recipeArr, tag) => {
    const filter = recipeArr.filter((rec) => {
      const match = rec.tags.filter((recipe) => recipe === tag);
      if (match.length > 0) return match;
    });
    return setIsFiltered(filter);
  };

  return (
    <section className={styles.primary}>
      <p className={styles.welcome}>
        Welcome to my recipe hub, stay a while and nourish your body and soul
        with these recipes.
      </p>
      <div className={styles.container}>
        {!isFiltered ? (
          recipes.map((recipe) => (
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
                          filterRecipes(recipes, tag);
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
          ))
        ) : (
          <Filter isFiltered={isFiltered} />
        )}
      </div>
    </section>
  );
};

export default Home;

//