import './Home.css';
import Cards from '../Cards/Cards';

export default function Home({recipes, onSearch, diets, getDiets}) {
    return(<>
    <div>
    <h1>Search your RECIPES here!</h1>
    <div className='cards'>
    <Cards recipes={recipes} onSearch={onSearch} diets={diets} getDiets={getDiets} />
    </div>
    </div>
    <br/>
    <br/>
    <br/>
    <br/>
    <footer><p>R.M. - All rigths reserved®</p></footer>
    </>)
}