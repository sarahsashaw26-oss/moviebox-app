import { Box } from '@mui/material';
import MovieSection from '../components/MovieSection';

const sections = [
  { title: 'Trending This Week', path: '/trending/movie/week' },
  { title: 'Popular Movies', path: '/movie/popular' },
  { title: 'Action Movies', path: '/discover/movie?with_genres=28' },
  { title: 'Popular TV Shows', path: '/tv/popular' },
];

function HomePage() {
  return (
    <Box>
      {sections.map((section) => (
        <MovieSection key={section.path} title={section.title} path={section.path} />
      ))}
    </Box>
  );
}

export default HomePage;