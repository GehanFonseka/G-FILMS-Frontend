import './Hero.css';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

const Hero = ({ movies, addToWishlist }) => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  function reviews(movieId) {
    navigate(`/Reviews/${movieId}`);
  }

  const handleAddToWishlist = (movie) => {
    addToWishlist(movie);
    setMessage('Movie added to Wishlist!');
    setTimeout(() => {
      setMessage('');
    }, 3000); // Hide the message after 3 seconds
  };

  return (
    <div className="movie-carousel-container">
      <Carousel>
        {movies?.map((movie) => {
          return (
            <Paper key={movie.imdbId}>
              <div className="movie-card-container">
                <div className="movie-card" style={{ "--img": `url(${movie.backdrops[0]})` }}>
                  <div className="movie-detail">
                    <div className="movie-poster">
                      <img src={movie.poster} alt="" />
                    </div>
                    <div className="movie-title">
                      <h4>{movie.title}</h4>
                    </div>
                    <div className="movie-buttons-container">
                      <Link to={`/Trailer/${movie.trailerLink.substring(movie.trailerLink.length - 11)}`}>
                        <div className="play-button-icon-container">
                          <FontAwesomeIcon className="play-button-icon" icon={faCirclePlay} />
                        </div>
                      </Link>

                      <div className="movie-review-button-container">
                        <Button variant="info" onClick={() => reviews(movie.imdbId)} >Reviews</Button>
                      </div>

                      {/* Modern Wishlist Button */}
                      <div className="movie-wishlist-button-container">
                        <button
                          className="wishlist-button"
                          onClick={() => handleAddToWishlist(movie)}
                        >
                          <FontAwesomeIcon className="wishlist-icon" icon={faHeart} />
                          Add to Wishlist
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </Paper>
          );
        })}
      </Carousel>

      {/* Display prompt message */}
      {message && (
        <div className="wishlist-prompt-message">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default Hero;
