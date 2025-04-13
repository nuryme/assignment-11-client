import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    cssEase: "linear",
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div className="hero justify-center relative bg-[url('https://i.pinimg.com/736x/c7/d1/f5/c7d1f523fd973e8a11207bda0ecd0230.jpg')]">
          <div className="absolute top-0 right-0 bottom-0 left-0 opacity-60 bg-black "></div>
          <div className="hero-content text-neutral-content text-center min-h-[calc(100vh-285px)]">
            <div className="max-w-xl">
              <h1 className="mb-5 text-5xl font-bold">Lost Something? </h1>
              <h1 className="mb-5 text-5xl font-bold">Found Something?</h1>
              <h1 className="mb-5 text-5xl font-bold"> Let's Reconnect!</h1>
              <p className="mb-5">
                Easily report lost items or browse found ones. Join our
                community to help reunite people with their belongings—one item
                at a time.
              </p>
              <button className="primaryBtn">Get Started</button>
            </div>
          </div>
        </div>
        <div className="hero relative bg-[url('https://i.pinimg.com/736x/61/c5/e2/61c5e22f028da9aecd8cdf7cafa046e7.jpg')]">
          <div className="absolute top-0 right-0 bottom-0 left-0 opacity-60 bg-black "></div>
          <div className="hero-content text-neutral-content text-center min-h-[calc(100vh-285px)]">
            <div className="max-w-xl">
              <h1 className="mb-5 text-5xl max-w-md mx-auto font-bold leading-16">
                Bring Lost Things Home Again{" "}
              </h1>
              <p className="mb-5">
                Easily report lost items or browse found ones. Join our
                community to help reunite people with their belongings—one item
                at a time.
              </p>
              <button className="primaryBtn">Get Started</button>
            </div>
          </div>
        </div>
        <div className="hero relative bg-[url('https://i.pinimg.com/736x/b6/d0/99/b6d0994c14f5f427f5c5809718caa074.jpg')]">
          <div className="absolute top-0 right-0 bottom-0 left-0 opacity-60 bg-black "></div>
          <div className="hero-content text-neutral-content text-center min-h-[calc(100vh-285px)]">
            <div className="max-w-xl">
              <h1 className="mb-5 text-5xl max-w-md mx-auto font-bold leading-16">
                Smart Way to Find What’s Lost{" "}
              </h1>
              <p className="mb-5">
                Easily report lost items or browse found ones. Join our
                community to help reunite people with their belongings—one item
                at a time.
              </p>
              <button className="primaryBtn">Get Started</button>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Banner;
