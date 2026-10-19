import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import BrowsePage from './pages/BrowsePage.jsx';
import WatchlistPage from './pages/WatchlistPage.jsx';
import DetailsPage from './pages/DetailsPage.jsx';
import SearchPage from './pages/SearchPage.jsx';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<BrowsePage key="movie" type="movie" />} />
        <Route path="/tv" element={<BrowsePage key="tv" type="tv" />} />
        <Route path="/watchlist" element={<WatchlistPage />} />
        <Route path="/movie/:id" element={<DetailsPage type="movie" />} />
        <Route path="/tv/:id" element={<DetailsPage type="tv" />} />
        <Route path="/search" element={<SearchPage />} />
      </Route>
    </Routes>
  );
}

export default App;