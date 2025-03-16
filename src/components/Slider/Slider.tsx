import { useNavigate } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const images = [
  {
    linkToPhoto:
      'https://www.apple.com/v/iphone-16/e/images/meta/iphone-16_overview__fcivqu9d5t6q_og.png?202502271945',
    idPhone: 1,
  },
  {
    linkToPhoto:
      'https://cdn.mediainvest.uz/corecms/post-thumbnails/01J8PDTVBQJR6YE58RVSH82Y04.webp',
    idPhone: 5,
  },
  {
    linkToPhoto:
      'https://static.toiimg.com/thumb/msid-108016903,width-1280,height-720,imgsize-32124,resizemode-6,overlay-toi_sw,pt-32,y_pad-40/photo.jpg',
    idPhone: 4,
  },
];

const buttonStyle = {
  width: '70px',
  borderRadius: '10px',
  border: 0,
  background: 'black',
};

export const Slider = () => {
  const navigate = useNavigate();

  const properties = {
    prevArrow: (
      <button
        className="indicator"
        style={{ ...buttonStyle }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="#fff">
          <path d="M242 180.6v-138L0 256l242 213.4V331.2h270V180.6z" />
        </svg>
      </button>
    ),
    nextArrow: (
      <button
        className="indicator"
        style={{ ...buttonStyle }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="#fff">
          <path d="M512 256L270 42.6v138.2H0v150.6h270v138z" />
        </svg>
      </button>
    ),
  };

  return (
    <Slide {...properties}>
      {images.map((image, i) => (
        <div
          key={i}
          className="each-slide-effect slider-container">
          <div
            onClick={() =>
              navigate(`/phones/${image.idPhone}`)
            }
            className="slider-container__image"
            style={{
              backgroundImage: `url(${image.linkToPhoto})`,
              height: '600px',
            }}></div>
        </div>
      ))}
    </Slide>
  );
};
