import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import GlassButton from './GlassButton.jsx';

/**
 * Themed back control for card destination pages (About, Projects, etc.).
 * Uses history when available, otherwise falls back to `to` (home).
 */
export default function BackButton({ to = '/', label = 'Back', className = '' }) {
  const navigate = useNavigate();

  return (
    <GlassButton
      variant="glass"
      className={className}
      onClick={() => {
        if (typeof window !== 'undefined' && window.history.length > 1) {
          navigate(-1);
          return;
        }
        navigate(to);
      }}
    >
      <ArrowLeft className="h-4 w-4 shrink-0" strokeWidth={2.25} />
      {label}
    </GlassButton>
  );
}
