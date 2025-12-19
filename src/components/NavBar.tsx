import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/UserContext";

interface ToggleFunction {
  onClick?: React.MouseEventHandler<SVGSVGElement>; 
}

const NavBar : React.FC<ToggleFunction> = ({onClick}) => {

  const {user} = useAuth();

  return (
      <nav className='nav-bar'>
        <ul>
            <li><a href="/">home</a></li>
            <li><a href="/">about us</a></li>
            {user ? <li><a href="/logout">logout</a></li> : <li><a href="/login">login</a></li>}
        </ul>
        <div className="fa-times"><FontAwesomeIcon icon={faTimes} onClick={onClick} /></div>
    </nav>
  )
}

export default NavBar
