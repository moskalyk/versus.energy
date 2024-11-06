import { useState, useEffect } from 'react';
import './App.css';
import defaultImageY from './assets/Y/default_y.png';
import defaultImageX from './assets/X/default_x.png';
import { Swiper, SwiperSlide } from 'swiper/react';
// @ts-ignore
import 'swiper/css';

function App() {
  const imagesY = import.meta.glob('./assets/Y/*.png', { eager: true });
  const imagesX = import.meta.glob('./assets/X/*.png', { eager: true });
  
  const shuffleArray = (array: any) => array.sort(() => Math.random() - 0.5);

  // Separate the default image and shuffle the remaining images
  // @ts-ignore
  const imageArrayY = [defaultImageY, ...shuffleArray(Object.values(imagesY).map((module) => module.default))];
  
  // @ts-ignore
  const imageArrayX = [defaultImageX, ...shuffleArray(Object.values(imagesX).map((module) => module.default))];

  const [shuffledImagesY, setShuffledImagesY] = useState(imageArrayY);
  const [shuffledImagesX, setShuffledImagesX] = useState(imageArrayX);
  const [imageIndexY, setImageIndexY] = useState(0);
  const [imageIndexX, setImageIndexX] = useState(0);

  useEffect(() => {
    if (imageIndexY >= shuffledImagesY.length) {
      // @ts-ignore
      setShuffledImagesY([defaultImageY, ...shuffleArray(Object.values(imagesY).map((module) => module.default))]);
      setImageIndexY(0);
    }
  }, [imageIndexY, shuffledImagesY]);

  useEffect(() => {
    if (imageIndexX >= shuffledImagesX.length) {
      // @ts-ignore
      setShuffledImagesX([defaultImageX, ...shuffleArray(Object.values(imagesX).map((module) => module.default))]);
      setImageIndexX(0);
    }
  }, [imageIndexX, shuffledImagesX]);

  const handleImageClickY = () => {
    setImageIndexY((prevIndex) => prevIndex + 1);
  };

  const handleImageClickX = () => {
    setImageIndexX((prevIndex) => prevIndex + 1);
  };

  return (
    <>
      <div>
        <p style={{ color: 'black' }}>Versus</p>
        <br />
        <p style={{ color: 'black' }}>Train against AI entropy</p>
        <br />
        <br />
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={false}
          className="mySwiper"
        >
          <SwiperSlide>
            <img
              src={shuffledImagesY[imageIndexY]}
              className="logo"
              alt="Cycling Image"
              onClick={handleImageClickY}
              style={{ width: '350px', height: '350px', cursor: 'pointer' }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={shuffledImagesX[imageIndexX]}
              className="logo"
              alt="Cycling Image"
              onClick={handleImageClickX}
              style={{ width: '350px', height: '350px', cursor: 'pointer' }}
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}

export default App;
