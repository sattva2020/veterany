// Timeline — 4 stages of support journey
window.TIMELINE_DATA = {
  uk: [
    {
      n: '01', title: 'Звернення', eyebrow: 'Перший крок',
      short: 'Зателефонуйте, напишіть або приходьте особисто.',
      long: 'Телефоном, у формі на сайті, або через будь-якого знайомого. Ми передзвонюємо протягом 24 годин. Конфіденційно, безоплатно, без осуду — жодна заявка не залишається без відповіді.',
      tags: ['24/7 гаряча лінія', 'Конфіденційно', 'Безоплатно'],
      meta: '24 години'
    },
    {
      n: '02', title: 'Консультація', eyebrow: 'Перше знайомство',
      short: 'Слухаємо, розуміємо, визначаємо пріоритети.',
      long: 'Персональна зустріч із координатором (офлайн у Києві чи онлайн). Разом визначаємо, що потрібно зараз — психологічна, юридична, медична чи соціальна підтримка. Без анкет. Без бланків.',
      tags: ['Офлайн або онлайн', 'Без анкет', 'Зі шанобою'],
      meta: '60–90 хв'
    },
    {
      n: '03', title: 'План допомоги', eyebrow: 'Дорога для вас',
      short: 'Складаємо індивідуальний маршрут із конкретними кроками.',
      long: 'Команда спеціалістів (психолог, юрист, соцпрацівник, ментор) формує ваш персональний план. Прозорі етапи, зрозумілі терміни, відповідальні за кожен крок. Ви знаєте, що буде далі.',
      tags: ['Персональний маршрут', 'Прозорі терміни', 'Один координатор'],
      meta: '3–7 днів'
    },
    {
      n: '04', title: 'Супровід', eyebrow: 'Ми поруч',
      short: 'Супроводжуємо до результату — скільки потрібно.',
      long: 'Не покидаємо після першої зустрічі. Супровід триває стільки, скільки треба вам: від кількох тижнів до років. Щомісячні зустрічі, можливість повернутися в будь-який момент, спільнота тих, хто пройшов цю дорогу.',
      tags: ['Довгостроково', 'Спільнота', 'Без «виписки»'],
      meta: 'Безстроково'
    }
  ],
  en: [
    {
      n: '01', title: 'Reach out', eyebrow: 'First step',
      short: 'Call, write, or visit us in person.',
      long: 'By phone, form on the site, or through a friend. We call back within 24 hours. Confidential, free, no judgment — every request gets an answer.',
      tags: ['24/7 hotline', 'Confidential', 'Free of charge'],
      meta: '24 hours'
    },
    {
      n: '02', title: 'Consultation', eyebrow: 'First meeting',
      short: 'We listen, understand, and find your priorities.',
      long: 'Personal meeting with a coordinator (in-person in Kyiv or online). Together we identify what you need now — psychological, legal, medical, or social support. No forms. No bureaucracy.',
      tags: ['Online or in-person', 'No forms', 'With respect'],
      meta: '60–90 min'
    },
    {
      n: '03', title: 'Support plan', eyebrow: 'Your road',
      short: 'A personal roadmap with concrete steps.',
      long: 'A team of specialists (psychologist, lawyer, social worker, mentor) builds your personalized plan. Clear stages, understandable deadlines, a person responsible for every step.',
      tags: ['Personal roadmap', 'Clear deadlines', 'One coordinator'],
      meta: '3–7 days'
    },
    {
      n: '04', title: 'Ongoing support', eyebrow: 'We stay',
      short: 'We walk with you for as long as it takes.',
      long: "We don't leave after the first meeting. Support lasts as long as you need — from weeks to years. Monthly check-ins, the option to return anytime, and a community of those who walked the road.",
      tags: ['Long-term', 'Community', 'No "discharge"'],
      meta: 'Open-ended'
    }
  ]
};

window.renderTimeline = function(lang) {
  const data = window.TIMELINE_DATA[lang] || window.TIMELINE_DATA.uk;
  const stepsEl = document.getElementById('timeline-steps');
  stepsEl.innerHTML = data.map((s, i) => `
    <div class="tl-step" data-step="${i}">
      <div class="tl-num">
        <div class="tl-num-ring"></div>
        <div class="tl-num-inner">${s.n}</div>
      </div>
      <div class="tl-eyebrow">${s.eyebrow}</div>
      <h3>${s.title}</h3>
      <p>${s.short}</p>
      <div class="tl-meta">${s.meta}</div>
    </div>
  `).join('');

  const setActive = (idx) => {
    document.querySelectorAll('.tl-step').forEach((el, i) => {
      el.classList.toggle('active', i === idx);
      el.classList.toggle('done', i < idx);
    });
    const s = data[idx];
    document.getElementById('tl-detail-num').textContent = s.n;
    document.getElementById('tl-detail-title').textContent = s.title;
    document.getElementById('tl-detail-desc').textContent = s.long;
    document.getElementById('tl-detail-tags').innerHTML = s.tags.map(t => `<li>${t}</li>`).join('');

    const track = document.getElementById('timeline-track');
    track.style.setProperty('--progress', ((idx + 0.5) / data.length * 100) + '%');
    track.classList.add('animate');
  };

  document.querySelectorAll('.tl-step').forEach((el, i) => {
    el.addEventListener('click', () => setActive(i));
  });

  setActive(0);
};
