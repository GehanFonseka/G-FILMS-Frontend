import './WishlistPage.css';
import { Paper } from '@mui/material';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

const WishlistPage = ({ wishlistMovies, removeFromWishlist }) => {
  const navigate = useNavigate();

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="wishlist-page-container">
      <h2 className="wishlist-title">My Wishlist</h2>
      <div className="wishlist-container">
        {wishlistMovies?.length > 0 ? (
          wishlistMovies.map((movie) => (
            <Paper key={movie.imdbId} elevation={3} className="wishlist-item">
              <div className="wishlist-item-content">
                <div
                  className="wishlist-item-image"
                  style={{ backgroundImage: `url(${movie.poster})` }}
                  onClick={() => handleMovieClick(movie.imdbId)}
                ></div>
                <div className="wishlist-item-details">
                  <h4>{movie.title}</h4>
                  <p>{movie.description}</p>
                </div>
                <Button
                  variant="danger"
                  onClick={() => removeFromWishlist(movie.imdbId)}
                >
                  <FontAwesomeIcon icon={faTrash} /> Remove
                </Button>
              </div>
            </Paper>
          ))
        ) : (
          <div className="empty-wishlist-message">
            <p>Your wishlist is empty</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
