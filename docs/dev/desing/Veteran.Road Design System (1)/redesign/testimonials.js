// Testimonials carousel — photo + quote + audio waveform + navigation
window.TESTIMONIAL_DATA = {
  uk: [
    { name: 'Олексій Я.', role: '47 ОМБр', date: 'Листопад 2024', photoTone: 'warm', hasAudio: true, duration: '2:14',
      quote: 'Я прийшов сюди, бо перестав впізнавати себе. Через півроку я знову сміюся з донькою за вечерею. Це не чудо — це робота. Просто я був не один.' },
    { name: 'Марія К.', role: 'Дружина ветерана', date: 'Січень 2025', photoTone: 'cool', hasAudio: true, duration: '1:48',
      quote: 'Ми всі поверталися разом — я, діти, він. Тут нам показали, як говорити одне з одним знову. Без психологів вдома було б складніше.' },
    { name: 'Богдан С.', role: '93 ОМБр · Холодний Яр', date: 'Березень 2025', photoTone: 'ash', hasAudio: false, duration: null,
      quote: 'Юрист «Дороги» за два тижні оформив усе, що я пів року не міг зрушити. Просто сів поруч і сказав: підпишемо це разом.' },
    { name: 'Катерина М.', role: 'Мама ветерана', date: 'Грудень 2024', photoTone: 'gold', hasAudio: true, duration: '3:02',
      quote: 'Коли син повернувся, я мовчала — боялася зачепити. Тут мене навчили, що бути поруч — це не завжди говорити. Інколи це просто бути.' },
    { name: 'Віталій П.', role: '79 ОДШБр · Повернувся 2023', date: 'Жовтень 2024', photoTone: 'warm', hasAudio: true, duration: '2:36',
      quote: 'Вони не обіцяли, що стане легко. Вони сказали — буде зрозуміло, що робити далі. І це вперше за довгий час дало мені опору.' }
  ],
  en: [
    { name: 'Oleksii Ya.', role: '47th Brigade', date: 'November 2024', photoTone: 'warm', hasAudio: true, duration: '2:14',
      quote: "I came here because I had stopped recognizing myself. Six months later, I'm laughing with my daughter over dinner again. It's not a miracle — it's work. I just wasn't alone." },
    { name: 'Mariia K.', role: "Veteran's wife", date: 'January 2025', photoTone: 'cool', hasAudio: true, duration: '1:48',
      quote: "We all came back together — me, the kids, him. They showed us how to talk to each other again. It would have been much harder without the therapists." },
    { name: 'Bohdan S.', role: '93rd Brigade · Kholodnyi Yar', date: 'March 2025', photoTone: 'ash', hasAudio: false, duration: null,
      quote: 'In two weeks, their lawyer sorted out what I had struggled with for half a year. He just sat next to me and said: we will sign this together.' },
    { name: 'Kateryna M.', role: "Veteran's mother", date: 'December 2024', photoTone: 'gold', hasAudio: true, duration: '3:02',
      quote: "When my son came back, I stayed silent — afraid to touch anything. Here they taught me that being there isn't always about talking. Sometimes it's just being." },
    { name: 'Vitalii P.', role: '79th Brigade · Returned 2023', date: 'October 2024', photoTone: 'warm', hasAudio: true, duration: '2:36',
      quote: "They didn't promise it would get easy. They said — you'll know what to do next. For the first time in a long time, that gave me ground to stand on." }
  ]
};

window.renderTestimonials = function(lang, tone) {
  const data = window.TESTIMONIAL_DATA[lang] || window.TESTIMONIAL_DATA.uk;
  const track = document.getElementById('test-track');
  const thumbs = document.getElementById('test-thumbs');
  const counterEl = document.getElementById('test-current');
  const prevBtn = document.getElementById('test-prev');
  const nextBtn = document.getElementById('test-next');

  let current = 0;
  let playing = null;
  let playedTimer = null;

  track.innerHTML = data.map((t, i) => {
    const photoTone = tone || t.photoTone;
    return `
    <div class="test-slide" data-slide="${i}">
      <div class="test-photo">
        ${window.makePhotoPlaceholder({ w: 600, h: 750, caption: t.name.toUpperCase() + ' · PORTRAIT', tone: photoTone })}
        <div class="photo-badge">${lang === 'uk' ? 'Історія' : 'Story'} ${String(i+1).padStart(2,'0')}</div>
      </div>
      <div class="test-content">
        <div class="test-quote-mark">«</div>
        <div class="test-quote">${t.quote}</div>
        <div class="test-cite">
          <div>
            <div class="test-cite-name">${t.name}</div>
            <div class="test-cite-meta">${t.role}</div>
          </div>
          <div class="test-cite-divider"></div>
          <div class="test-cite-date">
            <strong>${t.date}</strong>
            ${lang === 'uk' ? 'Записано' : 'Recorded'}
          </div>
        </div>
        ${t.hasAudio ? `
          <div class="test-audio" data-audio="${i}">
            <button class="test-audio-btn" data-play="${i}" aria-label="Play">
              <svg class="ic-play" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              <svg class="ic-pause" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="display:none"><path d="M6 4h4v16H6zm8 0h4v16h-4z"/></svg>
            </button>
            <div class="test-audio-wave">
              ${window.makeWaveform(60, i + 7)}
              <div class="played">${window.makeWaveform(60, i + 7)}</div>
            </div>
            <div class="test-audio-time">0:00 / ${t.duration}</div>
          </div>
        ` : `
          <div class="test-no-audio">${lang === 'uk' ? '— текстовий відгук —' : '— text testimonial —'}</div>
        `}
      </div>
    </div>`;
  }).join('');

  thumbs.innerHTML = data.map((t, i) => {
    const photoTone = tone || t.photoTone;
    return `
    <button class="test-thumb ${i===0?'active':''}" data-thumb="${i}">
      <div class="test-thumb-img">${window.makePhotoPlaceholder({ w: 120, h: 120, caption: 'PORTRAIT', tone: photoTone })}</div>
      <div class="test-thumb-text">
        <div class="test-thumb-name">${t.name}</div>
        <div class="test-thumb-role">${t.role}</div>
      </div>
    </button>`;
  }).join('');

  const stopPlayback = () => {
    if (playedTimer) { clearInterval(playedTimer); playedTimer = null; }
    document.querySelectorAll('.test-audio-btn.playing').forEach(b => {
      b.classList.remove('playing');
      b.querySelector('.ic-play').style.display = '';
      b.querySelector('.ic-pause').style.display = 'none';
    });
    document.querySelectorAll('.test-audio .played').forEach(p => p.style.setProperty('--played', '0%'));
    document.querySelectorAll('.test-audio-time').forEach((el, idx) => {
      if (data[idx] && data[idx].hasAudio) el.textContent = '0:00 / ' + data[idx].duration;
    });
    playing = null;
  };

  const goTo = (i) => {
    current = (i + data.length) % data.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    counterEl.textContent = String(current + 1).padStart(2, '0');
    document.querySelectorAll('.test-thumb').forEach((el, idx) => el.classList.toggle('active', idx === current));
    stopPlayback();
    // scroll thumb into view horizontally
    const active = document.querySelector('.test-thumb.active');
    if (active && active.parentElement) {
      const container = active.parentElement;
      const offset = active.offsetLeft - container.offsetWidth / 2 + active.offsetWidth / 2;
      container.scrollTo({ left: offset, behavior: 'smooth' });
    }
  };

  prevBtn.onclick = () => goTo(current - 1);
  nextBtn.onclick = () => goTo(current + 1);
  document.querySelectorAll('.test-thumb').forEach(el => {
    el.addEventListener('click', () => goTo(+el.dataset.thumb));
  });

  // Audio playback simulation (fake player with waveform progress)
  document.querySelectorAll('.test-audio-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = +btn.dataset.play;
      const slide = data[idx];
      if (!slide.hasAudio) return;

      if (playing === idx) { stopPlayback(); return; }
      stopPlayback();
      playing = idx;
      btn.classList.add('playing');
      btn.querySelector('.ic-play').style.display = 'none';
      btn.querySelector('.ic-pause').style.display = '';

      const audioEl = document.querySelector(`.test-audio[data-audio="${idx}"]`);
      const played = audioEl.querySelector('.played');
      const timeEl = audioEl.querySelector('.test-audio-time');
      const [mm, ss] = slide.duration.split(':').map(Number);
      const totalSec = mm * 60 + ss;
      let cur = 0;
      playedTimer = setInterval(() => {
        cur += 0.1;
        if (cur >= totalSec) { stopPlayback(); return; }
        const pct = (cur / totalSec * 100);
        played.style.setProperty('--played', pct + '%');
        played.style.width = pct + '%';
        const m = Math.floor(cur / 60);
        const s = Math.floor(cur % 60);
        timeEl.textContent = `${m}:${String(s).padStart(2,'0')} / ${slide.duration}`;
      }, 100);
    });
  });

  // keyboard
  document.addEventListener('keydown', (e) => {
    const vis = document.getElementById('testimonials').getBoundingClientRect();
    const inView = vis.top < window.innerHeight && vis.bottom > 0;
    if (!inView) return;
    if (e.key === 'ArrowLeft') goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
  });

  goTo(0);
};
