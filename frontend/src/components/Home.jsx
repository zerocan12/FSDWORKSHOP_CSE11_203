import React from 'react';
import './Home.css';
import GemniImage from '../assets/Gemini_Generated_Image_cr51vmcr51vmcr51.png';
import img1 from 'D:/FSDWORKSHOP/FSDWORKSHOP_CSE11_203/frontend/src/assets/img1.png';
import img2 from '../assets/img2.png';
const Home = () => {
  const gridImages = [
    GemniImage, img1, img2, 
    GemniImage, img1, img2,
  ];
  return (
    
      <div>
      <h1 style={{ color: 'blue', fontFamily: 'Arial', textAlign: 'center' }}>
        Welcome to the Home Page
      </h1>
      
      <div className="image-grid">
        {gridImages.map((image, index) => (
          <img 
            key={index} 
            src={image} 
            alt={`Grid item ${index + 1}`} 
            className="grid-image" 
          />
        ))}
      </div>
    </div>
  );
}

export default Home
