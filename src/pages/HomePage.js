import React from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MovieList from "../components/MovieList";
import apiService from "../app/apiService";

function HomePage() {
  // const auth = useAuth();
  // let navigate = useNavigate();

  // if (!auth.user) {
  //   return <p></p>;
  // }

  const [popMovies, setPopMovies] = useState([]);
  const [nowMovies, setNowMovies] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getMovies = async (category, setter) => {
      try {
        const res = await apiService.get(`${category}`, {
          params: { language: "en-US", page: 1 },
        });
        setter(res.data.results);
      } catch (error) {
        console.error(`Error fetching ${category}:`, error);
      }
    };
    getMovies("popular", setPopMovies);
    getMovies("now_playing", setNowMovies);
  }, []);
  return (
    <div>
      <MovieList movies={popMovies} title="Popular Movies"></MovieList>
      <MovieList movies={nowMovies} title="Trending"></MovieList>
    </div>
  );
}

export default HomePage;
