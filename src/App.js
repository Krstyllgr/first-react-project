import { useEffect, useState } from "react";

import './App.css';
import SearchIcon from './search.svg';
import MovieCard from "./MovieCard";

const api_URL = 'http://www.omdbapi.com?apikey=d9fd1120';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState(``);

  const searchMovie = async (movieTitle) => {
    const response = await fetch(`${api_URL}&s=${movieTitle}`);
    const data = await response.json();

    setMovies(data.Search);
  }
    useEffect(() => {
      searchMovie('Thunder');
    }, []);

  return (
    <div className="app">
      <h1>Movie Hub</h1>

      <div className="search">
        <input
        placeholder="Search For Movies"
        value={searchTerm}
        onChange={(e) => {setSearchTerm(e.target.value)}}
        />
        <img
          src={SearchIcon}
          alt="Search"
          onClick={() => searchMovie(searchTerm)}
        />
      </div>

      {movies?.length > 0 
        ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard movie={movie}/>
              ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No Movies Found</h2> 
          </div>
        )
      }
    </div>
  );
}

export default App;