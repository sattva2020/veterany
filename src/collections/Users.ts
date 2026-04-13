import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: { uk: 'Користувач', en: 'User' },
    plural: { uk: 'Користувачі', en: 'Users' },
  },
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: { uk: "Ім'я", en: 'Name' },
    },
    {
      name: 'role',
      type: 'select',
      label: { uk: 'Роль', en: 'Role' },
      defaultValue: 'editor',
      options: [
        { label: { uk: 'Адміністратор', en: 'Admin' }, value: 'admin' },
        { label: { uk: 'Редактор', en: 'Editor' }, value: 'editor' },
      ],
    },
  ],
}
