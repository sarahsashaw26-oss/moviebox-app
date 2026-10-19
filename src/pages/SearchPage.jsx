import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Alert, Box, CircularProgress, Typography } from '@mui/material';
import { tmdbFetch } from '../services/tmdb';
import MovieCard from '../components/MovieCard';

function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    tmdbFetch(`/search/multi?query=${encodeURIComponent(query)}&include_adult=false`)
      .then((data) => {
        if (cancelled) return;
        // Multi-search also returns people, so keep only movies and TV shows.
        const titles = (data.results ?? []).filter(
          (r) => r.media_type === 'movie' || r.media_type === 'tv'
        );
        setResults(titles);
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
  }, [query]);

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        {query ? `Results for "${query}"` : 'Search'}
      </Typography>

      {!query && (
        <Typography color="text.secondary">Type a title in the search bar and press Enter.</Typography>
      )}

      {loading && <CircularProgress />}

      {error && <Alert severity="error">Search failed: {error}</Alert>}

      {query && !loading && !error && results.length === 0 && (
        <Typography color="text.secondary">No movies or TV shows match "{query}".</Typography>
      )}

      {!loading && !error && results.length > 0 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {results.map((item) => (
            <MovieCard key={`${item.media_type}-${item.id}`} item={item} />
          ))}
        </Box>
      )}
    </Box>
  );
}

export default SearchPage;