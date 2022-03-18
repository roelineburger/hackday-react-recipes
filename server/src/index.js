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

let recipes = [
  {
    id: '1',
    title: 'Chia & oat breakfast scones',
    description:
      'Heat oven to 200C/180C fan/gas 6 and line the base of 4 x 185ml ramekins with a disc of baking parchment and oil the sides with the rapeseed oil. Measure the milk in a jug and make up to 300ml with water. Stir in the lemon juice, vanilla and the 2 tsp oil. Mix the flour, seeds and oats then blitz in a food processor to make the mix as fine as you can. Stir in the baking powder.',
    image:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chia_breakfast_scones_440_400-f1fe7c4.jpg?quality=90&webp=true&resize=300,272',
  },
  {
    id: '2',
    title: 'Breakfast super-shake',
    description:
      'Put the ingredients in a blender and blitz until smooth. Pour into a glass and enjoy!',
    image:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/breakfast-super-shake-e63774c.jpg?quality=90&webp=true&resize=300,272',
  },
  {
    id: '3',
    title: 'Waffles',
    description:
      'The night before serving, stir the cinnamon and 100ml water (or milk) into your oats with a pinch of salt. ',
    image:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/overnight-oats-32a2747.jpg?quality=90&webp=true&resize=300,272',
  },
  {
    id: '4',
    title: 'Apricot & hazelnut muesli',
    description:
      'Packed with filling oats, nuts, seeds and dried fruit, this delicious cereal is ready in just 15 minutes. Make this gluten-free by using gluten-free oats or serve with non-dairy milk for a vegan breakfast ',
    image:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/apricot-hazelnut-muesli-440-400-8119236.jpg?quality=90&webp=true&resize=300,272',
  },
  {
    id: '5',
    title: 'Seeded soda bread with hummus & tomatoes',
    description:
      'Pair our seeded soda bread with homemade hummus and tomatoes to start the day off with a low-GI option that will sustain you through the morning ',
    image:
      'https://images.immediate.co.uk/production/volatile/sites/30/2021/12/Seeded-soda-bread-with-hummus-06c2556.jpg?quality=90&webp=true&resize=300,272',
  },
  {
    id: '6',
    title: 'Healthy porridge bowl',
    description:
      'Start your day right with this filling bowl of oats, berries, banana and seeds.',
    image:
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/01/healthy-porridge-bowl-103f858.jpg?quality=90&webp=true&resize=300,272',
  },
];

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
    ingredients: req.body.ingredients,
    description: req.body.description,
    image: req.body.image,
  };
  await createNewRecipe(newRecipe);
  res.status(201).json(newRecipe);
});
