import Slider from "react-slick";
import { useEffect, useState } from "react";
import { getTrendingMovies } from "../services/api";
import { MovieCard } from "../components/MovieCard"; 
import "../css/TrendingCarousel.css";

function TrendingCarousel() {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      const data = await getTrendingMovies();
      setTrending(data.slice(0, 10)); // top 10 trending
    };
    fetchTrending();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  return (
    <div className="trending-carousel">
      <h2>Trending Movies</h2>
      

      {/* 🔽 Add this section BELOW the slider to mimic Netflix-style ranked cards */}
      <div className="trending-grid">
        {trending.map((movie, index) => (
          <div key={movie.id} className="trending-grid-item">
            <MovieCard movie={movie} rank={index + 1} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrendingCarousel;
