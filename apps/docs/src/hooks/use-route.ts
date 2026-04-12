import { useCallback, useEffect, useState } from 'react';

export function useRoute() {
  const getRoute = () => {
    const hash = window.location.hash.slice(1) || '/';
    return hash;
  };

  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const handler = () => {
      setRoute(getRoute());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', handler);
    // Also handle popstate for back/forward
    window.addEventListener('popstate', handler);
    return () => {
      window.removeEventListener('hashchange', handler);
      window.removeEventListener('popstate', handler);
    };
  }, []);

  const navigate = useCallback((path: string) => {
    // Always update state directly for immediate response
    // This handles the case where clicking the same link twice
    // wouldn't fire hashchange
    const newHash = '#' + path;
    if (window.location.hash === newHash) {
      // Same route — just scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.hash = path;
    }
    // Always set route state immediately to avoid any lag
    setRoute(path);
  }, []);

  const isActive = useCallback(
    (path: string) => {
      if (path === '/') return route === '/' || route === '';
      return route === path || route.startsWith(path + '/');
    },
    [route],
  );

  const segments = route.split('/').filter(Boolean);

  return { route, navigate, isActive, segments };
}
