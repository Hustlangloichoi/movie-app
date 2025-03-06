import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

function MovieCard({ movie }) {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(`/popular/${movie.id}`)}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="320"
          width="200"
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt=""
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            fontWeight="bold"
            component="div"
            textAlign="center"
            sx={{
              mb: 4,
              height: "30px",
              width: "210px",
              whiteSpace: "pre-wrap",
            }}
          >
            {movie.title}
          </Typography>
          <Stack
            direction="row"
            spacing={0.5}
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="subtitle1"> {movie.release_date}</Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MovieCard;
