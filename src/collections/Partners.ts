import type { CollectionConfig } from 'payload'

export const Partners: CollectionConfig = {
  slug: 'partners',
  labels: {
    singular: { uk: 'Партнер', en: 'Partner' },
    plural: { uk: 'Партнери', en: 'Partners' },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'isActive', 'order'],
    description: 'Партнери та спонсори організації',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: { uk: 'Назва', en: 'Name' },
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: { uk: 'Логотип', en: 'Logo' },
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      label: { uk: 'Тип партнерства', en: 'Partnership Type' },
      options: [
        { label: { uk: 'Стратегічний партнер', en: 'Strategic Partner' }, value: 'strategic' },
        { label: { uk: 'Спонсор', en: 'Sponsor' }, value: 'sponsor' },
        { label: { uk: 'Міжнародна організація', en: 'International Org' }, value: 'international' },
        { label: { uk: 'Державна установа', en: 'Government' }, value: 'government' },
        { label: { uk: 'Бізнес-партнер', en: 'Business Partner' }, value: 'business' },
      ],
    },
    {
      name: 'website',
      type: 'text',
      label: { uk: 'Вебсайт', en: 'Website' },
      admin: {
        description: 'URL вебсайту партнера',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: { uk: 'Опис', en: 'Description' },
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
