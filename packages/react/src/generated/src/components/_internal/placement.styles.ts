import { cva } from 'class-variance-authority';

/**
 * CSS-only placement for anchored overlays (popover, dropdown, tooltip).
 * The overlay is absolutely positioned against its `relative` wrapper, so it
 * needs no measurement and works the same on every framework target.
 */
export const placementVariants = cva('absolute', {
  variants: {
    side: {
      top: 'bottom-full mb-2',
      bottom: 'top-full mt-2',
      left: 'right-full mr-2',
      right: 'left-full ml-2'
    },
    align: {
      start: '',
      center: '',
      end: ''
    }
  },
  compoundVariants: [{
    side: ['top', 'bottom'],
    align: 'start',
    className: 'left-0'
  }, {
    side: ['top', 'bottom'],
    align: 'center',
    className: 'left-1/2 -translate-x-1/2'
  }, {
    side: ['top', 'bottom'],
    align: 'end',
    className: 'right-0'
  }, {
    side: ['left', 'right'],
    align: 'start',
    className: 'top-0'
  }, {
    side: ['left', 'right'],
    align: 'center',
    className: 'top-1/2 -translate-y-1/2'
  }, {
    side: ['left', 'right'],
    align: 'end',
    className: 'bottom-0'
  }],
  defaultVariants: {
    side: 'bottom',
    align: 'center'
  }
});
export type PlacementVariants = Parameters<typeof placementVariants>[0]