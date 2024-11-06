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
  const imageArrayY = [defaultImageY, ...Object.values(imagesY).map((module) => module.default)];
  const imageArrayX = [defaultImageX, ...Object.values(imagesX).map((module) => module.default)];

  const shuffleArray = (array: any) => array.sort(() => Math.random() - 0.5);

  const [shuffledImagesY, setShuffledImagesY] = useState(shuffleArray([...imageArrayY]));
  const [shuffledImagesX, setShuffledImagesX] = useState(shuffleArray([...imageArrayX]));
  const [imageIndexY, setImageIndexY] = useState(0);
  const [imageIndexX, setImageIndexX] = useState(0);

  useEffect(() => {
    if (imageIndexY >= shuffledImagesY.length) {
      setShuffledImagesY(shuffleArray([...imageArrayY]));
      setImageIndexY(0);
    }
  }, [imageIndexY, shuffledImagesY]);

  useEffect(() => {
    if (imageIndexX >= shuffledImagesX.length) {
      setShuffledImagesX(shuffleArray([...imageArrayX]));
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