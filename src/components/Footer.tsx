import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faInstagram,
  faFacebook
} from "@fortawesome/free-brands-svg-icons";


const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer top-container">
      <div className="footer-content">
        <p className="footer-text">
          © {year} Pioneers Football Academy. All rights reserved.
        </p>

        <div className="social-links">
          
          <a
            href="http://www.youtube.com/@PioneersFA"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <FontAwesomeIcon icon={faYoutube} />
          </a>

          <a
            href="https://www.instagram.com/pioneersfootballacademy?igsh=cjcxdzJ5YXNob3I2"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>

          <a
            href="https://www.facebook.com/profile.php?id=61577776820310"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
