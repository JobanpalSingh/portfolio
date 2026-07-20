/**
 * Consistent Lucide icon badge — purple gradient circle used across About & cards.
 */
export default function IconBadge({ icon: Icon, size = 'md', className = '', iconClassName = '' }) {
  const sizes = {
    sm: { wrap: 'h-8 w-8', icon: 'h-3.5 w-3.5' },
    md: { wrap: 'h-10 w-10', icon: 'h-4 w-4' },
    lg: { wrap: 'h-12 w-12', icon: 'h-5 w-5' },
    xl: { wrap: 'h-14 w-14', icon: 'h-6 w-6' },
  };
  const s = sizes[size] || sizes.md;

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-700 to-purple-950 text-purple-100 shadow-[0_0_12px_rgba(88,28,135,0.25)] ${s.wrap} ${className}`}
      aria-hidden
    >
      {Icon ? <Icon className={`${s.icon} ${iconClassName}`} strokeWidth={1.75} /> : null}
    </span>
  );
}
