import FloatingMenu from './FloatingMenu.jsx';
import ChatBubble from './ChatBubble.jsx';
import ParticleCanvas from './ParticleCanvas.jsx';

export default function PageShell({ children, showFloaters = true }) {
  return (
    <div className="relative min-h-screen mesh-bg">
      <ParticleCanvas />
      <div className="grain" aria-hidden />
      <div className="grain-fine" aria-hidden />
      <div className="relative z-10 isolate">{children}</div>
      {showFloaters && (
        <>
          <FloatingMenu />
          <ChatBubble />
        </>
      )}
    </div>
  );
}
