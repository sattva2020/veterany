import type { CollectionConfig } from 'payload'

export const VeteranProfiles: CollectionConfig = {
  slug: 'veteran-profiles',
  labels: {
    singular: { uk: 'Ветеран', en: 'Veteran' },
    plural: { uk: 'Ветерани', en: 'Veterans' },
  },
  auth: {
    tokenExpiration: 604800, // 7 days
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'phone', 'createdAt'],
    description: 'Акаунти ветеранів для особистого кабінету',
  },
  access: {
    // Команда бачить усі профілі, ветеран — лише власний. Анонімам читання заборонено.
    read: ({ req }) => {
      if (!req.user) return false
      if (req.user.collection === 'users') return true
      return { id: { equals: req.user.id } }
    },
    // Самостійна реєстрація в кабінеті залишається відкритою.
    create: () => true,
    update: ({ req }) => {
      if (!req.user) return false
      if (req.user.collection === 'users') return true
      return { id: { equals: req.user.id } }
    },
    delete: ({ req }) => req.user?.collection === 'users',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: { uk: "Повне ім'я", en: 'Full Name' },
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      label: { uk: 'Телефон', en: 'Phone' },
    },
    {
      name: 'status',
      type: 'select',
      label: { uk: 'Статус', en: 'Status' },
      options: [
        { label: { uk: 'Учасник бойових дій', en: 'Combat veteran' }, value: 'combat' },
        { label: { uk: 'Ветеран служби', en: 'Service veteran' }, value: 'service' },
        { label: { uk: 'Родина ветерана', en: 'Veteran family' }, value: 'family' },
        { label: { uk: 'Інше', en: 'Other' }, value: 'other' },
      ],
    },
    {
      name: 'needs',
      type: 'select',
      label: { uk: 'Потреби', en: 'Needs' },
      hasMany: true,
      options: [
        { label: { uk: 'Психологічна підтримка', en: 'Psychological support' }, value: 'psychological' },
        { label: { uk: 'Реабілітація', en: 'Rehabilitation' }, value: 'rehabilitation' },
        { label: { uk: 'Юридична допомога', en: 'Legal aid' }, value: 'legal' },
        { label: { uk: 'Працевлаштування', en: 'Employment' }, value: 'employment' },
        { label: { uk: 'Доступне житло', en: 'Housing' }, value: 'housing' },
        { label: { uk: 'Допомога родині', en: 'Family support' }, value: 'family' },
        { label: { uk: 'Навчання', en: 'Education' }, value: 'education' },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
      label: { uk: 'Додаткова інформація', en: 'Additional info' },
    },
  ],
}
