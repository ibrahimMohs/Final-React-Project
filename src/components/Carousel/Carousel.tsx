
import React, { useEffect } from "react";
import { Carousel } from "antd";
import { Movies } from "../../models/CarouselObject";
import "./Carousel.scss";
import { CarouselRef } from "antd/es/carousel";

interface Movies {
  imageUrl: string;
  Moviename:string;
  Director: string;
  IMDB: number;
  Genre: string;
  description: string;
}
interface ArrayProps {
  items: Movies[];
}
export const CarouselCustom: React.FC = () => {
  const carouselRef = React.createRef<CarouselRef>();
  const carouselWrapperRef = React.createRef<HTMLDivElement>();

  useEffect(() => {
    const handleWindowWheel = (event: WheelEvent) => {
      if (isChildOfCarouselWrapper(event.target as HTMLElement)) {
        event.preventDefault();
      }
    };

    window.addEventListener("wheel", handleWindowWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWindowWheel);
    };
  }, []);

  const isChildOfCarouselWrapper = (currentNode: HTMLElement): boolean => {
    if (currentNode.tagName === "BODY") {
      return false;
    }

    if (currentNode.className === "carousel-wrapper") {
      return true;
    }

    return isChildOfCarouselWrapper(currentNode.parentElement as HTMLElement);
  };

  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  const handleWheel = (event: React.WheelEvent) => {
    event.deltaY > 0
      ? carouselRef.current?.next()
      : carouselRef.current?.prev();
  };

    function item(value: { imageUrl: any; Moviename: string; Director: string; IMDB: number; Genre: string; description: string; }, index: number, array: { imageUrl: any; Moviename: string; Director: string; IMDB: number; Genre: string; description: string; }[]): unknown {
        throw new Error("Function not implemented.");
    }

    return (
        <div className="wrapper">
        <div
            onWheel={(event) => handleWheel(event)}
            className="carousel-wrapper"
            ref={carouselWrapperRef}
        >
            <Carousel
            afterChange={onChange}
            className="main-carousel"
            ref={carouselRef}
            >
                    {Movies.map((item) => (
                // <div className='main-carousel'>
                <div className="movie-card">
                <img className="carousel-image" src={item.imageUrl} />
                <div className="about-movie-container">
                    <p>Moviename:{item.Moviename}</p>
                    <p>Director:{item.Director}</p>
                    <p>IMDB:{item.IMDB}</p>
                    <p>Genre:{item.Genre}</p>
                </div>
                </div>

                // </div>
            ))}
            </Carousel>
        </div>
        </div>
    );
};
