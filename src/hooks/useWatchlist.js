import { useEffect, useState } from 'react';

const STORAGE_KEY = 'moviebox-watchlist';
const CHANGE_EVENT = 'watchlist-change';

function readStorage() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
}

// Movies and TV shows can share an id, so the key includes the type.
export function itemKey(item) {
  return `${item.title ? 'movie' : 'tv'}-${item.id}`;
}

function useWatchlist() {
  const [items, setItems] = useState(readStorage);

  // Keep every component using this hook in sync when the list changes.
  useEffect(() => {
    const sync = () => setItems(readStorage());
    window.addEventListener(CHANGE_EVENT, sync);
    return () => window.removeEventListener(CHANGE_EVENT, sync);
  }, []);

  const save = (next) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(CHANGE_EVENT));
  };

  const isSaved = (item) => items.some((i) => itemKey(i) === itemKey(item));

  const toggle = (item) => {
    const current = readStorage();
    const exists = current.some((i) => itemKey(i) === itemKey(item));
    save(exists
      ? current.filter((i) => itemKey(i) !== itemKey(item))
      : [...current, item]);
  };

  return { items, isSaved, toggle };
}

export default useWatchlist;