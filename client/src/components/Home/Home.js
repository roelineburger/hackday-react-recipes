import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedTag, setSelectedTag] = useState();

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
      return true; //if true display all recipes
    }
    // return recipe.tags.filter((tag) => tag === selectedTag).length > 0;
    // return recipe.tags.indexOf(selectedTag) !== -1;
    return recipe.tags.includes(selectedTag);
    // const data = recipe.tags.indexOf(selectedTag) > -1;
    // console.log(data);
  });
  console.log(filteredRecipes);

  //take the recipe array and the tag. filter the array to get the tags, then check if there is a recipe that matches the ta
  // that was clicked.
  // then if there was a match, return the match
  // and then send the match to the filtered
  // const filterRecipes = (recipeArr, tag) => {
  //   const filter = recipeArr.filter((rec) => {
  //     const match = rec.tags.filter((recipe) => recipe === tag);
  //     //return rec.tags.includes(tag);
  //     if (match.length > 0) return match;
  //   });
  //   return setIsFiltered(filter);
  // };
  // console.log(recipes);
  // console.log(isFiltered);

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
