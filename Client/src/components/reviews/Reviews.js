import React, { useEffect, useRef } from 'react'; // <-- Add this line
import api from '../../api/axiosConfig';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';
import './reviews.css';

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {
    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;
    const navigate = useNavigate(); // Hook to navigate programmatically

    useEffect(() => {
        getMovieData(movieId);
    }, [movieId]);

    const addReview = async (e) => {
        e.preventDefault();

        const rev = revText.current;
        const token = localStorage.getItem('token'); // Get the token from localStorage

        if (!token) {
            // If no token is found, alert the user and redirect to login
            alert("You must be logged in to add a review.");
            navigate("/login"); // Redirect to login page
            return;
        }

        try {
            const response = await api.post(
                "/api/v1/reviews",
                { reviewBody: rev.value, imdbId: movieId },
                {
                    headers: {
                        Authorization: `Bearer ${token}` // Send the token in the headers
                    }
                }
            );

            const updatedReviews = [...reviews, { body: rev.value }];
            rev.value = "";
            setReviews(updatedReviews);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Container>
            <Row>
                <Col><h3>Reviews</h3></Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <img src={movie?.poster} alt="" />
                </Col>
                <Col>
                    <>
                        <Row>
                            <Col>
                                <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a Review?" />
                            </Col>
                        </Row>
                        <Row>
                            <Col><hr /></Col>
                        </Row>
                    </>
                    {reviews?.map((r, index) => {
                        return (
                            <React.Fragment key={index}>
                                <Row>
                                    <Col>{r.body}</Col>
                                </Row>
                                <Row><Col><hr /></Col></Row>
                            </React.Fragment>
                        );
                    })}
                </Col>
            </Row>
            <Row><Col><hr /></Col></Row>
        </Container>
    );
};

export default Reviews;
