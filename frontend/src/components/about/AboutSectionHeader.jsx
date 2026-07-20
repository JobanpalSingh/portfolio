export default function AboutSectionHeader({ label, className = '' }) {
  return (
    <div className={`mb-6 ${className}`}>
      <div className="flex items-center gap-2.5">
        <span
          className="h-3 w-3 shrink-0 rounded-[3px] bg-purple-700 shadow-[0_0_8px_rgba(109,40,217,0.3)]"
          aria-hidden
        />
        <span className="text-sm font-bold uppercase tracking-[0.14em] text-white">{label}</span>
      </div>
      <div className="mt-2.5 h-px w-[15%] bg-white/75" aria-hidden />
    </div>
  );
}
