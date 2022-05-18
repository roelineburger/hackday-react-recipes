import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../Home/Home.module.css';

const Filter = ({ isFiltered }) => {
  console.log(isFiltered);
  return (
    <div>
      {isFiltered.map((recipe) => (
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
                  <span key={tag} className={styles.tag}>
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
  );
};

export default Filter;
