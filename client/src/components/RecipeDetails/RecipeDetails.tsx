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
    <article className={styles.container}>
      <section className={styles.sidebar}>
        <section className={styles.image}>
          <img src={recipe.image} alt={recipe.title} />
        </section>
        <h4 className={styles.ingredientsTitle}>Ingredients</h4>
        <p className={styles.ingredients}>{recipe.ingredients}</p>
      </section>
      <section className={styles.content}>
        <h1 className={styles.title}>{recipe.title}</h1>

        <p className={styles.summary}>{recipe.summary}</p>
        <section className={styles.tags}>
          {recipe.tags &&
            recipe.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
        </section>
        <h1 className={styles.descriptionTitle}>Method</h1>
        <p className={styles.description}>{recipe.description}</p>
      </section>
    </article>
  );
};

export default RecipeDetails;
