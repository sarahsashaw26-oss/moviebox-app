import { useEffect, useState } from 'react';
import { Alert, Box, CircularProgress, Typography } from '@mui/material';
import { tmdbFetch } from '../services/tmdb';
import MovieCard from './MovieCard';

function MovieSection({ title, path }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    tmdbFetch(path)
      .then((data) => {
        if (!cancelled) setItems(data.results ?? []);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [path]);

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        {title}
      </Typography>

      {loading && <CircularProgress size={28} />}

      {error && <Alert severity="error">Could not load {title}: {error}</Alert>}

      {!loading && !error && items.length === 0 && (
        <Typography color="text.secondary">No titles found.</Typography>
      )}

      {!loading && !error && items.length > 0 && (
        <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 1 }}>
          {items.map((item) => (
            <MovieCard key={item.id} item={item} />
          ))}
        </Box>
      )}
    </Box>
  );
}

export default MovieSection;