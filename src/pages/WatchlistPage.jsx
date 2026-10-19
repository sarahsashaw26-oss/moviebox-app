import { Box, Typography } from '@mui/material';
import MovieCard from '../components/MovieCard';
import useWatchlist from '../hooks/useWatchlist';

function WatchlistPage() {
  const { items } = useWatchlist();

  return (
    <>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        My Watchlist
      </Typography>

      {items.length === 0 ? (
        <Typography color="text.secondary">
          Your watchlist is empty. Tap the bookmark on any title to save it here.
        </Typography>
      ) : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {items.map((item) => (
            <MovieCard key={`${item.title ? 'movie' : 'tv'}-${item.id}`} item={item} />
          ))}
        </Box>
      )}
    </>
  );
}

export default WatchlistPage;