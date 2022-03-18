require('dotenv').config();
const cors = require('cors');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const {
  createNewRecipe,
  getAllRecipes,
  findRecipeById,
} = require('./models/database');

const generateRecipeId = () => uuidv4();
const app = express();
app.use(cors());
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
app.use(express.json());

app.get('/recipes', async (req, res) => {
  const recipes = await getAllRecipes();
  res.json(recipes);
});

app.get('/recipes/:id', async (req, res) => {
  const recipe = await findRecipeById(req.params.id);
  res.json(recipe);
});

app.post('/recipes', async (req, res) => {
  const newRecipe = {
    id: generateRecipeId(),
    title: req.body.title,
    summary: req.body.summary,
    tags: req.body.tags.split('\n').map((e) => e.trim()),
    ingredients: req.body.ingredients,
    description: req.body.description,
    image: req.body.image,
  };
  await createNewRecipe(newRecipe);
  res.status(201).json(newRecipe);
});
