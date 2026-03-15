import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  TextField,
  MenuItem,
  Chip,
  IconButton,
} from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const genres = [
  "Action",
  "Drama",
  "Comedy",
  "Thriller",
  "Romance",
  "Sci-Fi",
  "Animation",
];

export default function MovieWatchlist() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [filter, setFilter] = useState("all");

  const [movies, setMovies] = useState(
    JSON.parse(localStorage.getItem("movieWatchlist")) || []
  );

  useEffect(() => {
    localStorage.setItem("movieWatchlist", JSON.stringify(movies));
  }, [movies]);

  const addMovie = () => {
    if (!title.trim()) return;

    const newMovie = {
      id: Date.now(),
      title: title.trim(),
      year: year.trim(),
      genre: genre || "Unknown",
      watched: false,
    };

    setMovies([newMovie, ...movies]);
    setTitle("");
    setYear("");
    setGenre("");
  };

  const toggleWatched = (id) => {
    setMovies(
      movies.map((m) =>
        m.id === id ? { ...m, watched: !m.watched } : m
      )
    );
  };

  const deleteMovie = (id) => {
    setMovies(movies.filter((m) => m.id !== id));
  };

  const filteredMovies = movies.filter((m) => {
    if (filter === "watched") return m.watched;
    if (filter === "unwatched") return !m.watched;
    return true;
  });

  const watchedCount = movies.filter((m) => m.watched).length;
  const totalCount = movies.length;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f2027, #2c5364)",
        px: { xs: 2, md: 6 },
        py: 5,
        color: "#fff",
      }}
    >
      <Box mb={5}>
        <Typography variant="h3" fontWeight="bold" sx={{ letterSpacing: 1 }}>
          🎬 Movie Watchlist
        </Typography>
        <Typography sx={{ opacity: 0.8 }}>
          Track what you want to watch next and mark movies as watched.
        </Typography>
      </Box>

      <Paper
        sx={{
          p: 4,
          mb: 5,
          borderRadius: 4,
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <Typography mb={2} fontWeight={700} color="white">
          Add a Movie
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Movie Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              InputLabelProps={{ style: { color: "rgba(255,255,255,0.7)" } }}
              sx={{
                '& .MuiInputBase-input': { color: 'white' },
                fieldset: { borderColor: "rgba(255,255,255,0.4)" },
                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: "rgba(255,255,255,0.6)",
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: "#00bcd4",
                },
              }}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              label="Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              InputLabelProps={{ style: { color: "rgba(255,255,255,0.7)" } }}
              sx={{
                '& .MuiInputBase-input': { color: 'white' },
                fieldset: { borderColor: "rgba(255,255,255,0.4)" },
                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: "rgba(255,255,255,0.6)",
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: "#00bcd4",
                },
              }}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              select
              fullWidth
              label="Genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              InputLabelProps={{ style: { color: "rgba(255,255,255,0.7)" } }}
              sx={{
                '& .MuiInputBase-input': { color: 'white' },
                fieldset: { borderColor: "rgba(255,255,255,0.4)" },
                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: "rgba(255,255,255,0.6)",
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: "#00bcd4",
                },
                '& .MuiSelect-icon': { color: "rgba(255,255,255,0.7)" },
              }}
            >
              <MenuItem value="">Select genre</MenuItem>
              {genres.map((g) => (
                <MenuItem key={g} value={g} sx={{ color: "black" }}>
                  {g}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={3}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={addMovie}
              sx={{ height: "100%" }}
            >
              Add to Watchlist
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Paper
        sx={{
          p: 4,
          mb: 5,
          borderRadius: 4,
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box>
            <Typography variant="h6" color="white">Your Summary</Typography>
            <Typography sx={{ opacity: 0.75 }} color="white">
              {totalCount} movies total · {watchedCount} watched
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {[
              { label: "All", value: "all" },
              { label: "To Watch", value: "unwatched" },
              { label: "Watched", value: "watched" },
            ].map((tab) => (
              <Chip
                key={tab.value}
                label={tab.label}
                clickable
                onClick={() => setFilter(tab.value)}
                color={filter === tab.value ? "secondary" : "default"}
              />
            ))}
          </Box>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        {filteredMovies.length === 0 ? (
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 5,
                textAlign: "center",
                borderRadius: 4,
                background: "rgba(255,255,255,0.05)",
              }}
            >
              <Typography variant="h6" sx={{ opacity: 0.8 }} color="white">
                Your watchlist is empty.
              </Typography>
              <Typography sx={{ opacity: 0.6 }} color="white">
                Add a movie to start tracking what to watch next.
              </Typography>
            </Paper>
          </Grid>
        ) : (
          filteredMovies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie.id}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 4,
                  background: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography fontWeight={700}>{movie.title}</Typography>
                  <IconButton
                    size="small"
                    onClick={() => deleteMovie(movie.id)}
                    sx={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>

                <Typography sx={{ opacity: 0.7 }}>
                  {movie.genre} • {movie.year || "Unknown"}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                    alignItems: "center",
                  }}
                >
                  <Button
                    size="small"
                    variant={movie.watched ? "contained" : "outlined"}
                    color={movie.watched ? "success" : "secondary"}
                    startIcon={
                      movie.watched ? <VisibilityIcon /> : <VisibilityOffIcon />
                    }
                    onClick={() => toggleWatched(movie.id)}
                  >
                    {movie.watched ? "Watched" : "Mark Watched"}
                  </Button>
                  <Chip
                    label={movie.watched ? "Watched" : "To Watch"}
                    color={movie.watched ? "success" : "default"}
                    icon={<MovieIcon />}
                    size="small"
                  />
                </Box>
              </Paper>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}