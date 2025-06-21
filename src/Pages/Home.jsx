import { MovieCard } from "../components/MovieCard";
import { useState, useEffect } from "react";
import { SearchMovies, getPopularMovies } from  "../services/api";
import "../css/Home.css";
import TrendingCarousel from "./TrendingCarousel";


function Home() {
  const [searchQuary, setSearchQuary] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Track current page
  const [hasMore, setHasMore] = useState(true); // To control Load More button

  useEffect(() => {
    // Load first page of popular movies on mount
    const loadPopularMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const popularMovies = await getPopularMovies(1);
        setMovies(popularMovies);
        setPage(1);
        setHasMore(popularMovies.length > 0);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  const loadMoreMovies = async () => {
    if (loading) return;

    setLoading(true);
    setError(null);
    try {
      const nextPage = page + 1;
      const moreMovies = await getPopularMovies(nextPage);
      if (moreMovies.length === 0) {
        setHasMore(false); // No more movies to load
      } else {
        setMovies(prevMovies => [...prevMovies, ...moreMovies]);
        setPage(nextPage);
      }
    } catch (err) {
      console.log(err);
      setError("Failed to load more movies...");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuary.trim()) return;
    if (loading) return;

    setLoading(true);
    setError(null);
    try {
      const searchResults = await SearchMovies(searchQuary);
      setMovies(searchResults);
      setHasMore(false); // Disable load more when showing search results
    } catch (err) {
      console.log(err);
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
       <TrendingCarousel />
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="search for movies..."
          className="search-input"
          value={searchQuary}
          onChange={(e) => setSearchQuary(e.target.value)}
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      {error && <div className="error-message">{error}</div>}

      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {loading && <div className="loading">Loading...</div>}

      {!loading && hasMore && !searchQuary.trim() && (
        <button onClick={loadMoreMovies} className="load-more-button">
          Load More
        </button>
      )}
    </div>
  );
}

export default Home;
