import { useState } from 'react';
import './App.css';
import defaultImage from './assets/default.png';

function App() {
  // Import all images in the assets folder
  const images = import.meta.glob('./assets/*.png', { eager: true });
  const imageArray = [defaultImage, ...Object.values(images).map((module) => module.default)]

  const [imageIndex, setImageIndex] = useState(0);

  const handleImageClick = () => {
    const randomIndex = Math.floor(Math.random() * imageArray.length);
    setImageIndex(randomIndex);
  };

  return (
    <>
      <div>
        <img
          src={imageArray[imageIndex]}
          className="logo"
          alt="Cycling Image"
          onClick={handleImageClick}
          style={{width: '400px', height: '400px', cursor: 'pointer'}}
        />
      </div>
    </>
  );
}

export default App;
