import type { CollectionConfig } from 'payload'

export const JoinOptions: CollectionConfig = {
  slug: 'join-options',
  labels: {
    singular: { uk: 'Спосіб долучитися', en: 'Join Option' },
    plural: { uk: 'Способи долучитися', en: 'Join Options' },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'order', 'isActive'],
    description: 'Волонтерство, Партнерство, Бізнес, Членство',
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
      localized: true,
    },
    {
      name: 'icon',
      type: 'text',
      label: { uk: 'Іконка (emoji)', en: 'Icon (emoji)' },
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: { uk: 'Опис', en: 'Description' },
      required: true,
      localized: true,
    },
    {
      name: 'fullContent',
      type: 'richText',
      label: { uk: 'Детальний опис', en: 'Full Content' },
      localized: true,
    },
    {
      name: 'order',
      type: 'number',
      label: { uk: 'Порядок', en: 'Order' },
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: { uk: 'Активний', en: 'Active' },
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
  ],
}
