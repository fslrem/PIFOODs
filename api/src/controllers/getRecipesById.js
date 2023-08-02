require('dotenv').config();
const { API_KEY } = process.env;
const { Recipes, Diets } = require('../db');
const axios = require('axios');

const getRecipeById = async(req, res) => {
  try {
    const { idRecipe } = req.params;
    
    let recipe
    
    if(isNaN(idRecipe)){
      const recipeFromDB= await Recipes.findByPk(idRecipe, {include:{model:Diets, as: 'diets', through:{attributes: []}}})  
        
      const {id, title, image, summary, healthScore, steps, diets} = recipeFromDB;
      
      const dtsmap = diets.map((diet)=>{return diet.name});
      
      const strdts = dtsmap.toString()  
      
      recipe = {
        id,
        title,
        image,
        summary,
        healthScore,
        steps,
        diets: strdts,
        source: "DB"
      };
      } else {

      const response = await axios.get(`https://api.spoonacular.com/recipes/${idRecipe}/information?apiKey=${API_KEY}`);

      const { id, title, image, summary, healthScore, diets, analyzedInstructions } = response.data;
      
      let pasos = Array.isArray(analyzedInstructions) && analyzedInstructions.length > 0 ? analyzedInstructions[0].steps : [];

      if (!Array.isArray(pasos)) {
        pasos = [];
      }
      
      const steps = pasos.map((paso) => ({
        number: paso.number,
        step: paso.step,
      }));
      
      recipe = {
        id,
        title,
        image,
        summary: summary.replace(/<[^>]+>/g, ''),
        healthScore,
        diets: diets && Array.isArray(diets) ? diets.map((diet) => diet) : [],
        steps,
        source: "API",
      };
    }
 
      res.status(200).json(recipe);
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  };


module.exports = getRecipeById;