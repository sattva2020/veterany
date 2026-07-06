import type { CollectionConfig } from 'payload'

export const News: CollectionConfig = {
  slug: 'news',
  labels: {
    singular: { uk: 'Новина', en: 'News Item' },
    plural: { uk: 'Новини', en: 'News' },
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
