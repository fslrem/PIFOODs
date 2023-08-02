import { GET_ALL, FILTERED_BY_DIETS, FILTERED_BY_SOURCE,
   ORDERED_BY_NAME, ORDERED_BY_SCORE, CREATE_RECIPE } from './action-types';
import axios from 'axios';

export const getAll = (name) => {
   const endpoint = `http://localhost:3001/recipe/name?name=${name}`;
                    
   return (dispatch) => {
       axios.get(endpoint)
       .then(({data})=>{
           if(data.length > 0){
               dispatch({
                   type: GET_ALL,
                   payload: data
               })
           } else {
               alert('Recipe not founded');
           }
       })
   }
}

export const filteredByDiets = (value) => {
   return {type: FILTERED_BY_DIETS, 
           payload: value}
};

export const filteredBySource = (data) => {
   return {type: FILTERED_BY_SOURCE, 
           payload: data}
};

export const orderedByName = (data) => {
   return {type: ORDERED_BY_NAME, 
           payload: data};
};

export const orderedByScore = (data) => {
   return {type: ORDERED_BY_SCORE,
           payload: data};
};

export const createRecipe = (formData) => {
   return async(dispatch) => {
       try{
           const endpoint = 'http://localhost:3001/recipes';
           const response = await axios.post(endpoint, formData);
           
           dispatch({type: CREATE_RECIPE, payload: response.data})
       }catch(error){
           console.error('Cannot create recipe', error);
       }
   };
};