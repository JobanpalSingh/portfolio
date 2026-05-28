import { ExternalLink } from 'lucide-react';
import { assetUrl } from '../../api/client.js';

function vimeoId(url) {
  const m = url.trim().match(/vimeo\.com\/(?:video\/)?(\d+)/i);
  return m ? m[1] : null;
}

function youtubeId(url) {
  const u = url.trim();
  let m = u.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{6,})/i
  );
  if (m) return m[1];
  m = u.match(/[?&]v=([a-zA-Z0-9_-]{6,})/i);
  return m ? m[1] : null;
}

function isDirectVideo(url) {
  return /\.(mp4|webm|ogg)(\?|#|$)/i.test(url.trim());
}

/** Direct MP4/WebM → native video element. Vimeo + YouTube → iframe (standard YouTube player UI). */
export default function ProjectVideoEmbed({ url }) {
  const src = (url || '').trim();
  if (!src) return null;

  if (isDirectVideo(src)) {
    const href = src.startsWith('http') ? src : assetUrl(src);
    return (
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_0_40px_rgba(168,85,247,0.12)]">
        <video
          src={href}
          controls
          playsInline
          className="aspect-video w-full bg-black object-contain"
          preload="metadata"
        />
      </div>
    );
  }

  const vid = vimeoId(src);
  if (vid) {
    return (
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_0_40px_rgba(168,85,247,0.12)]">
        <iframe
          title="Project video"
          src={`https://player.vimeo.com/video/${vid}?title=0&byline=0&portrait=0&dnt=1`}
          className="aspect-video w-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }

  const yt = youtubeId(src);
  if (yt) {
    const embed = `https://www.youtube.com/embed/${yt}?rel=0`;
    return (
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_0_40px_rgba(168,85,247,0.12)]">
        <iframe
          title="YouTube video"
          src={embed}
          className="aspect-video w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <p className="text-sm text-slate-300">
        Use a <strong className="text-purple-200">YouTube</strong>, <strong className="text-purple-200">Vimeo</strong>, or
        direct <strong className="text-purple-200">.mp4 / .webm</strong> link for an embedded player.
      </p>
      <a
        href={src}
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-flex items-center gap-2 rounded-full border border-purple-400/22 bg-purple-500/10 px-4 py-2 text-sm font-semibold text-purple-100/95 transition hover:border-purple-400/28 hover:bg-purple-500/14"
      >
        <ExternalLink className="h-4 w-4" />
        Open video link
      </a>
    </div>
  );
}
