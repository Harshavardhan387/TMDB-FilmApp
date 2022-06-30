import { Modal, Button, Card, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import "./moviecard.css";
const API_IMG = "https://image.tmdb.org/t/p/w500/";

const MovieCard = ({
  title,
  poster_path,

  vote_average,
  release_date,
  overview,
}) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <Card style={{ width: "15rem" }} className="main-card">
      <Card.Img
        variant="top"
        src={API_IMG + poster_path}
        alt="img"
        height="250px"
      />
      <Card.Body style={{ height: "6rem" }}>
        <Card.Title className="card-title">{title}</Card.Title>
        <Button
          onClick={handleShow}
          className="card-btn"
          style={{ borderRadius: "50%" }}
        >
          <FontAwesomeIcon
            icon={faPlay}
            style={{
              backgroundImage:
                "linear-gradient(to bottom right, #FF9966, #FF5E62)",
              fontSize: "1.5rem",
            }}
          />
        </Button>
        <Modal
          show={show}
          onHide={handleClose}
          className="modal-main"
          style={{ width: "100%" }}
        >
          <Modal.Header
            closeButton
            style={{ backgroundColor: "rgb(34, 29, 29)" }}
          >
            <Modal.Title className="modal-title">
              <Navbar.Brand href="/home" className="navbar-brand">
                {" "}
                <h2
                  style={{
                    fontWeight: "bolder",
                    backgroundColor: "rgb(34, 29, 29)",
                  }}
                >
                  <span
                    style={{
                      color: "orangered",
                      backgroundColor: "rgb(34, 29, 29)",
                    }}
                  >
                    I
                  </span>
                  nsta Pl
                  <span
                    style={{
                      color: "orangered",
                      backgroundColor: "rgb(34, 29, 29)",
                    }}
                  >
                    a
                  </span>
                  y
                </h2>
              </Navbar.Brand>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body">
            <img
              className="card-img-top"
              style={{ width: "17rem" }}
              src={API_IMG + poster_path}
              alt="movie-card"
            />
            <h3
              style={{
                color: "whitesmoke",
                backgroundColor: "rgb(34, 29, 29)",
              }}
            >
              {title}
            </h3>
            <h4>
              {" "}
              <span
                style={{
                  color: "orangered",
                  backgroundColor: "rgb(34, 29, 29)",
                }}
              >
                IMDb:
              </span>{" "}
              {vote_average}
            </h4>
            <h5>
              <span
                style={{
                  color: "orangered",
                  backgroundColor: "rgb(34, 29, 29)",
                }}
              >
                Release Date:
              </span>{" "}
              {release_date}
            </h5>
            <br></br>
            <h5
              style={{
                color: "orangered",
                backgroundColor: "rgb(34, 29, 29)",
              }}
            >
              Overview
            </h5>
            <p>{overview}</p>
          </Modal.Body>
          <Modal.Footer className="modal-footer">
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;
