import { Box, Card, CardActionArea, CardMedia, IconButton, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Bookmark from '@mui/icons-material/Bookmark';
import BookmarkBorder from '@mui/icons-material/BookmarkBorder';
import useWatchlist from '../hooks/useWatchlist';

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w342';

function MovieCard({ item }) {
  const { isSaved, toggle } = useWatchlist();
  const saved = isSaved(item);

  const type = item.title ? 'movie' : 'tv';
  const title = item.title || item.name || 'Untitled';
  const date = item.release_date || item.first_air_date || '';
  const year = date ? date.slice(0, 4) : 'N/A';
  const poster = item.poster_path ? `${IMAGE_BASE}${item.poster_path}` : null;
  const rating = item.vote_average ? item.vote_average.toFixed(1) : 'N/A';

  return (
    <Card
      sx={{
        width: 160,
        flexShrink: 0,
        position: 'relative',
        bgcolor: 'background.paper',
        transition: 'transform 0.2s',
        '&:hover': { transform: 'scale(1.05)' },
      }}
    >
      <IconButton
        aria-label={saved ? 'Remove from watchlist' : 'Add to watchlist'}
        onClick={() => toggle(item)}
        sx={{
          position: 'absolute',
          top: 4,
          right: 4,
          zIndex: 1,
          bgcolor: 'rgba(0,0,0,0.6)',
          color: saved ? 'primary.main' : 'common.white',
          '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' },
        }}
      >
        {saved ? <Bookmark /> : <BookmarkBorder />}
      </IconButton>

      <CardActionArea component={RouterLink} to={`/${type}/${item.id}`}>
        {poster ? (
          <CardMedia component="img" image={poster} alt={title} sx={{ height: 240 }} />
        ) : (
          <Box
            sx={{
              height: 240,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 1,
              bgcolor: 'grey.800',
            }}
          >
            <Typography variant="body2" textAlign="center">
              {title}
            </Typography>
          </Box>
        )}
        <Box sx={{ p: 1 }}>
          <Typography variant="subtitle2" noWrap>
            {title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {year} · ★ {rating}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
}

export default MovieCard;