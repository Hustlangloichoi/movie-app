import React, { useState, useEffect } from "react";
import { Container, Grid, Box, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import apiService from "../app/apiService";
import FormProvider from "../components/form/FormProvider";
import MovieCard from "../components/MovieCard";
import LoadingScreen from "../components/LoadingScreen";
import { applyFilter } from "../utils/filterUtils";
import ProductFilter from "../components/ProductFilter";

function TrendPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const defaultValues = {
    genres: [],
    searchQuery: "",
  };

  const methods = useForm({ defaultValues });
  const { watch } = methods;
  const filters = watch();

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const res = await apiService.get("/movie/now_playing", {
          params: { language: "en-US", page: 1 },
        });
        setMovies(res.data.results);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
        setError("Failed to load trending movies.");
      }
      setLoading(false);
    };

    fetchMovies();
  }, []);

  const filteredMovies = applyFilter(movies, filters);

  return (
    <Container sx={{ minHeight: "100vh", mt: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <FormProvider methods={methods}>
            <ProductFilter />
          </FormProvider>
        </Grid>

        <Grid item xs={12} md={9}>
          <Box sx={{ position: "relative", height: 1 }}>
            {loading ? (
              <LoadingScreen />
            ) : error ? (
              <Alert severity="error">{error}</Alert>
            ) : (
              <Grid container spacing={2}>
                {filteredMovies.map((movie) => (
                  <Grid item xs={12} sm={6} md={4} key={movie.id}>
                    <MovieCard movie={movie} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default TrendPage;
