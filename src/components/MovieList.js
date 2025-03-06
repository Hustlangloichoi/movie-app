import { Grid, Typography, Box, Stack } from "@mui/material";
import MovieCard from "./MovieCard";

function MovieList({ movies, title }) {
  console.log("movies array:", movies);
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" fontWeight="bold" mb={1}>
        {title}
      </Typography>
      <Box sx={{ Height: "380px", overflowX: "auto", whiteSpace: "nowrap" }}>
        <Stack direction="row" spacing={2}>
          {movies.map((movie, index) => (
            <Box key={movie.id} sx={{ flex: "0 0 auto" }}>
              <MovieCard movie={movie} />
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

export default MovieList;
