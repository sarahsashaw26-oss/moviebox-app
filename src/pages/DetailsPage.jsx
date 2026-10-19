import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Box, Chip, CircularProgress, Stack, Typography } from '@mui/material';
import { tmdbFetch } from '../services/tmdb';

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

function DetailsPage({ type }) {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    tmdbFetch(`/${type}/${id}`)
      .then((data) => {
        if (!cancelled) setItem(data);
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
  }, [type, id]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">Could not load this title: {error}</Alert>;
  if (!item) return null;

  const title = item.title || item.name || 'Untitled';
  const date = item.release_date || item.first_air_date || '';
  const poster = item.poster_path ? `${IMAGE_BASE}${item.poster_path}` : null;
  const rating = item.vote_average ? item.vote_average.toFixed(1) : 'N/A';
  const genres = item.genres ?? [];

  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
      {poster ? (
        <Box
          component="img"
          src={poster}
          alt={title}
          sx={{ width: { xs: '100%', md: 300 }, maxWidth: 300, borderRadius: 2 }}
        />
      ) : (
        <Box
          sx={{
            width: { xs: '100%', md: 300 },
            height: 450,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'grey.800',
            borderRadius: 2,
            p: 2,
          }}
        >
          <Typography textAlign="center">{title}</Typography>
        </Box>
      )}

      <Box sx={{ flex: 1 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          {title}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          {date ? date.slice(0, 4) : 'Release date unknown'} · ★ {rating}
        </Typography>

        <Stack direction="row" useFlexGap sx={{ flexWrap: 'wrap', gap: 1, my: 2 }}>
          {genres.map((g) => (
            <Chip key={g.id} label={g.name} variant="outlined" />
          ))}
        </Stack>

        <Typography variant="h6" gutterBottom>
          Overview
        </Typography>
        <Typography>{item.overview || 'No overview available.'}</Typography>
      </Box>
    </Stack>
  );
}

export default DetailsPage;