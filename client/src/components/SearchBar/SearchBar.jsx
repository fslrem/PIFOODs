import './SearchBar.css';
import { useState } from "react";
import { Link } from 'react-router-dom';


export default function SearchBar({getAll}) {

   const [title, setTitle] = useState("");

   const handleChange = (event) => {
      setTitle(event.target.value);
   }

   const handleSearch = () => {
      if (title.trim() !== "") {
         console.log(getAll(title))
      }
   }
   
   return (
      <div className="nav">

      <div className="search">
      <Link to={'/'}>
      <label className="bhome">Foods</label>
      </Link>
      <input className="box" type='search' onChange={handleChange}/>
      <button className="button" onClick={handleSearch}>Search</button>
      </div>
      
      <Link to={'/form'}>
      <button className="button">Create New Recipe</button>
      </Link>

      </div>
   );
}