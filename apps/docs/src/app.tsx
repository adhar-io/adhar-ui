import React from 'react';
import { useRoute } from './hooks/use-route.ts';
import { DocsLayout } from './components/layout.tsx';
import { HomePage } from './pages/home.tsx';
import { GettingStartedPage } from './pages/getting-started.tsx';
import { ComponentDetailPage, ComponentsCategoryPage } from './pages/components-page.tsx';
import { ThemingPage } from './pages/theming.tsx';
import { CLIPage } from './pages/cli.tsx';
import { GuidesPage } from './pages/guides.tsx';
import { StorybookPage } from './pages/storybook.tsx';
import { ExamplesPage as BlocksPage } from './pages/examples.tsx';
import { ChangelogPage } from './pages/changelog.tsx';
import { DesignResourcesPage } from './pages/design-resources.tsx';
import { BuilderPage } from './pages/builder.tsx';

// These routes render fullscreen without the DocsLayout wrapper
const FULLSCREEN_ROUTES = ['/builder', '/storybook'];

export function App() {
  const { route, navigate, isActive, segments } = useRoute();
  const isFullscreen = FULLSCREEN_ROUTES.includes(route);

  const renderPage = () => {
    if (route === '/' || route === '') {
      return <HomePage navigate={navigate} />;
    }
    if (route === '/getting-started') {
      return <GettingStartedPage navigate={navigate} />;
    }
    if (route === '/theming') {
      return <ThemingPage navigate={navigate} />;
    }
    if (route === '/cli') {
      return <CLIPage />;
    }
    if (route === '/storybook' || route === '/playground') {
      // /playground retired — Storybook covers all interactive demos with controls.
      // Old /playground links transparently render the Storybook embed.
      return <StorybookPage navigate={navigate} />;
    }
    if (route === '/blocks') {
      return <BlocksPage navigate={navigate} />;
    }
    if (route === '/changelog') {
      return <ChangelogPage />;
    }
    if (route === '/design-resources') {
      return <DesignResourcesPage navigate={navigate} />;
    }
    if (route === '/builder') {
      return <BuilderPage navigate={navigate} />;
    }

    // Components routes
    if (route.startsWith('/components/detail/')) {
      const slug = segments[2];
      return <ComponentDetailPage slug={slug} navigate={navigate} />;
    }
    if (route.startsWith('/components/')) {
      const categoryId = segments[1];
      return <ComponentsCategoryPage categoryId={categoryId} navigate={navigate} />;
    }
    if (route === '/components') {
      return <ComponentsCategoryPage categoryId='form-controls' navigate={navigate} />;
    }

    // Guides routes
    if (route.startsWith('/guides/')) {
      const guideId = segments[1] as
        | 'accessibility'
        | 'design-sync'
        | 'frameworks'
        | 'contributing';
      return <GuidesPage guideId={guideId} navigate={navigate} />;
    }
    if (route === '/guides') {
      return <GuidesPage navigate={navigate} />;
    }

    // Fallback — 404
    return (
      <div className='flex flex-col items-center justify-center py-24 text-center animate-fade-in'>
        <div className='text-6xl font-bold text-muted-foreground/30 mb-4'>404</div>
        <h1 className='text-xl font-semibold text-foreground mb-2'>Page not found</h1>
        <p className='text-sm text-muted-foreground mb-6 max-w-sm'>
          The page <code className='px-1.5 py-0.5 rounded bg-muted text-xs font-mono'>{route}</code>
          {' '}
          doesn't exist.
        </p>
        <button
          onClick={() => navigate('/')}
          className='inline-flex items-center gap-2 h-9 px-5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors'
        >
          <svg
            className='w-4 h-4'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M10 19l-7-7m0 0l7-7m-7 7h18' />
          </svg>
          Back to Home
        </button>
      </div>
    );
  };

  // Fullscreen routes: render without DocsLayout wrapper
  if (isFullscreen) {
    return renderPage();
  }

  return (
    <DocsLayout route={route} isActive={isActive} navigate={navigate}>
      {renderPage()}
    </DocsLayout>
  );
}
