// deno-lint-ignore-file
/**
 * Per-block template registry.
 *
 * Each block lives in its own file under templates/blocks/. To add a new block:
 *   1. Create a new file in this folder named after the block slug, e.g.
 *      `pricing-table.ts`, exporting `export const template = '...'`.
 *   2. Import it below and add an entry to `blockTemplates` keyed by its
 *      `block-{slug}` name.
 *   3. Register its metadata (title, deps) in `packages/registry/src/component-index.ts`.
 *
 * Legacy blocks still live as inline strings in `../blocks.ts`. Both maps are
 * merged in `../blocks.ts` so consumers see a unified `blockTemplates` record.
 */

import { template as statsGrid } from './stats-grid.ts';
import { template as teamGrid } from './team-grid.ts';
import { template as blogGrid } from './blog-grid.ts';
import { template as newsletter } from './newsletter.ts';
import { template as integrations } from './integrations.ts';
import { template as comparisonTable } from './comparison-table.ts';
import { template as videoHero } from './video-hero.ts';
import { template as bannerAnnouncement } from './banner-announcement.ts';
import { template as multistepForm } from './multistep-form.ts';
import { template as stepperForm } from './stepper-form.ts';
import { template as billingInvoices } from './billing-invoices.ts';
import { template as notificationsCenter } from './notifications-center.ts';
import { template as searchResults } from './search-results.ts';
import { template as profile } from './profile.ts';
import { template as onboarding } from './onboarding.ts';
import { template as timelinePage } from './timeline-page.ts';
import { template as emptyStatePage } from './empty-state-page.ts';
import { template as loadingPage } from './loading-page.ts';
import { template as tabsPage } from './tabs-page.ts';
import { template as cardGrid } from './card-grid.ts';

export const newBlockTemplates: Record<string, string> = {
  'block-stats-grid': statsGrid,
  'block-team-grid': teamGrid,
  'block-blog-grid': blogGrid,
  'block-newsletter': newsletter,
  'block-integrations': integrations,
  'block-comparison-table': comparisonTable,
  'block-video-hero': videoHero,
  'block-banner-announcement': bannerAnnouncement,
  'block-multistep-form': multistepForm,
  'block-stepper-form': stepperForm,
  'block-billing-invoices': billingInvoices,
  'block-notifications-center': notificationsCenter,
  'block-search-results': searchResults,
  'block-profile': profile,
  'block-onboarding': onboarding,
  'block-timeline-page': timelinePage,
  'block-empty-state-page': emptyStatePage,
  'block-loading-page': loadingPage,
  'block-tabs-page': tabsPage,
  'block-card-grid': cardGrid,
};
