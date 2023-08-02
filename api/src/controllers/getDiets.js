require('dotenv').config();
const { Diets } = require('../db');
// const { API_KEY } = process.env;
const axios = require('axios')

const URL = `https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`;
// `https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`
//`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`

const getDiets = async (req, res) => {
    try {
      let dietsAr = [];
      const response = await axios.get(URL);
      const { results } = response.data;
      results.forEach(recipe => {
        recipe.diets.forEach(diet => {
          if (!dietsAr.includes(diet)) {
            dietsAr.push(diet);
          }
        });
      });
  
      let i = 0;
      const dietas = dietsAr.map((dieta) => {
        return { id: ++i, name: dieta };
      });
  
      let dbDiets = await Diets.findAll();
  
      if (dbDiets.length < 1) {
        await Diets.bulkCreate(dietas);
        dbDiets = await Diets.findAll();
      }
      
      res.status(201).json(dbDiets);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = getDiets;