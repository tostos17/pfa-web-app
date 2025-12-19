import { useState, useEffect } from "react";
import img1 from "../assets/a1.jpeg";
import img2 from "../assets/a2.jpeg";
import img3 from "../assets/a3.jpeg";
import img4 from "../assets/a4.jpeg";
import img5 from "../assets/a5.jpeg";
import img6 from "../assets/a6.jpeg";
import "../App.css";

const images = [img1, img2, img3, img4, img5, img6];

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
