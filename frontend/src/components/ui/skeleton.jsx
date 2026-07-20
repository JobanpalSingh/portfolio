import { cn } from '../../lib/utils.js';

/**
 * shadcn/ui Skeleton — https://ui.shadcn.com/docs/components/skeleton
 * Tuned for this dark glass portfolio (bg-primary/10 → muted purple pulse).
 */
function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-purple-500/15', className)}
      {...props}
    />
  );
}

export { Skeleton };
