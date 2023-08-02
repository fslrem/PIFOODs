import './Landing.css';
import { Link } from "react-router-dom";

export default function Landing() {
    return(
    <div className='container-title'>
    <h1>FOODs PROJECT</h1>
    <img className="im" src="https://cdn-icons-png.flaticon.com/512/706/706195.png" alt="img" />
    <Link to="/home"><button>Start</button></Link>
    </div>)
}