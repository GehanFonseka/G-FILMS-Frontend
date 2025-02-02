import "./App.css";
import api from "./api/axiosConfig";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import Trailer from "./components/trailer/Trailer";
import Reviews from "./components/reviews/Reviews";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import NotFound from "./components/notFound/NotFound";
import WishlistPage from "./components/wishlist/WishlistPage";

function App() {
    const [movies, setMovies] = useState([]);
    const [movie, setMovie] = useState();
    const [reviews, setReviews] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [authToken, setAuthToken] = useState(localStorage.getItem("token") || null);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        setAuthToken(null);
        navigate("/login");
    };

    const addToWishlist = (movie) => {
        setWishlist((prevWishlist) => [...prevWishlist, movie]);
    };

    const removeFromWishlist = (movieId) => {
        setWishlist((prevWishlist) => prevWishlist.filter((movie) => movie.imdbId !== movieId));
    };

    const getMovies = async () => {
        try {
            const response = await api.get("/api/v1/movies");
            setMovies(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const getMovieData = async (movieId) => {
        try {
            const token = localStorage.getItem("token"); // Get the token from localStorage

            const response = await api.get(`/api/v1/movies/${movieId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const singleMovie = response.data;
            setMovie(singleMovie);
            setReviews(singleMovie.reviews);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getMovies();
    }, []);

    return (
        <div className="App">
            <Header authToken={authToken} onLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<Home movies={movies} addToWishlist={addToWishlist} />} />
                    <Route path="/Trailer/:ytTrailerId" element={<Trailer />} />
                    <Route path="/Reviews/:movieId" element={<Reviews getMovieData={getMovieData} movie={movie} reviews={reviews} setReviews={setReviews} />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/login" element={<Login setAuthToken={setAuthToken} />} />
                    <Route path="/register" element={<Register />} />
                    {authToken ? (
                        <Route path="/Wishlist" element={<WishlistPage wishlistMovies={wishlist} removeFromWishlist={removeFromWishlist} />} />
                    ) : (
                        <Route path="/Wishlist" element={<Login setAuthToken={setAuthToken} />} />
                    )}
                </Route>
            </Routes>
        </div>
    );
}

export default App;
