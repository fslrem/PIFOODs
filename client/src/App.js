import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail';
import Form from './components/Form/Form';

function App() {

  const [recipes, setRecipes] = useState([]);

    const onSearch = (name) => {
      fetch(`http://localhost:3001/recipe/name?name=${name}`)
      .then((response) => response.json())
      .then((data) => {
        if(data.length > 0) {
          setRecipes(() => [...data]);
        } else {
          setRecipes(() => []);
          alert('Cannot find recipe')
        }
      })
      .catch((error) => {
        console.error('Error fetching recipes:', error);
      });
  };

  const [diets, setDiets] = useState([]);
 
  const getDiets = () => {
    fetch('http://localhost:3001/diets')
    .then((response) => response.json())
    .then((data) => {
      if(data.length > 0) {
        setDiets(() => [...data]);
      } else {
        setDiets(() => []);
        alert('Cannot find recipe by this diet');
      }
    })
  }

useEffect(() => {
  getDiets();
}, []);

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Landing/>} />
        <Route exact path="/home" element={<Home recipes={recipes} onSearch={onSearch} diets={diets} getDiets={getDiets} />} />
        <Route path="/detail/:id" element={<Detail/>} />
        <Route path="/form" element={<Form diets={diets}/>} />
      </Routes>
    </div>
  )
};

export default App;