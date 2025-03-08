import { Box, Button, Stack, Typography } from "@mui/material";
import FMultiCheckbox from "./form/FMultiCheckbox";
import FRadioGroup from "./form/FRadioGroup";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { useState, useEffect } from "react";
import apiService from "../app/apiService";

//fetch list of genres, push to

export const FILTER_GENRES_OPTIONS = [35];

function ProductFilter({ resetFilter }) {
  const [genreOptions, setGenreOptions] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await apiService.get(`/genre/movie/list`, {
          params: {
            language: "en-US",
          },
        });
        setGenreOptions(res.data.genres);
        console.log(genreOptions);
      } catch (error) {
        console.error("Failed to fetch genres:", error);
      }
    };
    fetchGenres();
  }, []);

  return (
    <Stack spacing={3} sx={{ p: 3, width: 250 }}>
      <Stack spacing={1}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          GENRES
        </Typography>
        <FMultiCheckbox
          name="genres"
          options={genreOptions}
          sx={{ width: 1 }}
        />
      </Stack>
      <Box>
        <Button
          size="large"
          type="submit"
          color="inherit"
          variant="outlined"
          onClick={resetFilter}
          startIcon={<ClearAllIcon />}
        >
          Clear All
        </Button>
      </Box>
    </Stack>
  );
}

export default ProductFilter;
