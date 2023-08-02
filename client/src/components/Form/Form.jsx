import './Form.css';
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import * as actions from '../../redux/actions';

export default function Form({ diets }) {
    const [formData, setFormData] = useState({
        title: '',
        image: '',
        summary: '',
        healthScore: 0,
        steps: '',
        name: ''
    });

    const [errors, setErrors] = useState({
        title: true,
        image: true,
        summary: true,
        healthScore: true,
        steps: true,
        name: true
    });

    const dispatch = useDispatch();
    
    useEffect(() => {
        Object.values(errors).some((error) => error);
    }, [errors]);

    const handleInputChange = (event) => {
        const { value, name } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });

        const newErrors = { ...errors };

        if (name === 'title') {
            newErrors.title = value.length > 50 || value.length === 0;
        }

        if (name === 'image') {
            newErrors.image = value.length > 400 || value.length === 0;
        }

        if (name === 'summary') {
            newErrors.summary = value.length > 200 || value.length === 0;
        }

        if (name === 'steps') {
            newErrors.steps = value.length > 1500 || value.length === 0;
        }

        if (name === 'healthScore') {
            newErrors.healthScore = value < 0 || value > 100;
        }

        if (name === 'name') {
            newErrors.name = value === 'All';
        }

        setErrors(newErrors);
    };

    const validForm = !Object.values(errors).some((error) => error);

    const submitHandler = (event) => {
        event.preventDefault();

        if (validForm) {
            dispatch(actions.createRecipe(formData));
        } else {
            console.log('Hay errores en los campos');
        }
    };

    console.log(formData)

    return (
        <form onSubmit={submitHandler}>
        <h1>your recipe HERE!</h1>
            <div className="form">
                
                <label className="name"> Name: </label>
                <input className="input" type="text" name="title" onChange={handleInputChange} />
                {errors.title && <p style={{ color: 'red' }}>Nombre Inválido</p>}

                <br />

                <label className="name">Image:</label>
                <input className="input" type="text" name="image" onChange={handleInputChange} />
                {errors.image && <p style={{ color: 'red' }}>La imagen no es válida</p>}

                <br />

                <label className="name">Summary: </label>
                <textarea className="input" name="summary" onChange={handleInputChange} />
                {errors.summary && <p style={{ color: 'red' }}>Falta el resumen de su receta</p>}

                <br />

                <label className="name"> Steps: </label>
                <textarea className="input" name="steps" onChange={handleInputChange} />
                {errors.steps && <p style={{ color: 'red' }}>Faltan los pasos de su receta</p>}
                <br />

                <label className="name"> Health Score: </label>
                <input className="input" type="number" name="healthScore" onChange={handleInputChange} />
                {errors.healthScore && <p style={{ color: 'red' }}>Puntúe del 1 al 100</p>}

                <br />

                <label className="name"> Diets: </label>
                <select name="name" className="select" onChange={handleInputChange}>
                    <option className="option" value="All">Diets</option>
                    {diets.map(({ id, name }) => (
                        <option className="option" value={name} key={id}>{name}</option>
                    ))}
                </select>
  
                {errors.name && <p style={{ color: 'red' }}>Seleccione una dieta</p>}

                <br />

                <button className="newrecipe" type="submit" disabled={!validForm}>Create New Recipe</button>
                {!validForm && <p style={{ color: 'red' }}> Revise los campos! </p>}

                <Link to={'/home'}>
                    <button className="newrecipe">Home</button>
                </Link>
            </div>
        </form>
    );
}