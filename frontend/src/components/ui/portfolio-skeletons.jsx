import { Skeleton } from './skeleton.jsx';

export function ProjectCardSkeleton() {
  return (
    <div className="glass-panel flex flex-col overflow-hidden" aria-hidden>
      <Skeleton className="h-44 w-full rounded-none" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-3">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-24" />
        </div>
        <Skeleton className="h-5 w-3/4" />
        <div className="space-y-2">
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-2/3" />
        </div>
        <div className="mt-auto flex items-center gap-2 pt-2">
          <Skeleton className="h-7 w-16 rounded-full" />
          <Skeleton className="h-7 w-14 rounded-full" />
          <Skeleton className="ml-auto h-8 w-24 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function ProjectsGridSkeleton({ count = 6 }) {
  return (
    <div
      className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
      role="status"
      aria-label="Loading projects"
    >
      {Array.from({ length: count }).map((_, i) => (
        <ProjectCardSkeleton key={i} />
      ))}
      <span className="sr-only">Loading projects…</span>
    </div>
  );
}

export function TestimonialCarouselSkeleton() {
  return (
    <div
      className="flex flex-col items-center gap-6 py-4"
      role="status"
      aria-label="Loading testimonials"
    >
      <div className="flex w-full items-stretch justify-center gap-3 overflow-hidden px-2 sm:gap-4">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`glass-panel flex w-[min(100%,17.5rem)] shrink-0 flex-col items-center px-6 py-8 ${
              i === 1 ? 'scale-100 opacity-100' : 'hidden scale-[0.82] opacity-55 sm:flex'
            }`}
          >
            <Skeleton className="mb-5 h-[4.5rem] w-[4.5rem] rounded-full" />
            <div className="w-full space-y-2">
              <Skeleton className="mx-auto h-3.5 w-full" />
              <Skeleton className="mx-auto h-3.5 w-5/6" />
              <Skeleton className="mx-auto h-3.5 w-4/6" />
            </div>
            <Skeleton className="my-4 h-px w-14" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="mt-3 h-3 w-28" />
            <Skeleton className="mt-1.5 h-2.5 w-36" />
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="h-2 w-7 rounded-full" />
        <Skeleton className="h-2 w-2 rounded-full" />
        <Skeleton className="h-2 w-2 rounded-full" />
      </div>
      <span className="sr-only">Loading testimonials…</span>
    </div>
  );
}

export function AdminStatsSkeleton() {
  return (
    <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" role="status" aria-label="Loading stats">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="glass-panel p-5">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="mt-3 h-9 w-16" />
        </div>
      ))}
      <span className="sr-only">Loading dashboard stats…</span>
    </div>
  );
}

export function AdminTableSkeleton({ rows = 4 }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]" role="status" aria-label="Loading table">
      <div className="space-y-0 divide-y divide-white/5">
        <div className="flex gap-4 bg-white/5 px-4 py-3">
          <Skeleton className="h-3 flex-1" />
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-20" />
        </div>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-4 py-4">
            <Skeleton className="h-4 flex-1" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-8 w-16 rounded-lg" />
          </div>
        ))}
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  );
}

export function ProjectsPreviewThumbsSkeleton() {
  return (
    <div className="mt-2 flex items-center gap-1" role="status" aria-label="Loading project previews">
      <div className="flex items-center">
        {[0, 1, 2].map((i) => (
          <Skeleton
            key={i}
            className={`h-14 w-14 rounded-full ring-[3px] ring-[#0a0814]/90 sm:h-[4.5rem] sm:w-[4.5rem] ${
              i > 0 ? '-ml-5 sm:-ml-6' : ''
            }`}
          />
        ))}
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  );
}
