import { GET_ALL, FILTERED_BY_DIETS, FILTERED_BY_SOURCE,
    ORDERED_BY_NAME, ORDERED_BY_SCORE, CREATE_RECIPE } from './action-types';

let initialState = {
    allTheRecipes: [],
    theRecipes: [],
    theRecipe: [],
    recipe: [],
    lol: []
};
    
const reducer = (state = initialState, { type, payload }) =>{
    switch (type) {
        case GET_ALL:
            return {
                ...state,
                allTheRecipes: payload,
                theRecipes: payload,
                theRecipe: payload
            };
        case FILTERED_BY_DIETS:
            const dietasFiltradas = state.theRecipes.filter((recip) => recip.diets.includes(payload));
                return {
                        ...state,
                    allTheRecipes:
                    payload === 'All'
                    ? [...state.theRecipes]
                    : dietasFiltradas,
                    theRecipe:
                    payload === 'All'
                    ? [...state.theRecipes]
                    : dietasFiltradas
                }
            
        case FILTERED_BY_SOURCE:
            const fuentesFiltradas = state.theRecipe.filter((recipe) => 
                    recipe.source.includes(payload));
            return {
                    ...state,
                    allTheRecipes:
                    payload === 'All'
                    ? [...state.theRecipe]
                    : fuentesFiltradas
                }
        case ORDERED_BY_NAME:
            const theRecipes2 = [...state.allTheRecipes];
    
            let sortRecipes;
    
            if (payload === "A"){
                sortRecipes = theRecipes2.slice().sort((a,b) =>{
                    const  titleA = a.title.toLowerCase();
                    const  titleB = b.title.toLowerCase();
                    return titleA.localeCompare(titleB);
                });
            } else if (payload === "D") {
                sortRecipes = theRecipes2.slice().sort((a,b) =>{
                    const  titleA = a.title.toLowerCase();
                    const  titleB = b.title.toLowerCase();
                    return titleB.localeCompare(titleA);
                });            
            } else {
                sortRecipes = theRecipes2;
            }
    
            return {
                ...state,
                allTheRecipes: sortRecipes
                }
        case ORDERED_BY_SCORE:
            const theRecipe2 = [...state.allTheRecipes];
    
            let scoreRecipes;
    
            if(payload === 'Y') {
                scoreRecipes = theRecipe2.sort((a, b)=> a.healthScore - b.healthScore)
            } else if(payload === 'N') {
                scoreRecipes = theRecipe2.sort((a, b)=> b.healthScore - a.healthScore)
            } else {
                scoreRecipes = theRecipe2;
            }
    
            return {
                ...state,
                allTheRecipes: scoreRecipes
            };
        case CREATE_RECIPE:
            return {
                ...state,
                allTheRecipes: [...state.allTheRecipes, payload]      
            };
        default:
            return {...state};
        };
    };
    
export default reducer;