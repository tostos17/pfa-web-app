import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/UserContext";
import { Link } from "react-router-dom";

interface ToggleFunction {
  onClick?: React.MouseEventHandler<SVGSVGElement>; 
}

const NavBar : React.FC<ToggleFunction> = ({onClick}) => {

  const {user} = useAuth();

  return (
      <nav className='nav-bar'>
        <ul>
            <li><Link to="/">home</Link></li>
            <li><Link to="/reg">Register Player</Link></li>
            <li><Link to="/players">View Players</Link></li>
            {user ? <li><a href="/logout">logout</a></li> : <li><a href="/login">login</a></li>}
        </ul>
        <div className="fa-times"><FontAwesomeIcon icon={faTimes} onClick={onClick} /></div>
    </nav>
  )
}

export default NavBar
