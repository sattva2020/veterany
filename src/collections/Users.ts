import type { CollectionConfig } from 'payload'
import type { Access, FieldAccess } from 'payload'
import { sendSecurityAlert } from '../lib/notify'

// Джерело IP запиту (Caddy проксіює → X-Forwarded-For).
const reqIp = (req: any): string =>
  req?.headers?.get?.('x-forwarded-for') || req?.headers?.get?.('x-real-ip') || ''

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
  hooks: {
    // Сповіщення безпеки: зміна пароля, створення користувача, вхід в адмінку.
    afterChange: [
      async ({ operation, doc, req }) => {
        const when = new Date().toISOString()
        if (operation === 'create') {
          await sendSecurityAlert({
            subject: 'Створено нового користувача',
            lines: { Email: doc.email, Роль: doc.role || '', Хто: req?.user?.email || '—', IP: reqIp(req), Коли: when },
          })
          return
        }
        // Пароль змінюють, якщо у payload запиту прийшло поле password.
        if (operation === 'update' && (req?.data as any)?.password) {
          await sendSecurityAlert({
            subject: 'Змінено пароль користувача',
            lines: { Акаунт: doc.email, Хто: req?.user?.email || '—', IP: reqIp(req), Коли: when },
          })
        }
      },
    ],
    afterLogin: [
      async ({ user, req }) => {
        await sendSecurityAlert({
          subject: 'Вхід в адмін-панель',
          lines: { Акаунт: user.email, IP: reqIp(req), Коли: new Date().toISOString() },
        })
      },
    ],
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
