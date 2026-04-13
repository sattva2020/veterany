import type { CollectionConfig } from 'payload'

export const Activities: CollectionConfig = {
  slug: 'activities',
  labels: {
    singular: { uk: 'Напрям діяльності', en: 'Activity' },
    plural: { uk: 'Напрями діяльності', en: 'Activities' },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'order', 'isActive'],
    description: '7 основних напрямів діяльності організації',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: { uk: 'Назва', en: 'Title' },
      required: true,
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
      name: 'icon',
      type: 'text',
      label: { uk: 'Іконка (emoji)', en: 'Icon (emoji)' },
      required: true,
      admin: {
        description: 'Emoji-іконка для картки, наприклад: 🧠 💪 ⚖️',
      },
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      label: { uk: 'Короткий опис', en: 'Short Description' },
      required: true,
      admin: {
        description: 'Текст для картки на головній сторінці (2-3 речення)',
      },
    },
    {
      name: 'fullDescription',
      type: 'richText',
      label: { uk: 'Повний опис', en: 'Full Description' },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: { uk: 'Зображення', en: 'Image' },
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      label: { uk: 'Виділений блок', en: 'Featured' },
      defaultValue: false,
      admin: {
        description: 'Показати як великий виділений блок на головній',
        position: 'sidebar',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: { uk: 'Порядок', en: 'Order' },
      required: true,
      defaultValue: 0,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: { uk: 'Активний', en: 'Active' },
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
