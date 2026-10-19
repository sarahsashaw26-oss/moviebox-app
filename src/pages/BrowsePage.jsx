import { useState } from 'react';
import { Chip, Stack, Typography } from '@mui/material';
import MovieSection from '../components/MovieSection';

const genres = {
  movie: [
    { id: null, name: 'All' },
    { id: 28, name: 'Action' },
    { id: 35, name: 'Comedy' },
    { id: 18, name: 'Drama' },
    { id: 27, name: 'Horror' },
    { id: 878, name: 'Sci-Fi' },
    { id: 10749, name: 'Romance' },
  ],
  tv: [
    { id: null, name: 'All' },
    { id: 10759, name: 'Action & Adventure' },
    { id: 35, name: 'Comedy' },
    { id: 18, name: 'Drama' },
    { id: 9648, name: 'Mystery' },
    { id: 10765, name: 'Sci-Fi & Fantasy' },
    { id: 80, name: 'Crime' },
  ],
};

function BrowsePage({ type }) {
  const [genreId, setGenreId] = useState(null);

  const heading = type === 'movie' ? 'Movies' : 'TV Shows';
  const activeName = genres[type].find((g) => g.id === genreId).name;
  const path = genreId
    ? `/discover/${type}?with_genres=${genreId}`
    : `/${type}/popular`;

  return (
    <>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        {heading}
      </Typography>

      <Stack direction="row" useFlexGap sx={{ flexWrap: 'wrap', gap: 1, mb: 3 }}>
        {genres[type].map((g) => (
          <Chip
            key={g.name}
            label={g.name}
            clickable
            color={genreId === g.id ? 'primary' : 'default'}
            onClick={() => setGenreId(g.id)}
          />
        ))}
      </Stack>

      <MovieSection title={`${activeName} ${heading}`} path={path} />
    </>
  );
}

export default BrowsePage;