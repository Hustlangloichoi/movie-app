import React from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import MovieList from "../components/MovieList";
import apiService from "../app/apiService";
import { Container, Stack, Box, Alert } from "@mui/material";
import FormProvider from "../components/form/FormProvider";
import ProductFilter from "../components/ProductFilter";
import LoadingScreen from "../components/LoadingScreen";
import ProductSearch from "../components/ProductSearch";

function HomePage() {
  const [popMovies, setPopMovies] = useState([]);
  const [nowMovies, setNowMovies] = useState([]);
  const [comingMovies, setComingMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const defaultValues = {
    genres: [],
    searchQuery: "",
  };

  const methods = useForm({
    defaultValues,
  });

  const { watch, reset } = methods;
  const filters = watch();

  useEffect(() => {
    const getMovies = async (category, setter) => {
      setLoading(true);
      try {
        const res = await apiService.get(`/movie/${category}`, {
          params: { language: "en-US", page: 1 },
        });
        setter(res.data.results);
      } catch (error) {
        console.error(`Error fetching ${category}:`, error);
      }
      setLoading(false);
    };

    getMovies("popular", setPopMovies);
    getMovies("now_playing", setNowMovies);
    getMovies("upcoming", setComingMovies);
  }, []);

  return (
    <Container sx={{ display: "flex", minHeight: "100vh", mt: 3 }}>
      <Stack sx={{ overflow: "hidden" }}>
        <FormProvider methods={methods}>
          <ProductSearch onSearchResults={setSearchResults} />
        </FormProvider>
        <Box sx={{ position: "relative", height: 1 }}>
          {loading ? (
            <LoadingScreen />
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <>
              {searchResults.length > 0 ? (
                <MovieList movies={searchResults} title="Search Results" />
              ) : (
                <>
                  <MovieList movies={popMovies} title="Popular Movies" />
                  <MovieList movies={nowMovies} title="Trending" />
                  <MovieList movies={comingMovies} title="Upcoming" />
                </>
              )}
            </>
          )}
        </Box>
      </Stack>
    </Container>
  );
}

export default HomePage;

function applyFilter(movies, filters) {
  console.log("Filters received:", filters.genres);
  let filteredMovies = movies;

  if (filters.genres && filters.genres.length > 0) {
    return movies.filter((movie) =>
      filters.genres.every((id) => movie.genre_ids.includes(id))
    );
  }

  if (filters.searchQuery) {
    filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(filters.searchQuery.toLowerCase())
    );
  }

  return filteredMovies;
}
