# Moviebox App

A movie and TV discovery web app built with React, Vite, Material UI and React Router. It uses the TMDB (The Movie Database) API for titles, posters and search.

**Live site:** https://moviebox-app-rouge.vercel.app/

## Features

- Home page with four rows: Trending This Week, Popular Movies, Action Movies and Popular TV Shows
- Movies and TV Shows pages with genre filter chips
- Title details page with poster, year, rating, genres and overview
- Search across movies and TV shows, with loading, no-results and error states
- My Watchlist, saved in the browser's localStorage, with bookmark buttons on every poster
- Responsive layout: a permanent sidebar on desktop and a slide-out menu on phones

## Technologies

- React (JavaScript) with Vite
- Material UI (MUI) for components, theming and icons
- React Router for navigation
- TMDB REST API for movie and TV data and images

## Design

No reference screenshot was supplied with the assignment, so the design was built from the written brief. It uses a dark theme with a red accent.

## Running locally

1. Clone the repository and open the project folder.
2. Install dependencies:
```
   npm install
```
3. Create a `.env` file in the project root, based on `.env.example`:
```
   VITE_TMDB_TOKEN=your_tmdb_read_access_token
```
   Get the API Read Access Token from your TMDB account under Settings → API.
4. Start the development server:
```
   npm run dev
```
5. Open http://localhost:5173 in your browser.

## Deployment

The app is deployed on Vercel. The `VITE_TMDB_TOKEN` variable was added in the Vercel project's Environment Variables settings.

## Security note

Vite includes variables prefixed with `VITE_` in the browser bundle, so the TMDB token is visible to anyone who inspects the site. This is the browser-based approach the assignment allows. Use a read-only TMDB token, and do not commit `.env` to the repository.

## Project structure

```
src/
  components/   Layout, MovieCard, MovieSection
  pages/        Home, Browse (movies and TV), Details, Search, Watchlist
  hooks/        useWatchlist
  services/     tmdb.js (API helper)
  theme.js      MUI dark theme
```