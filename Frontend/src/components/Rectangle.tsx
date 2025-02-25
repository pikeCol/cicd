import React from 'react';
import { RectangleWrapper } from '../styles/Rectangle.modules'; // Import the correct styled component wrapper
import purptangle from '../assets/PURPTANGLE-fit@2x.png';

const Rectangle: React.FC = () => {
  return (
    <RectangleWrapper>
      <img className="custom-shape" src={purptangle} alt="Purple Rectangle" />
    </RectangleWrapper>
  );
};

export default Rectangle;
