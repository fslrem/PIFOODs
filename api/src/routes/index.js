const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getDiets = require('../controllers/getDiets');
const getRecipesById = require('../controllers/getRecipesById');
const getRecipesByName = require('../controllers/getRecipesByName');
const postRecipe = require('../controllers/postRecipe');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/recipes/:idRecipe', getRecipesById)
router.get('/diets', getDiets)
router.get('/recipe/name', getRecipesByName)
router.post('/recipes', postRecipe)



module.exports = router;