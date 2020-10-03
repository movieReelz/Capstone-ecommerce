import React, { useState, useEffect } from "react";
import "./MovieList.css";
import MovieCard from "./MovieCard";
import { getAllMovies } from "../../api";

const MovieList = ({ searchInput, setSearchInput }) => {
  const [movies, setMovies] = useState([]);

  async function fetchData() {
    const result = await getAllMovies();
    console.log("Here are the Movies:", result);
    setMovies(result.allMovies);
  }

  useEffect(() => {
    fetchData();
  }, [searchInput]);

  return (
    <>
      <div className="movie-container">
        <div className="movie-flex">
          {movies
            .filter((movie) => {
              const title = movie.title.toLowerCase();
              if (title.includes(searchInput.toLowerCase())) {
                return true;
              } else {
                return false;
              }
            })
            .map((movie, index) => (
              <MovieCard
                movies={movies}
                id={movie.id}
                // setMovies={setMovies}
                key={index}
                title={movie.title}
                year={movie.year}
                rating={movie.rating}
                price={movie.price}
                image={movie.img_url}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default MovieList;
