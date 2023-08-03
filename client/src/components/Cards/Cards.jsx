import './Cards.css';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Card from '../Card/Card';
import SearchBar from '../SearchBar/SearchBar';
import * as actions from '../../redux/actions';

function Cards({ diets, getDiets, getAll, filteredByDiets, filteredBySource,
                orderedByName, orderedByScore, allTheRecipes }) {

        useEffect(() => {
             getAll('');
             getDiets();
          }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const recipesPerPage = 9;

    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = allTheRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    const totalPages = Math.ceil(100 / recipesPerPage);

    const nextPage = () => { setCurrentPage(currentPage + 1) };

    const prevPage = () => { setCurrentPage(currentPage - 1) };

    const handleFilterByDiets = (event) => { filteredByDiets(event.target.value) };
    
    const handleFilterBySource = (event) => { filteredBySource(event.target.value) };

    const handleOrderByName = (event) => { orderedByName(event.target.value) };

    const handleOrderByScore = (event) => { orderedByScore(event.target.value) };

    return(<>
    
    <div className='buttons'>
      <SearchBar getAll={getAll}/>
      <button className="bpage" onClick={prevPage} disabled={currentPage === 1}>« Prev.</button>
      <span className="bpage">{currentPage} of {totalPages}</span>
      <button className="bpage" onClick={nextPage} disabled={indexOfLastRecipe >= allTheRecipes.length}>Next »</button>
      <div className='cool-div'>
        
        <select className="select" onChange={handleFilterByDiets}>
            <option className="option" value="All">All Diets</option>
            {diets.map(({ name }) => {
                
               return (
                  <option className="option" value={name} key={name}>{name}</option>
               )
            })}
        </select>
        
        <select className="select" onChange={handleFilterBySource}>
            <option className="option" value="All">Sources</option>
            <option className="option" value="API">From Api</option>
            <option className="option" value="DB">From DataBase</option>
        </select>
        <select className="select" onChange={handleOrderByName}>
            <option className="option">ABC Order</option>
            <option className="option" value="A">Ascendant</option>
            <option className="option" value="D">Descendant</option>
        </select>
        <select className="select" onChange={handleOrderByScore}>
            <option className="option" value="W">Health Score</option>
            <option className="option" value="Y">Min To Max</option>
            <option className="option" value="N">Max To Min</option>
        </select>
        </div>
        <div className='list'>
      {currentRecipes.map(({ id, title, diets, image }) => {
         return (
            <Card
            key = {id} 
            id = {id}
            name = {title}
            diets = {diets}
            image = {image}
            />
            );
         })}
         </div>
         <button className="bpage" onClick={prevPage} disabled={currentPage === 1}>« Prev.</button>
         <span className="bpage">{currentPage} of {totalPages}</span>
         <button className="bpage" onClick={nextPage} disabled={indexOfLastRecipe >= allTheRecipes.length}>Next »</button>
   </div>
    </>)
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAll: (name) => dispatch(actions.getAll(name)),
        filteredByDiets: (value) => dispatch(actions.filteredByDiets(value)),
        filteredBySource: (value) => dispatch(actions.filteredBySource(value)),
        orderedByName: (value) => dispatch(actions.orderedByName(value)),
        orderedByScore: (value) => dispatch(actions.orderedByScore(value))
    }
};

const mapStateToProps = (state) => {
    return { allTheRecipes: state.allTheRecipes }
};

export default connect( mapStateToProps, mapDispatchToProps )(Cards);