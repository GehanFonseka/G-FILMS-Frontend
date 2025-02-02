import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";

const Header = ({ authToken, onLogout }) => {
  const navigate = useNavigate();

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      style={{
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
        padding: "10px 0",
        marginTop: "-10px",
      }}
    >
      <Container fluid>
        <Navbar.Brand
          as={NavLink}
          to="/"
          style={{
            color: "gold",
            fontSize: "1.6rem",
            fontWeight: "bold",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
            padding: "0 10px",
            textDecoration: "none",
          }}
        >
          <FontAwesomeIcon icon={faVideoSlash} /> G-Films
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
            <NavLink
              to="/"
              style={({ isActive }) => ({
                fontSize: "1rem",
                padding: "10px 15px",
                transition: "transform 0.3s ease",
                color: isActive ? "#f5a623" : "white",
                transform: isActive ? "scale(1.1)" : "scale(1)",
                textShadow: isActive ? "0 0 10px rgba(255, 165, 35, 0.6)" : "none",
                textDecoration: "none",
              })}
            >
              Home
            </NavLink>
            {authToken && (
              <NavLink
                to="/Wishlist"
                style={({ isActive }) => ({
                  fontSize: "1rem",
                  padding: "10px 15px",
                  transition: "transform 0.3s ease",
                  color: isActive ? "#f5a623" : "white",
                  transform: isActive ? "scale(1.1)" : "scale(1)",
                  textShadow: isActive ? "0 0 10px rgba(255, 165, 35, 0.6)" : "none",
                  textDecoration: "none",
                })}
              >
                Watch List
              </NavLink>
            )}
          </Nav>
          {authToken ? (
            <Button
              variant="outline-danger"
              className="me-2"
              style={{
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              onClick={onLogout}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button
                variant="outline-info"
                className="me-2"
                style={{
                  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                onClick={() => navigate("/Login")}
              >
                Login
              </Button>
              <Button
                variant="outline-info"
                style={{
                  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                onClick={() => navigate("/Register")}
              >
                Register
              </Button>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
