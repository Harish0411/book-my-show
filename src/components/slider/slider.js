import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import '../style.scss'

const Sliders = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows:false
      };

 let images = [
    'https://assets-in.bmscdn.com/promotions/cms/creatives/1680804790307_zoomweb.jpg',
    'https://assets-in.bmscdn.com/promotions/cms/creatives/1680271399724_web.jpg',
    'https://assets-in.bmscdn.com/promotions/cms/creatives/1681123745909_webbannernpa.jpg',
    'https://assets-in.bmscdn.com/promotions/cms/creatives/1682671002838_gvprakashkumardesktop.jpg',
    'https://assets-in.bmscdn.com/promotions/cms/creatives/1682489159541_pradeepkumarsneekavithaigalalivedesktop.jpg'
 ]

  return (
     <div className='slider-sec'>
        <Slider {...settings}>
        {images.map((val,idx) => (
            <div key={idx} className='slider-image'>
                <img src={val}  alt='bookmyshow'/>
            </div>
        ))}
        </Slider>
    </div>
  )
}

export default Sliders