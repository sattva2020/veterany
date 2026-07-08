import type { CollectionConfig } from 'payload'

// Транслітерація + очищення для slug: кирилиця → латиниця, пробіли → дефіси.
// Потрібно, бо менеджер зазвичай не заповнює поле Slug вручну,
// а без slug неможливо побудувати URL сторінки новини.
const translitMap: Record<string, string> = {
  а: 'a', б: 'b', в: 'v', г: 'h', ґ: 'g', д: 'd', е: 'e', є: 'ie', ж: 'zh',
  з: 'z', и: 'y', і: 'i', ї: 'i', й: 'i', к: 'k', л: 'l', м: 'm', н: 'n',
  о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'kh', ц: 'ts',
  ч: 'ch', ш: 'sh', щ: 'shch', ь: '', ю: 'iu', я: 'ia', ъ: '', ы: 'y', э: 'e', ё: 'e',
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .split('')
    .map((ch) => (ch in translitMap ? translitMap[ch] : ch))
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

export const News: CollectionConfig = {
  slug: 'news',
  labels: {
    singular: { uk: 'Новина', en: 'News Item' },
    plural: { uk: 'Новини', en: 'News' },
  },
  hooks: {
    // Автоматично формуємо slug із заголовка, якщо його не заповнили вручну.
    // Гарантує, що у кожної новини є робочий URL для сторінки-деталі.
    beforeChange: [
      ({ data }) => {
        if (!data) return data
        if (!data.slug || String(data.slug).trim() === '') {
          const base = typeof data.title === 'string' ? data.title : ''
          const generated = slugify(base)
          if (generated) {
            // Додаємо короткий суфікс часу, щоб уникнути колізій unique-поля.
            data.slug = `${generated}-${Date.now().toString(36).slice(-4)}`
          }
        }
        return data
      },
    ],
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'tag', 'publishDate', 'status'],
    description: 'Новини та оновлення організації',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: { uk: 'Заголовок', en: 'Title' },
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: { uk: 'Slug (URL)', en: 'Slug' },
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'tag',
      type: 'select',
      label: { uk: 'Тег', en: 'Tag' },
      required: true,
      options: [
        { label: { uk: 'Подія', en: 'Event' }, value: 'event' },
        { label: { uk: 'Програма', en: 'Program' }, value: 'program' },
        { label: { uk: 'Партнерство', en: 'Partnership' }, value: 'partnership' },
        { label: { uk: 'Досягнення', en: 'Achievement' }, value: 'achievement' },
        { label: { uk: 'Анонс', en: 'Announcement' }, value: 'announcement' },
      ],
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: { uk: 'Короткий опис', en: 'Excerpt' },
      required: true,
      localized: true,
      admin: {
        description: 'Текст для картки на головній (1-2 речення)',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: { uk: 'Зміст', en: 'Content' },
      required: true,
      localized: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: { uk: 'Головне зображення', en: 'Featured Image' },
      admin: {
        description:
          'Рекомендовано горизонтальне фото 16:9 (1600x900 або 1920x1080). На сайті фото показується повністю, без обрізання; вертикальні фото теж можна використовувати.',
      },
    },
    {
      name: 'gallery',
      type: 'array',
      label: { uk: 'Додаткові фото', en: 'Additional Photos' },
      admin: {
        description:
          'Можна додати кілька фото до новини. На головній сторінці показується головне фото або перше фото з галереї.',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: { uk: 'Фото', en: 'Photo' },
          required: true,
        },
      ],
    },
    {
      name: 'publishDate',
      type: 'date',
      label: { uk: 'Дата публікації', en: 'Publish Date' },
      required: true,
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'dd.MM.yyyy',
        },
      },
    },
    {
      name: 'status',
      type: 'select',
      label: { uk: 'Статус', en: 'Status' },
      defaultValue: 'draft',
      options: [
        { label: { uk: 'Чернетка', en: 'Draft' }, value: 'draft' },
        { label: { uk: 'Опубліковано', en: 'Published' }, value: 'published' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
