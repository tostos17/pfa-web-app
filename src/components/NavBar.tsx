import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface ToggleFunction {
  onClick?: React.MouseEventHandler<SVGSVGElement>; 
}

const NavBar : React.FC<ToggleFunction> = ({onClick}) => {

  return (
      <nav className='nav-bar'>
        <ul>
            <li><a href="/">home</a></li>
            <li><a href="/">about us</a></li>
            <li><a href="/">login</a></li>
        </ul>
        <div className="fa-times"><FontAwesomeIcon icon={faTimes} onClick={onClick} /></div>
    </nav>
  )
}

export default NavBar
