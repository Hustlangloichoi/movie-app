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

function HomePage() {
  // const auth = useAuth();
  // let navigate = useNavigate();

  // if (!auth.user) {
  //   return <p></p>;
  // }

  const [popMovies, setPopMovies] = useState([]);
  const [nowMovies, setNowMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const defaultValues = {
    genres: [],
  };

  const methods = useForm({
    defaultValues,
  });

  const { watch, reset } = methods;
  const filters = watch();

  const popFilter = applyFilter(popMovies, filters);
  const nowFilter = applyFilter(nowMovies, filters);

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
  }, []);
  return (
    <Container
      sx={{
        display: "flex",
        minHeight: "100vh",
        mt: 3,
      }}
    >
      <Stack sx={{ position: "sticky" }}>
        <FormProvider methods={methods}>
          <ProductFilter resetFilter={reset} />
        </FormProvider>
      </Stack>
      <Stack sx={{ overflow: "hidden" }}>
        {/* <FormProvider methods={methods}>
            <Stack
              spacing={2}
              direction={{ xs: "column", sm: "row" }}
              alignItems={{ sm: "center" }}
              justifyContent="space-between"
              mb={2}
            >
              <ProductSearch />
              <ProductSort />
            </Stack>
          </FormProvider> */}
        <Box sx={{ position: "relative", height: 1 }}>
          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              {error ? (
                <Alert severity="error">{error}</Alert>
              ) : (
                <>
                  <MovieList
                    movies={popFilter}
                    title="Popular Movies"
                  ></MovieList>
                  <MovieList movies={nowFilter} title="Trending"></MovieList>
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

  if (filters.genres.length > 0) {
    return movies.filter((movie) =>
      filters.genres.every((id) => movie.genre_ids.includes(id))
    );
  }

  return filteredMovies;
}
