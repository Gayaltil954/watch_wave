import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";

export function MovieCard({ movie, rank }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);

  function onFavoriteClick(e) {
    e.preventDefault();
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  }

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        {/* 👉 Add rank badge overlay */}
        {rank && <div className="rank-badge">{rank}</div>}

        <div className="movie-overlay">
          <button
            className={`favorite-btn ${favorite ? "active" : ""}`}
            onClick={onFavoriteClick}
          >
            🤍
          </button>
        </div>
      </div>

      <div className="movie-info">
        <div className="movie-title">{movie.title}</div>
        <div className="movie-rating">⭐ {movie.vote_average}</div>
      </div>
    </div>
  );
}
