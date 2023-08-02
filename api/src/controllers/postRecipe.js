const { Recipes, Diets } = require('../db');
const { v4: uuidv4 } = require('uuid');

const postRecipe = async(req, res) => {
    try {
      const { title, image, summary, healthScore, steps, name } = req.body;
  
      if (!title || !image || !summary || !healthScore || !steps || !name) {
        return res.status(400).send('Faltan datos');
      }
  
      const recipe = await Recipes.create({
        id: uuidv4(),
        title,
        image,
        summary,
        healthScore,
        steps,
      });
  
      
        const foundDiets = await Diets.findAll({ where: { name: name } });
        await recipe.setDiets(foundDiets);
      
  
      res.status(201).json(recipe)
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
module.exports = postRecipe;