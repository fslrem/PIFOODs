require('dotenv').config();
// const { API_KEY } = process.env;
const { Recipes, Diets } = require('../db');
const axios = require('axios');
const { Op } = require('sequelize');

const getRecipesByName = async (req, res) => {
    try {
      const { name } = req.query;
      
      const dbRecipes = await Recipes.findAll({
        where: {
          title: { [Op.iLike]: `%${name}%` },
        },
        include: {
          model: Diets,
          as: 'diets',
          through: 'recipe_diets',
          attributes: ['name']
    }});
  
      let dbRecetas = [];
  
      if (dbRecipes.length > 0) {
        dbRecetas = dbRecipes.map((recipe) => {
          return {
            id: recipe.id,
            title: recipe.title,
            image: recipe.image,
            summary: recipe.summary,
            healthScore: recipe.healthScore,
            diets: recipe.diets.length > 0 ? recipe.diets.map((diet) => diet.name) : [],
            steps: recipe.steps,
            source: "DB",
          };
        });
      }
  
      let allrecetas = [];

      //`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`

      const response = await axios.get(`https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`);
      const recipes = response.data.results;
      
      allrecetas = allrecetas.concat(recipes);
    
      let apiRecetas

      if (name != undefined) {
        apiRecetas = allrecetas.filter((receta) => {
            return receta.title && receta.title.toLowerCase().includes(name.toLowerCase());
          });
      } else if (name == false) { apiRecetas = allrecetas }
  
      const apiRecipes = apiRecetas.map((receta) => {
        return {
          id: receta.id,
          title: receta.title,
          diets: receta.diets && Array.isArray(receta.diets) ? receta.diets.map((diet) => diet) : [],
          image: receta.image,
          summary: receta.summary,
          healthScore: receta.healthScore,
          steps: receta.analyzedInstructions && Array.isArray(receta.analyzedInstructions) &&
            receta.analyzedInstructions.length > 0 && Array.isArray(receta.analyzedInstructions[0].steps)
            ? receta.analyzedInstructions[0].steps.map((paso) => ({
                number: paso.number,
                step: paso.step,
              }))
            : [],
          source: "API",
        }
      });

      const allRecipes = [...dbRecetas, ...apiRecipes];
  
      if (allRecipes.length > 0) {
        return res.status(201).json(allRecipes);
      } else {
        res.status(404).json({ message: "No se encontraron recetas con el nombre proporcionado.", name });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = getRecipesByName;
