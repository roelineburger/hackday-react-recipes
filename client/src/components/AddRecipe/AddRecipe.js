import React from 'react';
import ImageUpload from 'image-upload-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddRecipe.css';

const { v4: uuidv4 } = require('uuid');

const generateRecipeId = () => uuidv4();

const AddRecipe = () => {
  const [newRecipeTitle, setNewRecipeTitle] = useState('');
  const [newRecipeDescription, setNewRecipeDescription] = useState('');
  const [newRecipeSummary, setNewRecipeSummary] = useState('');
  const [newRecipeIngredients, setNewRecipeIngredients] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    if (event.target.name === 'recipe-title') {
      setNewRecipeTitle(event.target.value);
    }
    if (event.target.name === 'recipe-desc') {
      setNewRecipeDescription(event.target.value);
    }
    if (event.target.name === 'recipe-img') {
      setNewImageUrl(event.target.value);
    }
    if (event.target.name === 'recipe-summary') {
      setNewRecipeSummary(event.target.value);
    }
    if (event.target.name === 'recipe-ingredients') {
      setNewRecipeIngredients(event.target.value);
    }
  };

  const addRecipe = async () => {
    if (newRecipeTitle.trim() === '') {
      return alert('Kindly enter a value in title field');
    }
    const newRecipe = {
      id: generateRecipeId(),
      title: newRecipeTitle,
      summary: newRecipeSummary,
      ingredients: newRecipeIngredients,
      description: newRecipeDescription,
      image: newImageUrl,
    };
    const response = await fetch('http://localhost:4000/recipes', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRecipe),
    });
    const { id } = await response.json();
    navigate(`/recipe/${id}`);
  };

  return (
    <div>
      <h1 className="add__recipe-header">Add recipe here</h1>
      <input
        className="input__fields"
        type="text"
        name="recipe-title"
        placeholder="Title..."
        onChange={handleChange}
        value={newRecipeTitle}
      />
      <textarea
        name="recipe-summary"
        placeholder="Summary..."
        onChange={handleChange}
        value={newRecipeSummary}
        className="text__area"
      />
      <textarea
        name="recipe-ingredients"
        placeholder="Ingredients..."
        onChange={handleChange}
        value={newRecipeIngredients}
        className="text__area"
      />
      <textarea
        name="recipe-desc"
        placeholder="Description..."
        onChange={handleChange}
        value={newRecipeDescription}
        className="text__area"
      />

      <input
        type="text"
        name="recipe-img"
        placeholder="Image URL..."
        onChange={handleChange}
        value={newImageUrl}
      />

      <button onClick={addRecipe} className="add__recipe-btn">
        Add Recipe
      </button>
    </div>
  );
};

export default AddRecipe;
