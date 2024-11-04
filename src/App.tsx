import { useState } from 'react';
import './App.css';
import defaultImageY from './assets/Y/default_y.png';
import defaultImageX from './assets/X/default_x.png';
import { Swiper, SwiperSlide } from 'swiper/react';
// @ts-ignore
import 'swiper/css';

function App() {
  // Import all images in the assets folder
  const imagesY = import.meta.glob('./assets/Y/*.png', { eager: true });
  const imagesX = import.meta.glob('./assets/X/*.png', { eager: true });
  // @ts-ignore
  const imageArrayY = [defaultImageY, ...Object.values(imagesY).map((module) => module.default)]
  // @ts-ignore
  const imageArrayX = [defaultImageX, ...Object.values(imagesX).map((module) => module.default)]

  const [imageIndexY, setImageIndexY] = useState(0);
  const [imageIndexX, setImageIndexX] = useState(0);

  const handleImageClickY = () => {
    const randomIndex = Math.floor(Math.random() * imageArrayY.length);
    setImageIndexY(randomIndex);
  };

  const handleImageClickX = () => {
    const randomIndex = Math.floor(Math.random() * imageArrayX.length);
    setImageIndexX(randomIndex);
  };

  return (
    <>
      <div>
        <p style={{color: 'black'}}>Versus</p>
        <br/>
        <p style={{color: 'black'}}>Train against AI entropy</p>
        <br/>
        <br/>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          className="mySwiper"
        >
          <SwiperSlide><img
            src={imageArrayY[imageIndexY]}
            className="logo"
            alt="Cycling Image"
            onClick={handleImageClickY}
            style={{width: '350px', height: '350px', cursor: 'pointer'}}
          /></SwiperSlide>
          <SwiperSlide>
          <img
            src={imageArrayX[imageIndexX]}
            className="logo"
            alt="Cycling Image"
            onClick={handleImageClickX}
            style={{width: '350px', height: '350px', cursor: 'pointer'}}
          />
            </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}

export default App;
