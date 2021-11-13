import React, { useState } from 'react';
import { MovieItem } from '../MovieItem/MovieItem';
import "./index.css"; 

export const SearchMovie = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const SearchMovies = async (e) => {
    e.preventDefault();
    console.log('submitting');

    const url = `https://api.themoviedb.org/3/search/movie?api_key=2daa4df094e8597359599d81734c77ae&language=en-US&query=${query}&page=1&include_adult=false`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form className="form-search" onSubmit={SearchMovies}>
        <label className="label" htmlFor="query">
        </label>
        <input
          className="input"
          type="text"
          name="query"
          placeholder="Search a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="button">Search</button>
      </form>
      <div className="card-list">
        {movies
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <MovieItem movie={movie} key={movie.id} title={movie.title} release_date={movie.release_date} 
            poster_path={movie.poster_path} vote_average={movie.vote_average} id = {movie.id}/>
          ))}
      </div>
    </>
  );
}