import type { CollectionConfig } from 'payload'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  labels: {
    singular: { uk: 'Звернення', en: 'Contact Submission' },
    plural: { uk: 'Звернення', en: 'Contact Submissions' },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'subject', 'isRead', 'createdAt'],
    description: 'Заявки з форми зворотного звʼязку',
  },
  access: {
    // PII (імена, email, телефони, нотатки) — читання лише для команди в адмінці.
    read: ({ req }) => req.user?.collection === 'users',
    create: () => true,
    update: ({ req }) => req.user?.collection === 'users',
    delete: ({ req }) => req.user?.collection === 'users',
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
    },
    {
      name: 'subject',
      type: 'text',
      label: { uk: 'Тема', en: 'Subject' },
    },
    {
      name: 'message',
      type: 'textarea',
      label: { uk: 'Повідомлення', en: 'Message' },
      required: true,
    },
    {
      name: 'isRead',
      type: 'checkbox',
      label: { uk: 'Прочитано', en: 'Read' },
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: { uk: 'Нотатки', en: 'Notes' },
      admin: {
        description: 'Внутрішні нотатки для команди',
        position: 'sidebar',
      },
    },
  ],
}
