import './Detail.css';
import React from 'react';
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function Detail() {

    const { id } = useParams();
    const [recipe, setRecipe] = useState({});

    const [componentLoaded, setComponentLoaded] = useState(false);

    useEffect(() => {

        axios(`http://localhost:3001/recipes/${id}`)
        .then((response) => setRecipe(response.data));
        setTimeout(()=>{
            setComponentLoaded(true);
        }, 2000);
    }, []);

    let dieta
    if(Array.isArray(recipe.diets)){ 
    dieta = recipe.diets.map((diet) => {return `${diet}, ` })
    } else { dieta = recipe.diets}

    let pasos
    if(Array.isArray(recipe.steps)){ 
        pasos = recipe.steps.map((paso) => {
            return (
              <div className='info' key={paso.number}>
                {`⚫ STEP ${paso.number}: ${paso.step} `} <br />
              </div>
            );
          });
    } else { pasos = recipe.steps}

    return (
        <div className='detail'>

                {componentLoaded ? (
                    <>
                <Link to='/home'>
                <button className='b'> Home</button>
                </Link>
                <h2 className='info'>ID: {recipe.id}</h2>
                <h2 className='info'>Name: {recipe.title}</h2>
                <img className='img' src={recipe.image} alt=""/>
                <h2 className='info'>Summary: {recipe.summary}</h2>
                <h2 className='info'>Health Score: {recipe.healthScore}</h2>
                <h2 className='info'>Diets: {dieta}</h2>
                
                <h2 className='info'>Steps</h2>
                {pasos}
                </>
                ) : <h1>Loading...</h1>}
                
        </div>
    );
};