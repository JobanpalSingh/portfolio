export default function AboutSectionHeader({ label, className = '' }) {
  return (
    <div className={`mb-6 ${className}`}>
      <div className="flex items-center gap-2.5">
        <span
          className="h-3 w-3 shrink-0 rounded-[3px] bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.55)]"
          aria-hidden
        />
        <span className="text-sm font-bold uppercase tracking-[0.14em] text-white">{label}</span>
      </div>
      <div className="mt-2.5 h-px w-[15%] bg-white/75" aria-hidden />
    </div>
  );
}
