export const applyFilter = (movies, filters) => {
  console.log("Filters received:", filters);

  let filteredMovies = movies;

  if (filters.genres && filters.genres.length > 0) {
    filteredMovies = filteredMovies.filter((movie) =>
      filters.genres.every((id) => movie.genre_ids.includes(id))
    );
  }

  if (filters.searchQuery) {
    filteredMovies = filteredMovies.filter((movie) =>
      movie.title.toLowerCase().includes(filters.searchQuery.toLowerCase())
    );
  }

  return filteredMovies;
};
