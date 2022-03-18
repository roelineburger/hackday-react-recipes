import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

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
    <section className="cards-primary">
      <p className="home__welcome">
        Welcome to my recipe hub, stay a while and nourish your body and soul
        with these recipes.
      </p>
      <div className="card-container">
        {recipes.map((recipe) => (
          <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
            <section className="card">
              <img
                alt={recipe.title}
                src={recipe.image}
                className="card__img"
              />
              <h3 className="recipe__title">{recipe.title}</h3>
              <div className="recipe__summary">{recipe.summary}</div>
            </section>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Home;
