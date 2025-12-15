import { useState } from "react";
import Title from './Title'
import NavBar from './NavBar'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className='header-container'>
        <Title />
        {isOpen && <NavBar onClick={toggleMenu}/>}
        {!isOpen && <FontAwesomeIcon icon={faBars} onClick={toggleMenu} />}
    </header>
  )
}

export default Header
