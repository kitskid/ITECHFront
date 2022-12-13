import React from "react";
import Slider from "react-slick";
import Banner from "../banner/Banner";


const SliderTest = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  

    return (
        <Slider {...settings}>
          <div className="div_slider">
            <Banner />
            
          </div>
          <div className="div_slider">
          <Banner />
           
          </div>
          <div className="div_slider">
          <Banner />
            
          </div>
          <div className="div_slider">
            
          <Banner />
          </div>
          <div className="div_slider">
            
          <Banner />
          </div>
          <div className="div_slider">
            
          <Banner />
          </div>
        </Slider>      
    )
}

export default SliderTest