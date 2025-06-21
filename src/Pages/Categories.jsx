import { useEffect, useState } from "react";
import { getGenres, getMoviesByGenre } from "../services/api";
import { MovieCard } from "../components/MovieCard";
import "../css/Categories.css";

function Categories() {
  const [genres, setGenres] = useState([]);
  const [selectedGenreId, setSelectedGenreId] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const genresList = await getGenres();
        setGenres(genresList);
        if (genresList.length > 0) setSelectedGenreId(genresList[0].id);
      } catch (err) {
        setError("Failed to load genres.");
      }
    };
    loadGenres();
  }, []);

  useEffect(() => {
    if (!selectedGenreId) return;

    const loadMovies = async () => {
      setLoading(true);
      try {
        const moviesByGenre = await getMoviesByGenre(selectedGenreId);
        setMovies(moviesByGenre);
        setError(null);
      } catch {
        setError("Failed to load movies by genre.");
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [selectedGenreId]);

  return (
    <div className="categories-page">
      <h2 className="section-heading">Movie Categories</h2>
      <div className="genres-list">
        {genres.map((genre) => (
          <button
            key={genre.id}
            className={genre.id === selectedGenreId ? "active" : ""}
            onClick={() => setSelectedGenreId(genre.id)}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Categories;
