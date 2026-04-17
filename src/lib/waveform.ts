export function makeWaveform(bars = 60, seed = 1): string {
  let s = seed
  const rand = () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
  const width = 100
  const step = width / bars
  const rects: string[] = []
  for (let i = 0; i < bars; i++) {
    const h = 20 + rand() * 60
    const y = 50 - h / 2
    const x = i * step
    rects.push(
      `<rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${(step * 0.55).toFixed(2)}" height="${h.toFixed(2)}" rx="1" fill="currentColor"/>`
    )
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none" width="100%" height="100%">${rects.join('')}</svg>`
}
