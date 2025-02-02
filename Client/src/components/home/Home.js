import Hero from '../hero/Hero';

const Home = ({ movies, addToWishlist }) => {
  return (
    <Hero movies={movies} addToWishlist={addToWishlist} />
  );
}

export default Home;
