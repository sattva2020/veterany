import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Додає локалізовані поля заголовків секцій (вкладка «Заголовки секцій» у SiteSettings).
// Усі поля localized → колонки у таблиці site_settings_locales (varchar, nullable).
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "site_settings_locales" ADD COLUMN IF NOT EXISTS "about_section_label" varchar;
    ALTER TABLE "site_settings_locales" ADD COLUMN IF NOT EXISTS "about_section_title" varchar;
    ALTER TABLE "site_settings_locales" ADD COLUMN IF NOT EXISTS "activities_section_label" varchar;
    ALTER TABLE "site_settings_locales" ADD COLUMN IF NOT EXISTS "activities_section_title" varchar;
    ALTER TABLE "site_settings_locales" ADD COLUMN IF NOT EXISTS "activities_section_desc" varchar;
    ALTER TABLE "site_settings_locales" ADD COLUMN IF NOT EXISTS "news_section_label" varchar;
    ALTER TABLE "site_settings_locales" ADD COLUMN IF NOT EXISTS "news_section_title" varchar;
    ALTER TABLE "site_settings_locales" ADD COLUMN IF NOT EXISTS "partners_section_label" varchar;
    ALTER TABLE "site_settings_locales" ADD COLUMN IF NOT EXISTS "partners_section_title" varchar;
    ALTER TABLE "site_settings_locales" ADD COLUMN IF NOT EXISTS "partners_section_desc" varchar;
    ALTER TABLE "site_settings_locales" ADD COLUMN IF NOT EXISTS "join_section_label" varchar;
    ALTER TABLE "site_settings_locales" ADD COLUMN IF NOT EXISTS "join_section_title" varchar;
    ALTER TABLE "site_settings_locales" ADD COLUMN IF NOT EXISTS "join_section_desc" varchar;
    ALTER TABLE "site_settings_locales" ADD COLUMN IF NOT EXISTS "contacts_section_label" varchar;
    ALTER TABLE "site_settings_locales" ADD COLUMN IF NOT EXISTS "contacts_section_title" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "site_settings_locales" DROP COLUMN IF EXISTS "about_section_label";
    ALTER TABLE "site_settings_locales" DROP COLUMN IF EXISTS "about_section_title";
    ALTER TABLE "site_settings_locales" DROP COLUMN IF EXISTS "activities_section_label";
    ALTER TABLE "site_settings_locales" DROP COLUMN IF EXISTS "activities_section_title";
    ALTER TABLE "site_settings_locales" DROP COLUMN IF EXISTS "activities_section_desc";
    ALTER TABLE "site_settings_locales" DROP COLUMN IF EXISTS "news_section_label";
    ALTER TABLE "site_settings_locales" DROP COLUMN IF EXISTS "news_section_title";
    ALTER TABLE "site_settings_locales" DROP COLUMN IF EXISTS "partners_section_label";
    ALTER TABLE "site_settings_locales" DROP COLUMN IF EXISTS "partners_section_title";
    ALTER TABLE "site_settings_locales" DROP COLUMN IF EXISTS "partners_section_desc";
    ALTER TABLE "site_settings_locales" DROP COLUMN IF EXISTS "join_section_label";
    ALTER TABLE "site_settings_locales" DROP COLUMN IF EXISTS "join_section_title";
    ALTER TABLE "site_settings_locales" DROP COLUMN IF EXISTS "join_section_desc";
    ALTER TABLE "site_settings_locales" DROP COLUMN IF EXISTS "contacts_section_label";
    ALTER TABLE "site_settings_locales" DROP COLUMN IF EXISTS "contacts_section_title";
  `)
}
