import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import apiService from "../app/apiService";
import {
  Container,
  Box,
  Card,
  Grid,
  Typography,
  Rating,
  CircularProgress,
  Alert,
  Breadcrumbs,
  Link,
  Divider,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function DetailPage() {
  const [movie, setMovie] = useState();
  let params = useParams();

  useEffect(() => {
    const getMovies = async () => {
      try {
        const res = await apiService.get(`${params.id}`, {
          params: { language: "en-US" },
        });
        setMovie(res.data);
      } catch (error) {
        console.error(`Error fetching movie's details:`, error);
      }
    };
    getMovies();
  }, [params]);

  console.log(movie);

  return (
    <div>
      {movie && (
        <Container sx={{ my: 3 }}>
          <Card>
            <Grid container>
              {/* Left - Movie Poster */}
              <Grid item xs={12} md={6}>
                <Box p={2} display="flex" justifyContent="center">
                  <Box
                    component="img"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    sx={{ width: "100%", borderRadius: 2 }}
                  />
                </Box>
              </Grid>

              {/* Right - Movie Details */}
              <Grid item xs={12} md={6} sx={{ p: 3 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  {movie.title}
                </Typography>

                {/* Genres */}
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  {movie.genres.map((genre) => genre.name).join(", ")}
                </Typography>

                {/* Rating */}
                <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                  <Rating
                    value={movie.vote_average / 2}
                    precision={0.1}
                    readOnly
                  />
                  <Typography
                    variant="body2"
                    sx={{ ml: 1, color: "text.secondary" }}
                  >
                    ({movie.vote_average} / 10)
                  </Typography>
                </Box>

                <Divider sx={{ borderStyle: "dashed", mb: 2 }} />

                {/* Overview */}
                <Typography variant="body1" paragraph>
                  {movie.overview}
                </Typography>

                {/* Creator Info */}
                <Typography variant="subtitle1" color="text.secondary">
                  Released: {movie.release_date}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Runtime: {movie.runtime} mins
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Container>
      )}
    </div>
  );
}

export default DetailPage;
