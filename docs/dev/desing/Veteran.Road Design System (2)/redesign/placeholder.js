// Documentary-style photo placeholders
// Generates muted, cinematic SVG placeholders with a scene caption
// matching the savethelimb.org reference — warm/cool tones, grain, no fake illustration

window.makePhotoPlaceholder = function(opts) {
  const { w = 800, h = 600, caption = 'PHOTO', tone = 'warm', ratio = null } = opts;
  const id = 'ph_' + Math.random().toString(36).slice(2, 9);

  const tones = {
    warm:    { a: '#3d2a1f', b: '#1a0f08', accent: '#8b5a2b' },
    cool:    { a: '#1a2438', b: '#0a1220', accent: '#2a4d7a' },
    navy:    { a: '#162a4a', b: '#0a1628', accent: '#1e3a5f' },
    ash:     { a: '#2a2520', b: '#14110e', accent: '#4a3f33' },
    gold:    { a: '#3a2e15', b: '#1a1508', accent: '#d4a843' },
    cream:   { a: '#d8cfc2', b: '#b8a998', accent: '#8b6f4a' },
  };
  const t = tones[tone] || tones.warm;

  return `
  <svg class="photo-ph" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="${id}-g" x1="0" y1="0" x2="0.7" y2="1">
        <stop offset="0" stop-color="${t.a}"/>
        <stop offset="1" stop-color="${t.b}"/>
      </linearGradient>
      <radialGradient id="${id}-v" cx="0.5" cy="0.45" r="0.75">
        <stop offset="0.3" stop-color="transparent"/>
        <stop offset="1" stop-color="rgba(0,0,0,0.55)"/>
      </radialGradient>
      <filter id="${id}-noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="${Math.floor(Math.random()*100)}"/>
        <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.14 0"/>
      </filter>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#${id}-g)"/>
    <rect width="${w}" height="${h}" fill="${t.accent}" opacity="0.08"/>
    <rect width="${w}" height="${h}" fill="url(#${id}-v)"/>
    <rect width="${w}" height="${h}" filter="url(#${id}-noise)" opacity="0.35"/>
    <g opacity="0.4" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" fill="#fff">
      <text x="20" y="28" font-size="10" letter-spacing="2" font-weight="500">PHOTO_PLACEHOLDER</text>
      <text x="20" y="${h - 18}" font-size="11" letter-spacing="1" font-weight="500" opacity="0.85">▸ ${caption}</text>
    </g>
  </svg>`;
};

// Audio waveform SVG — for audio testimonial previews
window.makeWaveform = function(bars = 60, seed = 1) {
  let rng = seed;
  const rand = () => { rng = (rng * 9301 + 49297) % 233280; return rng / 233280; };
  const heights = [];
  for (let i = 0; i < bars; i++) {
    // Create a more natural voice envelope
    const env = Math.sin((i / bars) * Math.PI) * 0.6 + 0.3;
    heights.push(Math.max(0.12, env * (0.5 + rand() * 0.5)));
  }
  const barW = 3, gap = 2, total = bars * (barW + gap);
  const rects = heights.map((h, i) => {
    const bh = h * 48;
    const y = 24 - bh / 2;
    return `<rect x="${i * (barW + gap)}" y="${y}" width="${barW}" height="${bh}" rx="1.5" fill="currentColor"/>`;
  }).join('');
  return `<svg viewBox="0 0 ${total} 48" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">${rects}</svg>`;
};
