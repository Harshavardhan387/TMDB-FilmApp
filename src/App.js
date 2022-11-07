import React, { useState, useEffect } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import MovieCard from "./MovieCard";
import strangerImage from "./wallpaperflare.png";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactPaginate from "react-paginate";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

const API_URL =
  "https://api.themoviedb.org/3/movie/popular?api_key=460e16e9946dc7f1ad420f04cbd929b4";

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data.results);
      });
  }, []);

  useEffect(() => {
    const getPages = async () => {
      const res = await fetch(API_URL);
      const data = await res.json();

      setPage(data);
    };
    getPages();
  }, []);
  console.log(page);

  const searchMovie = async (e) => {
    e.preventDefault();
    console.log("Searching");
    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=460e16e9946dc7f1ad420f04cbd929b4&query=${query}`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setMovies(data.results);
    } catch (e) {
      console.log(e);
    }
  };

  const changeHandler = (e) => {
    setQuery(e.target.value);
  };

  const fetchData = async (currentPage) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/trending/all/day?api_key=460e16e9946dc7f1ad420f04cbd929b4&page=${currentPage}&limit=20`
    );
    const data = await res.json();
    return data;
  };

  const handlepageClick = async (data) => {
    console.log(data.selected);

    let currentPage = data.selected + 1;
    const datafromServer = await fetchData(currentPage);
    setPage(datafromServer);
  };

  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/home">
            {" "}
            <h2 style={{ fontWeight: "bolder" }}>
              <span style={{ color: "orangered" }}>I</span>nsta Pl
              <span style={{ color: "orangered" }}>a</span>y
            </h2>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll"></Navbar.Toggle>

          <Navbar.Collapse id="nabarScroll" className="navbar">
            <Nav
              className="me-auto my-2 my-lg-3"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>

            <Form className="d-flex" onSubmit={searchMovie} autoComplete="off">
              <FormControl
                type="search"
                placeholder="Serch Movies"
                className="me-2"
                aria-label="search"
                name="query"
                value={query}
                onChange={changeHandler}
                style={{
                  backgroundColor: "#263F61",
                  width: "350px",
                  color: "white",
                }}
              ></FormControl>
              <Button
                className="search-btn"
                type="submit"
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom right, #FF9966, #FF5E62)",
                }}
              >
                <FontAwesomeIcon
                  icon={faSearch}
                  style={{
                    backgroundImage:
                      "linear-gradient(to bottom right, #FF9966, #FF5E62)",
                    fontSize: "1.5rem",
                  }}
                />
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="main-image">
        <img
          src={strangerImage}
          class="img-fluid"
          alt="main-img"
          width="100%"
          height="auto"
          loading="lazy"
        />
      </div>
      <div className="trending">
        <h2>Trending</h2>
      </div>
      <div>
        {movies.length > 0 ? (
          <div className="container">
            <div className="grid">
              {movies.map((movieReq) => (
                <MovieCard key={movieReq.id} {...movieReq} />
              ))}
            </div>
          </div>
        ) : (
          <h2>Sorry !! No Movies Found</h2>
        )}
      </div>

      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        pageCount={6}
        onPageChange={handlepageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </>
  );
}

export default App;
