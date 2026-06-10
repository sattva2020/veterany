// Регрессионные тесты access-правил Payload-коллекций.
// Багфикс 2026-06-10: анонимное чтение PII и самоповышение роли редактора.
// Access-функции — чистые, тестируем их напрямую с мок-объектами req.
import { describe, it, expect } from 'vitest'
import { ContactSubmissions } from '@/collections/ContactSubmissions'
import { Consultations } from '@/collections/Consultations'
import { VeteranProfiles } from '@/collections/VeteranProfiles'
import { Users } from '@/collections/Users'

type AnyAccess = (args: { req: { user: unknown } }) => unknown

const access = (fn: unknown, user: unknown) => (fn as AnyAccess)({ req: { user } })

const anon = null
const adminUser = { id: 1, collection: 'users', role: 'admin' }
const editorUser = { id: 2, collection: 'users', role: 'editor' }
const veteran = { id: 10, collection: 'veteran-profiles' }

describe('ContactSubmissions access', () => {
  it('запрещает анонимное чтение PII', () => {
    expect(access(ContactSubmissions.access?.read, anon)).toBe(false)
  })

  it('запрещает чтение ветеранам (чужие обращения)', () => {
    expect(access(ContactSubmissions.access?.read, veteran)).toBe(false)
  })

  it('разрешает чтение команде в адмінці', () => {
    expect(access(ContactSubmissions.access?.read, adminUser)).toBe(true)
    expect(access(ContactSubmissions.access?.read, editorUser)).toBe(true)
  })

  it('оставляет анонимную отправку формы открытой', () => {
    expect(access(ContactSubmissions.access?.create, anon)).toBe(true)
  })
})

describe('Consultations access', () => {
  it('запрещает анонимное чтение', () => {
    expect(access(Consultations.access?.read, anon)).toBe(false)
  })

  it('ветеран видит только свои записи (query constraint)', () => {
    expect(access(Consultations.access?.read, veteran)).toEqual({
      veteran: { equals: veteran.id },
    })
  })

  it('команда видит всё', () => {
    expect(access(Consultations.access?.read, adminUser)).toBe(true)
  })

  it('анонимная запись на консультацию открыта', () => {
    expect(access(Consultations.access?.create, anon)).toBe(true)
  })

  it('анониму запрещены update/delete', () => {
    expect(access(Consultations.access?.update, anon)).toBeFalsy()
    expect(access(Consultations.access?.delete, anon)).toBeFalsy()
  })
})

describe('VeteranProfiles access', () => {
  it('запрещает анонимное чтение профилей', () => {
    expect(access(VeteranProfiles.access?.read, anon)).toBe(false)
  })

  it('ветеран читает и обновляет только свой профиль', () => {
    expect(access(VeteranProfiles.access?.read, veteran)).toEqual({
      id: { equals: veteran.id },
    })
    expect(access(VeteranProfiles.access?.update, veteran)).toEqual({
      id: { equals: veteran.id },
    })
  })

  it('самостоятельная регистрация остаётся открытой', () => {
    expect(access(VeteranProfiles.access?.create, anon)).toBe(true)
  })

  it('удаление — только команда', () => {
    expect(access(VeteranProfiles.access?.delete, anon)).toBeFalsy()
    expect(access(VeteranProfiles.access?.delete, veteran)).toBeFalsy()
    expect(access(VeteranProfiles.access?.delete, adminUser)).toBe(true)
  })
})

describe('Users access (защита от эскалации привилегий)', () => {
  it('анониму закрыто всё', () => {
    expect(access(Users.access?.read, anon)).toBeFalsy()
    expect(access(Users.access?.create, anon)).toBeFalsy()
    expect(access(Users.access?.update, anon)).toBeFalsy()
    expect(access(Users.access?.delete, anon)).toBeFalsy()
  })

  it('редактор видит/обновляет только себя', () => {
    expect(access(Users.access?.read, editorUser)).toEqual({
      id: { equals: editorUser.id },
    })
    expect(access(Users.access?.update, editorUser)).toEqual({
      id: { equals: editorUser.id },
    })
  })

  it('создание и удаление пользователей — только админ', () => {
    expect(access(Users.access?.create, editorUser)).toBe(false)
    expect(access(Users.access?.delete, editorUser)).toBe(false)
    expect(access(Users.access?.create, adminUser)).toBe(true)
    expect(access(Users.access?.delete, adminUser)).toBe(true)
  })

  it('поле role может менять только админ (не редактор, не ветеран)', () => {
    const roleField = Users.fields.find(
      (f) => 'name' in f && f.name === 'role',
    ) as { access?: { update?: unknown } }
    expect(access(roleField.access?.update, editorUser)).toBe(false)
    expect(access(roleField.access?.update, veteran)).toBe(false)
    expect(access(roleField.access?.update, adminUser)).toBe(true)
  })

  it('ветеран (auth-коллекция кабинета) не получает доступ к users', () => {
    expect(access(Users.access?.read, veteran)).toBeFalsy()
    expect(access(Users.access?.update, veteran)).toBeFalsy()
  })
})
