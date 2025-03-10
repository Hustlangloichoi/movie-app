import React, { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import apiService from "../app/apiService"; // Ensure this supports API calls
import { useFormContext } from "react-hook-form";

function ProductSearch({ onSearchResults }) {
  const { watch, setValue } = useFormContext();
  const searchQuery = watch("searchQuery");

  const handleSearch = async (event) => {
    setValue("searchQuery", event.target.value);
    if (event.target.value.trim() === "") {
      onSearchResults([]);
      return;
    }

    try {
      const response = await apiService.get("/search/movie", {
        params: { query: event.target.value, language: "en-US", page: 1 },
      });
      onSearchResults(response.data.results);
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search for a movie..."
      value={searchQuery}
      onChange={handleSearch}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}

export default ProductSearch;
