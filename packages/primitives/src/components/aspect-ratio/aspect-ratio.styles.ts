import { cva } from 'class-variance-authority';

/**
 * Aspect ratio uses the native CSS `aspect-ratio` property (set inline from
 * the `ratio` prop). This variant just provides the common container reset —
 * apply it and put your media inside with `object-cover`.
 */
export const aspectRatioVariants = cva(
  'relative w-full overflow-hidden [&>*]:h-full [&>*]:w-full [&_img]:object-cover [&_video]:object-cover',
);

export type AspectRatioVariants = Parameters<typeof aspectRatioVariants>[0];
