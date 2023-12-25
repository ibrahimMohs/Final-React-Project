import '../Carousel/Carousel.scss';
import { Carousel } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Animation from '../Animation/Animation';

// Define the structure of a movie object based on the API response
interface Movie {
  id: number;
  title: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  backdrop_path: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  vote_average: number;
  overview: string;
}

const CarouselCustom: React.FC = () => {
  const [latestMovies, setLatestMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const carouselRef = useRef<any>(null);

  useEffect(() => {
    const fetchLatestMovies = async () => {
      const apiKey = 'f1a02268af3a2e076dc84ca1a6aaaefe';
      setIsLoading(true);
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`);
        setLatestMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching latest movies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestMovies();
  }, []);

  const onChange = (currentSlide: number) => {
    console.log('Current slide is:', currentSlide);
  };

  // This is an example of a handler for the mouse wheel event
  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.deltaY > 0 ? carouselRef.current?.next() : carouselRef.current?.prev();
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <Animation />
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="carousel-wrapper" onWheel={handleWheel}>
        <Carousel afterChange={onChange} ref={carouselRef}>
          {latestMovies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <div className="about-movie-container">
                <h2>{movie.title}</h2>
                <div className="rating">
                  <h3>Rating:</h3> {movie.vote_average}
                </div>
                <p>{movie.overview}</p>
              </div>
              <div className="img-wrapper">
                <img className="carousel-image" src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} />
                <div className="img-gradient"></div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default CarouselCustom;
