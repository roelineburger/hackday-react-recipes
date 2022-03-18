const { MongoClient } = require('mongodb');
const { v4: uuidv4 } = require('uuid');

const generateRecipeId = () => uuidv4();

const url = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`;
const dbName = 'recipes';
let client = null;
let db = null;
let collection = null;

const run = async () => {
  try {
    client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to server');
    db = client.db(dbName);
    collection = db.collection('recipes');
  } catch (err) {
    console.log(err.stack);
  }
};
run().catch(console.dir);

const createNewRecipe = async (newRecipe) => {
  await collection.insertOne(newRecipe);
  return newRecipe;
};

const getAllRecipes = async () => {
  const recipes = await collection.find({}).toArray();
  return recipes;
};

const findRecipeById = async (id) => {
  const recipe = await collection.findOne({ id });
  return recipe;
};

module.exports = { createNewRecipe, getAllRecipes, findRecipeById };
