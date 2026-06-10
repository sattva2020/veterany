import type { CollectionConfig } from 'payload'
import type { Access, FieldAccess } from 'payload'

const hasAdminRole = (user: unknown): boolean =>
  Boolean(user && (user as { collection?: string }).collection === 'users' && (user as { role?: string }).role === 'admin')

const isAdmin: Access = ({ req }) => hasAdminRole(req.user)

const isAdminOrSelf: Access = ({ req }) => {
  if (!req.user || req.user.collection !== 'users') return false
  if (hasAdminRole(req.user)) return true
  return { id: { equals: req.user.id } }
}

const roleUpdateAccess: FieldAccess = ({ req }) => hasAdminRole(req.user)

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
  access: {
    // Редактор бачить і редагує лише себе; керування користувачами — тільки адмін.
    read: isAdminOrSelf,
    create: isAdmin,
    update: isAdminOrSelf,
    delete: isAdmin,
    // В адмінку заходять лише користувачі цієї колекції (не veteran-profiles).
    admin: ({ req }) => req.user?.collection === 'users',
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
      access: {
        // Лише адмін може змінювати ролі — захист від самопідвищення редактора.
        update: roleUpdateAccess,
      },
      options: [
        { label: { uk: 'Адміністратор', en: 'Admin' }, value: 'admin' },
        { label: { uk: 'Редактор', en: 'Editor' }, value: 'editor' },
      ],
    },
  ],
}
