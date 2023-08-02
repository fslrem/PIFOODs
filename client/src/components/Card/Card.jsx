import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

export default function Card({ id, name, diets, image }) {

    let dieta  
    if(Array.isArray(diets)){dieta = diets.map((diet) => {return `${diet} -` })
    } else{ dieta = diets}

    return (
        <div className='card'>

            <div className='imgd'>
            <img className='img' src={image} alt="" />
            </div>

            <div className='name'>
            <Link to={`/detail/${id}`}>
            <h2>{name}</h2>
            </Link>
            </div>

            <div className='diets'>
                
            <h2>Diets: {dieta}</h2>
            </div>

        </div>
    );
};