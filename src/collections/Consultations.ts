import type { CollectionConfig } from 'payload'

export const Consultations: CollectionConfig = {
  slug: 'consultations',
  labels: {
    singular: { uk: 'Консультація', en: 'Consultation' },
    plural: { uk: 'Консультації', en: 'Consultations' },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'date', 'time', 'status', 'createdAt'],
    description: 'Онлайн-записи на консультацію',
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: { uk: "Ім'я", en: 'Name' },
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      label: { uk: 'Email', en: 'Email' },
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      label: { uk: 'Телефон', en: 'Phone' },
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      label: { uk: 'Тип консультації', en: 'Consultation type' },
      required: true,
      options: [
        { label: { uk: 'Психологічна', en: 'Psychological' }, value: 'psychological' },
        { label: { uk: 'Юридична', en: 'Legal' }, value: 'legal' },
        { label: { uk: 'Реабілітаційна', en: 'Rehabilitation' }, value: 'rehabilitation' },
        { label: { uk: 'Працевлаштування', en: 'Employment' }, value: 'employment' },
        { label: { uk: 'Соціальна', en: 'Social' }, value: 'social' },
        { label: { uk: 'Інша', en: 'Other' }, value: 'other' },
      ],
    },
    {
      name: 'date',
      type: 'date',
      label: { uk: 'Дата', en: 'Date' },
      required: true,
      admin: {
        date: { pickerAppearance: 'dayOnly', displayFormat: 'dd.MM.yyyy' },
      },
    },
    {
      name: 'time',
      type: 'text',
      label: { uk: 'Час', en: 'Time' },
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
      label: { uk: 'Додатковий коментар', en: 'Additional comment' },
    },
    {
      name: 'status',
      type: 'select',
      label: { uk: 'Статус', en: 'Status' },
      defaultValue: 'pending',
      options: [
        { label: { uk: 'Очікує', en: 'Pending' }, value: 'pending' },
        { label: { uk: 'Підтверджено', en: 'Confirmed' }, value: 'confirmed' },
        { label: { uk: 'Скасовано', en: 'Cancelled' }, value: 'cancelled' },
        { label: { uk: 'Завершено', en: 'Completed' }, value: 'completed' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'veteran',
      type: 'relationship',
      label: { uk: 'Ветеран', en: 'Veteran' },
      relationTo: 'veteran-profiles' as any,
      admin: { position: 'sidebar' },
    },
  ],
}
