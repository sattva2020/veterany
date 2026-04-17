import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`media_locales\` (
  	\`alt\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`media_locales_locale_parent_id_unique\` ON \`media_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`activities_locales\` (
  	\`title\` text NOT NULL,
  	\`short_description\` text NOT NULL,
  	\`full_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`activities\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`activities_locales_locale_parent_id_unique\` ON \`activities_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`news_locales\` (
  	\`title\` text NOT NULL,
  	\`excerpt\` text NOT NULL,
  	\`content\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`news\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`news_locales_locale_parent_id_unique\` ON \`news_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`partners_locales\` (
  	\`name\` text NOT NULL,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`partners\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`partners_locales_locale_parent_id_unique\` ON \`partners_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`join_options_locales\` (
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`full_content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`join_options\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`join_options_locales_locale_parent_id_unique\` ON \`join_options_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_stats_locales\` (
  	\`label\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings_stats\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`site_settings_stats_locales_locale_parent_id_unique\` ON \`site_settings_stats_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_steps_order_idx\` ON \`site_settings_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_steps_parent_id_idx\` ON \`site_settings_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_steps_locales\` (
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings_steps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`site_settings_steps_locales_locale_parent_id_unique\` ON \`site_settings_steps_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`initials\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_testimonials_order_idx\` ON \`site_settings_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_testimonials_parent_id_idx\` ON \`site_settings_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_testimonials_locales\` (
  	\`text\` text NOT NULL,
  	\`name\` text NOT NULL,
  	\`role\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`site_settings_testimonials_locales_locale_parent_id_unique\` ON \`site_settings_testimonials_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_locales\` (
  	\`organization_name\` text DEFAULT 'ГО «Ветеран. Дорога до нового життя»' NOT NULL,
  	\`tagline\` text DEFAULT 'Підтримка. Відновлення. Нові можливості.',
  	\`description\` text,
  	\`hero_title\` text DEFAULT 'Ветеран. Дорога до нового життя',
  	\`hero_subtitle\` text DEFAULT 'Підтримка. Відновлення. Нові можливості.',
  	\`hero_description\` text,
  	\`cta_button_text\` text DEFAULT 'Потребую допомоги',
  	\`address\` text DEFAULT 'м. Київ, вул. Хрещатик, 1
  Офіс 301',
  	\`working_hours\` text DEFAULT 'Пн — Пт: 9:00 — 18:00
  Сб: 10:00 — 14:00',
  	\`about_text\` text,
  	\`legal_name\` text,
  	\`bank_details\` text,
  	\`how_we_work_title\` text DEFAULT 'Схема роботи',
  	\`how_we_work_subtitle\` text DEFAULT 'Від першого звернення до результату — простий та зрозумілий процес отримання допомоги.',
  	\`testimonials_title\` text DEFAULT 'Що кажуть наші підопічні',
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`site_settings_locales_locale_parent_id_unique\` ON \`site_settings_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`alt\`;`)
  await db.run(sql`ALTER TABLE \`activities\` DROP COLUMN \`title\`;`)
  await db.run(sql`ALTER TABLE \`activities\` DROP COLUMN \`short_description\`;`)
  await db.run(sql`ALTER TABLE \`activities\` DROP COLUMN \`full_description\`;`)
  await db.run(sql`ALTER TABLE \`news\` DROP COLUMN \`title\`;`)
  await db.run(sql`ALTER TABLE \`news\` DROP COLUMN \`excerpt\`;`)
  await db.run(sql`ALTER TABLE \`news\` DROP COLUMN \`content\`;`)
  await db.run(sql`ALTER TABLE \`partners\` DROP COLUMN \`name\`;`)
  await db.run(sql`ALTER TABLE \`partners\` DROP COLUMN \`description\`;`)
  await db.run(sql`ALTER TABLE \`join_options\` DROP COLUMN \`title\`;`)
  await db.run(sql`ALTER TABLE \`join_options\` DROP COLUMN \`description\`;`)
  await db.run(sql`ALTER TABLE \`join_options\` DROP COLUMN \`full_content\`;`)
  await db.run(sql`ALTER TABLE \`site_settings_stats\` DROP COLUMN \`label\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`organization_name\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`tagline\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`description\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`hero_title\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`hero_subtitle\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`hero_description\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`cta_button_text\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`address\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`working_hours\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`about_text\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`legal_name\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`bank_details\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`media_locales\`;`)
  await db.run(sql`DROP TABLE \`activities_locales\`;`)
  await db.run(sql`DROP TABLE \`news_locales\`;`)
  await db.run(sql`DROP TABLE \`partners_locales\`;`)
  await db.run(sql`DROP TABLE \`join_options_locales\`;`)
  await db.run(sql`DROP TABLE \`site_settings_stats_locales\`;`)
  await db.run(sql`DROP TABLE \`site_settings_steps\`;`)
  await db.run(sql`DROP TABLE \`site_settings_steps_locales\`;`)
  await db.run(sql`DROP TABLE \`site_settings_testimonials\`;`)
  await db.run(sql`DROP TABLE \`site_settings_testimonials_locales\`;`)
  await db.run(sql`DROP TABLE \`site_settings_locales\`;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`alt\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`activities\` ADD \`title\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`activities\` ADD \`short_description\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`activities\` ADD \`full_description\` text;`)
  await db.run(sql`ALTER TABLE \`news\` ADD \`title\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`news\` ADD \`excerpt\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`news\` ADD \`content\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`partners\` ADD \`name\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`partners\` ADD \`description\` text;`)
  await db.run(sql`ALTER TABLE \`join_options\` ADD \`title\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`join_options\` ADD \`description\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`join_options\` ADD \`full_content\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings_stats\` ADD \`label\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`organization_name\` text DEFAULT 'ГО «Ветеран. Дорога до нового життя»' NOT NULL;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`tagline\` text DEFAULT 'Підтримка. Відновлення. Нові можливості.';`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`description\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`hero_title\` text DEFAULT 'Ветеран. Дорога до нового життя';`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`hero_subtitle\` text DEFAULT 'Підтримка. Відновлення. Нові можливості.';`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`hero_description\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`cta_button_text\` text DEFAULT 'Потребую допомоги';`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`address\` text DEFAULT 'м. Київ, вул. Хрещатик, 1
  Офіс 301';`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`working_hours\` text DEFAULT 'Пн — Пт: 9:00 — 18:00
  Сб: 10:00 — 14:00';`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`about_text\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`legal_name\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`bank_details\` text;`)
}
