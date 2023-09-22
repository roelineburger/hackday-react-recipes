import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AddRecipe.module.css';
import { storage } from '../../modules/firebase-config';
import { ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage';

const { v4: uuidv4 } = require('uuid');

const generateRecipeId = () => uuidv4();

const AddRecipe = () => {
  const [newRecipeTitle, setNewRecipeTitle] = useState('');
  const [newRecipeDescription, setNewRecipeDescription] = useState('');
  const [newRecipeSummary, setNewRecipeSummary] = useState('');
  const [newRecipeIngredients, setNewRecipeIngredients] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newTags, setNewTags] = useState('');
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
  };

  const uploadFiles = (file) => {
    if (!file) {
      return;
    }
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setNewImageUrl(url);
        });
      }
    );
  };

  const handleChange = (event) => {
    if (event.target.name === 'recipe-title') {
      setNewRecipeTitle(event.target.value);
    }
    if (event.target.name === 'recipe-desc') {
      setNewRecipeDescription(event.target.value);
    }

    if (event.target.name === 'recipe-summary') {
      setNewRecipeSummary(event.target.value);
    }
    if (event.target.name === 'recipe-ingredients') {
      setNewRecipeIngredients(event.target.value);
    }
    if (event.target.name === 'recipe-tags') {
      setNewTags(event.target.value);
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
      tags: newTags,
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
      <h1 className={styles.header}>Add recipe here</h1>
      <input
        type="text"
        name="recipe-title"
        placeholder="Title..."
        onChange={handleChange}
        value={newRecipeTitle}
        required
      />
      <textarea
        name="recipe-summary"
        placeholder="Summary..."
        onChange={handleChange}
        value={newRecipeSummary}
        className={styles.text}
        required
      />
      <textarea
        name="recipe-tags"
        placeholder="Tags..."
        onChange={handleChange}
        value={newTags}
        className={styles.text}
        required
      />
      <textarea
        name="recipe-ingredients"
        placeholder="Ingredients..."
        onChange={handleChange}
        value={newRecipeIngredients}
        className={styles.text}
        required
      />
      <textarea
        name="recipe-desc"
        placeholder="Description..."
        onChange={handleChange}
        value={newRecipeDescription}
        className={styles.text}
        required
      />
      <form onSubmit={formHandler} className={styles.img}>
        <input
          type="file"
          name="recipe-img"
          accept="image/*"
          onChange={handleChange}
        />
        <button type="submit" className={styles.add}>
          Upload
        </button>
        {newImageUrl && (
          <h3 className={styles.progress}>Uploaded {progress} %</h3>
        )}
      </form>

      <button onClick={addRecipe} className={styles.add}>
        Add Recipe
      </button>
    </div>
  );
};

export default AddRecipe;
