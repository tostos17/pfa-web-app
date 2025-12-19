import { useContext, useState } from "react";
import Title from './Title'
import NavBar from './NavBar'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/UserContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {user} = useAuth();
  console.log(user);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className='header-container'>
        <Title />
        {user && <p>Hello, {user?.name}</p>}
        {isOpen && <NavBar onClick={toggleMenu}/>}
        {!isOpen && <FontAwesomeIcon icon={faBars} onClick={toggleMenu} />}
    </header>
  )
}

export default Header
