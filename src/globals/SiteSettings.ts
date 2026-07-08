import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: { uk: 'Налаштування сайту', en: 'Site Settings' },
  admin: {
    description: 'Загальні налаштування вебсайту організації',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: { uk: 'Загальне', en: 'General' },
          fields: [
            // Бренд-ідентика захардкоджена в дизайні (Header: монограма «В»/«V» + назва).
            // Ці поля нічого не змінюють на сайті — приховані, щоб не вводити менеджера в оману.
            {
              name: 'organizationName',
              type: 'text',
              label: { uk: 'Назва організації', en: 'Organization Name' },
              defaultValue: 'ГО «Ветеран. Дорога до нового життя»',
              required: true,
              localized: true,
              admin: { hidden: true },
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              label: { uk: 'Логотип', en: 'Logo' },
              admin: { hidden: true },
            },
            {
              name: 'tagline',
              type: 'text',
              label: { uk: 'Слоган', en: 'Tagline' },
              defaultValue: 'Підтримка. Відновлення. Нові можливості.',
              localized: true,
              admin: { hidden: true },
            },
            {
              name: 'description',
              type: 'textarea',
              label: { uk: 'Опис', en: 'Description' },
              localized: true,
              admin: {
                description: 'Для SEO мета-опису',
              },
            },
          ],
        },
        {
          label: { uk: 'Заголовки секцій', en: 'Section Headings' },
          description: 'Підписи та заголовки секцій головної сторінки. Якщо поле порожнє — показується стандартний текст.',
          fields: [
            {
              type: 'collapsible',
              label: { uk: 'Про нас', en: 'About' },
              fields: [
                { name: 'aboutSectionLabel', type: 'text', localized: true, label: { uk: 'Підпис секції', en: 'Section label' }, admin: { placeholder: 'Про організацію' } },
                { name: 'aboutSectionTitle', type: 'text', localized: true, label: { uk: 'Заголовок секції', en: 'Section title' }, admin: { placeholder: 'Ми поруч, коли це найбільш потрібно' } },
              ],
            },
            {
              type: 'collapsible',
              label: { uk: 'Напрями діяльності', en: 'Activities' },
              fields: [
                { name: 'activitiesSectionLabel', type: 'text', localized: true, label: { uk: 'Підпис секції', en: 'Section label' }, admin: { placeholder: 'Напрями діяльності' } },
                { name: 'activitiesSectionTitle', type: 'text', localized: true, label: { uk: 'Заголовок секції', en: 'Section title' }, admin: { placeholder: 'Комплексна підтримка на кожному етапі' } },
                { name: 'activitiesSectionDesc', type: 'textarea', localized: true, label: { uk: 'Опис секції', en: 'Section description' } },
              ],
            },
            {
              type: 'collapsible',
              label: { uk: 'Новини', en: 'News' },
              fields: [
                { name: 'newsSectionLabel', type: 'text', localized: true, label: { uk: 'Підпис секції', en: 'Section label' }, admin: { placeholder: 'Останні новини' } },
                { name: 'newsSectionTitle', type: 'text', localized: true, label: { uk: 'Заголовок секції', en: 'Section title' }, admin: { placeholder: 'Що відбувається' } },
              ],
            },
            {
              type: 'collapsible',
              label: { uk: 'Партнери', en: 'Partners' },
              fields: [
                { name: 'partnersSectionLabel', type: 'text', localized: true, label: { uk: 'Підпис секції', en: 'Section label' }, admin: { placeholder: 'Партнери' } },
                { name: 'partnersSectionTitle', type: 'text', localized: true, label: { uk: 'Заголовок секції', en: 'Section title' }, admin: { placeholder: 'Разом ми сильніші' } },
                { name: 'partnersSectionDesc', type: 'textarea', localized: true, label: { uk: 'Опис секції', en: 'Section description' } },
              ],
            },
            {
              type: 'collapsible',
              label: { uk: 'Долучитися', en: 'Join' },
              fields: [
                { name: 'joinSectionLabel', type: 'text', localized: true, label: { uk: 'Підпис секції', en: 'Section label' }, admin: { placeholder: 'Долучитися' } },
                { name: 'joinSectionTitle', type: 'text', localized: true, label: { uk: 'Заголовок секції', en: 'Section title' }, admin: { placeholder: 'Станьте частиною змін' } },
                { name: 'joinSectionDesc', type: 'textarea', localized: true, label: { uk: 'Опис секції', en: 'Section description' } },
              ],
            },
            {
              type: 'collapsible',
              label: { uk: 'Контакти', en: 'Contacts' },
              fields: [
                { name: 'contactsSectionLabel', type: 'text', localized: true, label: { uk: 'Підпис секції', en: 'Section label' }, admin: { placeholder: 'Контакти' } },
                { name: 'contactsSectionTitle', type: 'text', localized: true, label: { uk: 'Заголовок секції', en: 'Section title' }, admin: { placeholder: "Зв'яжіться з нами" } },
              ],
            },
          ],
        },
        {
          label: { uk: 'Герой', en: 'Hero' },
          fields: [
            // Рудименти до редизайну Variant C: поточний Hero рендерить «Історії героя»
            // (heroStories) + портрет, а ці поля нічого не змінюють. Приховано з адмінки,
            // щоб не вводити менеджера в оману. Колонки в БД лишаються (без міграції).
            {
              name: 'heroTitle',
              type: 'text',
              label: { uk: 'Заголовок', en: 'Hero Title' },
              defaultValue: 'Ветеран. Дорога до нового життя',
              localized: true,
              admin: { hidden: true },
            },
            {
              name: 'heroSubtitle',
              type: 'text',
              label: { uk: 'Підзаголовок', en: 'Hero Subtitle' },
              defaultValue: 'Підтримка. Відновлення. Нові можливості.',
              localized: true,
              admin: { hidden: true },
            },
            {
              name: 'heroDescription',
              type: 'textarea',
              label: { uk: 'Опис на героі', en: 'Hero Description' },
              localized: true,
              admin: { hidden: true },
            },
            {
              name: 'heroBackground',
              type: 'upload',
              relationTo: 'media',
              label: { uk: 'Фонове зображення', en: 'Hero Background' },
              admin: { hidden: true },
            },
            {
              name: 'heroPortrait',
              type: 'upload',
              relationTo: 'media',
              label: { uk: 'Портрет героя (за замовчуванням)', en: 'Hero Portrait (default)' },
              admin: {
                description: 'Показується у Hero справа, якщо в конкретної історії немає свого фото.',
              },
            },
            {
              type: 'collapsible',
              label: { uk: 'Портрети історій (за позицією)', en: 'Story portraits (by position)' },
              admin: {
                description: 'Підвантажується по позиції історії в каруселі. Story 1 → Story 1 Photo, і т.д. Залиште порожнім — підставиться загальний Hero Portrait.',
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'heroStory1Photo',
                  type: 'upload',
                  relationTo: 'media',
                  label: { uk: 'Story 1 — Портрет', en: 'Story 1 — Portrait' },
                },
                {
                  name: 'heroStory2Photo',
                  type: 'upload',
                  relationTo: 'media',
                  label: { uk: 'Story 2 — Портрет', en: 'Story 2 — Portrait' },
                },
                {
                  name: 'heroStory3Photo',
                  type: 'upload',
                  relationTo: 'media',
                  label: { uk: 'Story 3 — Портрет', en: 'Story 3 — Portrait' },
                },
                {
                  name: 'heroStory4Photo',
                  type: 'upload',
                  relationTo: 'media',
                  label: { uk: 'Story 4 — Портрет', en: 'Story 4 — Portrait' },
                },
              ],
            },
            {
              name: 'ctaButtonText',
              type: 'text',
              label: { uk: 'Текст кнопки CTA', en: 'CTA Button Text' },
              defaultValue: 'Потребую допомоги',
              localized: true,
            },
            {
              // Кнопка CTA у Hero відкриває модалку допомоги (не посилання) —
              // тож це поле не використовується. Приховано.
              name: 'ctaButtonLink',
              type: 'text',
              label: { uk: 'Посилання кнопки CTA', en: 'CTA Button Link' },
              defaultValue: '#contacts',
              admin: { hidden: true },
            },
            {
              name: 'heroStories',
              type: 'array',
              label: { uk: 'Історії героя (Variant C)', en: 'Hero Stories (Variant C)' },
              maxRows: 8,
              admin: {
                description: 'Ротація історій у hero. Якщо порожньо — показується дефолтний контент.',
              },
              fields: [
                { name: 'chapter', type: 'text', label: { uk: 'Заголовок-розділ (напр. "Історія 01 · Олексій")', en: 'Chapter label' } },
                { name: 'title1', type: 'text', label: { uk: 'Заголовок, рядок 1', en: 'Title line 1' } },
                { name: 'title2', type: 'text', label: { uk: 'Заголовок, рядок 2 (золотий)', en: 'Title line 2 (gold)' } },
                { name: 'body', type: 'textarea', label: { uk: 'Основний текст', en: 'Body' }, admin: { description: 'Перший символ автоматично стає drop-cap' } },
                { name: 'name', type: 'text', label: { uk: "Ім'я", en: 'Name' } },
                { name: 'meta', type: 'text', label: { uk: 'Підпис (підрозділ · рік · місто)', en: 'Caption (unit · year · city)' } },
              ],
            },
            // Рудименти Variant C: прогрес-бар у поточному Hero відсутній. Приховано.
            {
              type: 'row',
              fields: [
                {
                  name: 'progressCurrent',
                  type: 'number',
                  label: { uk: 'Прогрес: поточне число', en: 'Progress: Current' },
                  defaultValue: 500,
                  admin: { width: '25%', description: 'Скільки вже допомогли', hidden: true },
                },
                {
                  name: 'progressGoal',
                  type: 'number',
                  label: { uk: 'Прогрес: мета', en: 'Progress: Goal' },
                  defaultValue: 1000,
                  admin: { width: '25%', description: 'Цільове число', hidden: true },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'progressLabelDone',
                  type: 'text',
                  label: { uk: 'Лейбл "Допомогли"', en: 'Label "Helped"' },
                  defaultValue: 'Допомогли ветеранам',
                  admin: { width: '50%', hidden: true },
                },
                {
                  name: 'progressLabelGoal',
                  type: 'text',
                  label: { uk: 'Лейбл "Мета"', en: 'Label "Goal"' },
                  defaultValue: 'Мета',
                  admin: { width: '50%', hidden: true },
                },
              ],
            },
          ],
        },
        {
          label: { uk: 'Контакти', en: 'Contacts' },
          fields: [
            {
              name: 'address',
              type: 'textarea',
              label: { uk: 'Адреса', en: 'Address' },
              defaultValue: 'м. Київ, вул. Хрещатик, 1\nОфіс 301',
              localized: true,
            },
            {
              name: 'phones',
              type: 'array',
              label: { uk: 'Телефони', en: 'Phones' },
              fields: [
                {
                  name: 'number',
                  type: 'text',
                  label: { uk: 'Номер', en: 'Number' },
                  required: true,
                },
                {
                  name: 'label',
                  type: 'text',
                  label: { uk: 'Підпис', en: 'Label' },
                  admin: { description: 'Наприклад: Основний, Гаряча лінія' },
                },
              ],
            },
            {
              name: 'email',
              type: 'email',
              label: { uk: 'Email', en: 'Email' },
              defaultValue: 'info@veteran-road.org.ua',
            },
            {
              name: 'workingHours',
              type: 'textarea',
              label: { uk: 'Графік роботи', en: 'Working Hours' },
              defaultValue: 'Пн — Пт: 9:00 — 18:00\nСб: 10:00 — 14:00',
              localized: true,
            },
            {
              name: 'googleMapsEmbed',
              type: 'textarea',
              label: { uk: 'Google Maps', en: 'Google Maps' },
              admin: {
                description: 'Вставте будь-що: посилання з Google Maps, або повний <iframe> код з вкладки "Встраивание карт". Система розбереться автоматично.',
              },
            },
          ],
        },
        {
          label: { uk: 'Соцмережі', en: 'Social Media' },
          fields: [
            {
              name: 'socialLinks',
              type: 'array',
              label: { uk: 'Посилання на соцмережі', en: 'Social Links' },
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  label: { uk: 'Платформа', en: 'Platform' },
                  required: true,
                  options: [
                    { label: 'Facebook', value: 'facebook' },
                    { label: 'Instagram', value: 'instagram' },
                    { label: 'YouTube', value: 'youtube' },
                    { label: 'TikTok', value: 'tiktok' },
                    { label: 'Telegram', value: 'telegram' },
                    { label: 'Viber', value: 'viber' },
                    { label: 'WhatsApp', value: 'whatsapp' },
                  ],
                },
                {
                  name: 'url',
                  type: 'text',
                  label: { uk: 'URL', en: 'URL' },
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: { uk: 'Про нас', en: 'About' },
          fields: [
            {
              name: 'aboutText',
              type: 'richText',
              label: { uk: 'Текст «Про нас»', en: 'About Text' },
              localized: true,
            },
            {
              name: 'aboutImage',
              type: 'upload',
              relationTo: 'media',
              label: { uk: 'Зображення', en: 'About Image' },
            },
            {
              name: 'stats',
              type: 'array',
              label: { uk: 'Статистика', en: 'Stats' },
              maxRows: 6,
              fields: [
                {
                  name: 'number',
                  type: 'text',
                  label: { uk: 'Число', en: 'Number' },
                  admin: { description: 'Наприклад: 500+, 7, 50+' },
                },
                {
                  name: 'label',
                  type: 'text',
                  label: { uk: 'Підпис', en: 'Label' },
                },
              ],
            },
          ],
        },
        {
          label: { uk: 'Реквізити', en: 'Details' },
          fields: [
            {
              name: 'legalName',
              type: 'text',
              label: { uk: 'Юридична назва', en: 'Legal Name' },
              localized: true,
            },
            {
              name: 'edrpou',
              type: 'text',
              label: { uk: 'Код ЄДРПОУ', en: 'EDRPOU Code' },
            },
            {
              name: 'bankDetails',
              type: 'richText',
              label: { uk: 'Банківські реквізити', en: 'Bank Details' },
              localized: true,
            },
          ],
        },
        {
          label: { uk: 'Схема роботи', en: 'How We Work' },
          fields: [
            {
              name: 'howWeWorkTitle',
              type: 'text',
              label: { uk: 'Заголовок секції', en: 'Section Title' },
              defaultValue: 'Схема роботи',
              localized: true,
            },
            {
              name: 'howWeWorkSubtitle',
              type: 'textarea',
              label: { uk: 'Підзаголовок', en: 'Subtitle' },
              defaultValue: 'Від першого звернення до результату — простий та зрозумілий процес отримання допомоги.',
              localized: true,
            },
            {
              name: 'steps',
              type: 'array',
              label: { uk: 'Кроки', en: 'Steps' },
              maxRows: 6,
              admin: {
                description: 'Мови зберігаються одним значенням на рядок (SQLite масив без локалізації). Для двох мов — перекладіть тексти перед показом відповідної версії сайту.',
              },
              fields: [
                { name: 'eyebrow', type: 'text', label: { uk: 'Над-заголовок (напр. "Перший крок")', en: 'Eyebrow' } },
                { name: 'title', type: 'text', label: { uk: 'Назва кроку', en: 'Step Title' } },
                { name: 'short', type: 'text', label: { uk: 'Короткий опис (під цифрою)', en: 'Short description' } },
                { name: 'long', type: 'textarea', label: { uk: 'Повний опис (у деталях)', en: 'Full description' } },
                { name: 'meta', type: 'text', label: { uk: 'Мета-підпис (напр. "24 години")', en: 'Meta (e.g. "24 hours")' } },
                {
                  name: 'tags',
                  type: 'array',
                  label: { uk: 'Теги', en: 'Tags' },
                  maxRows: 5,
                  fields: [
                    { name: 'label', type: 'text', label: { uk: 'Текст тегу', en: 'Tag text' } },
                  ],
                },
                { name: 'description', type: 'textarea', label: { uk: 'Опис (legacy)', en: 'Description (legacy)' }, admin: { description: 'Старе поле, використовується як fallback якщо short/long порожні.' } },
              ],
            },
          ],
        },
        {
          label: { uk: 'Відгуки', en: 'Testimonials' },
          fields: [
            {
              name: 'testimonialsTitle',
              type: 'text',
              label: { uk: 'Заголовок секції', en: 'Section Title' },
              defaultValue: 'Що кажуть наші підопічні',
              localized: true,
            },
            {
              name: 'testimonials',
              type: 'array',
              label: { uk: 'Відгуки', en: 'Testimonials' },
              maxRows: 10,
              admin: {
                description: 'Мови зберігаються одним значенням на рядок. Для двох мов — перекладіть тексти перед показом відповідної версії сайту.',
              },
              fields: [
                { name: 'name', type: 'text', label: { uk: "Ім'я", en: 'Name' } },
                { name: 'role', type: 'text', label: { uk: 'Роль / підрозділ', en: 'Role / unit' } },
                { name: 'date', type: 'text', label: { uk: 'Дата запису', en: 'Record date' }, admin: { description: 'Напр.: "Листопад 2024"' } },
                { name: 'quote', type: 'textarea', label: { uk: 'Цитата', en: 'Quote' } },
                { name: 'photo', type: 'upload', relationTo: 'media', label: { uk: 'Фото', en: 'Photo' } },
                { name: 'hasAudio', type: 'checkbox', label: { uk: 'Є аудіозапис', en: 'Has audio' }, defaultValue: false },
                { name: 'audioDuration', type: 'text', label: { uk: 'Тривалість (м:сс)', en: 'Duration (m:ss)' }, admin: { description: 'Напр.: "2:14"' } },
                { name: 'text', type: 'textarea', label: { uk: 'Текст (legacy)', en: 'Text (legacy)' }, admin: { description: 'Старе поле — fallback для quote.' } },
                { name: 'initials', type: 'text', label: { uk: 'Ініціали (legacy)', en: 'Initials (legacy)' } },
              ],
            },
          ],
        },
        {
          label: { uk: 'SEO', en: 'SEO' },
          fields: [
            {
              name: 'seoTitle',
              type: 'text',
              label: { uk: 'SEO Заголовок', en: 'SEO Title' },
              localized: true,
              admin: { description: 'Заголовок для пошукових систем (50-60 символів)' },
            },
            {
              name: 'seoDescription',
              type: 'textarea',
              label: { uk: 'SEO Опис', en: 'SEO Description' },
              localized: true,
              admin: { description: 'Мета-опис для пошукових систем (150-160 символів)' },
            },
            {
              name: 'seoKeywords',
              type: 'text',
              label: { uk: 'Ключові слова', en: 'Keywords' },
              localized: true,
              admin: { description: 'Через кому: ветеран, допомога, підтримка' },
            },
            {
              name: 'ogImage',
              type: 'upload',
              relationTo: 'media',
              label: { uk: 'OG Зображення', en: 'OG Image' },
              admin: { description: 'Зображення для соц. мереж (1200×630)' },
            },
            {
              name: 'canonicalUrl',
              type: 'text',
              label: { uk: 'Canonical URL', en: 'Canonical URL' },
              admin: { description: 'https://veteran-road.org.ua' },
            },
            {
              name: 'googleVerification',
              type: 'text',
              label: { uk: 'Google Verification', en: 'Google Verification' },
              admin: { description: 'Google Search Console verification code' },
            },
          ],
        },
      ],
    },
  ],
}
