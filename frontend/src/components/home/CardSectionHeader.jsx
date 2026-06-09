export default function CardSectionHeader({ label, bordered = false }) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2.5">
        <span
          className="h-3 w-3 shrink-0 rounded-[3px] bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.55)]"
          aria-hidden
        />
        {bordered ? (
          <span className="border-purple-400/55 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
            {label}
          </span>
        ) : (
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/95">{label}</span>
        )}
      </div>
      <div
        className="mt-3 h-px w-full bg-gradient-to-r from-purple-400/45 via-purple-500/15 to-transparent"
        aria-hidden
      />
    </div>
  );
}
