import React, { useState, useEffect } from "react";
import img1 from "../assets/passport.jpeg";
import img2 from "../assets/pfa-logo.jpeg";
import img3 from "../assets/ROSE.jpg";
import "../App.css";

const images = [img1, img2, img3];

export default function Carousel() {
  const [index, setIndex] = useState(0);

  // Change image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel">
      <img src={images[index]} alt="carousel" className="carousel-image" />
    </div>
  );
}
