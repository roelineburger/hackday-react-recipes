import './App.css';
import AddRecipe from './components/AddRecipe/AddRecipe';
import Nav from './components/Nav/Nav';
import Home from './components/Home/Home';
import { Routes, Route } from 'react-router-dom';
import RecipeDetails from './components/RecipeDetails/RecipeDetails';

function App() {
  return (
    <article>
      <Nav />
      <header className="logo">
        <p>the body lab</p>
        <hr></hr>
      </header>

      <Routes>
        <Route path="/recipe/new" element={<AddRecipe />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </article>
  );
}

export default App;
