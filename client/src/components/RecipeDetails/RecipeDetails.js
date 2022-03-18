import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './RecipeDetails.module.css';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    const run = async () => {
      const response = await fetch(`http://localhost:4000/recipes/${id}`);
      const data = await response.json();
      setRecipe(data);
    };
    run();
  }, [setRecipe, id]);

  return (
    <article className="recipe__container">
      <h1 className={styles.title}>{recipe.title}</h1>
      <section className="recipe__img">
        <img src={recipe.image} alt={recipe.title} />
      </section>
      <p className="recipe__description">{recipe.description}</p>
    </article>
  );
};

export default RecipeDetails;
