import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`site_settings_hero_stories\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`chapter\` text,
  	\`title1\` text,
  	\`title2\` text,
  	\`body\` text,
  	\`photo_id\` integer,
  	\`name\` text,
  	\`meta\` text,
  	FOREIGN KEY (\`photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_hero_stories_order_idx\` ON \`site_settings_hero_stories\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_hero_stories_parent_id_idx\` ON \`site_settings_hero_stories\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_hero_stories_photo_idx\` ON \`site_settings_hero_stories\` (\`photo_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_steps_tags\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings_steps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_steps_tags_order_idx\` ON \`site_settings_steps_tags\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_steps_tags_parent_id_idx\` ON \`site_settings_steps_tags\` (\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`site_settings_steps\` ADD \`eyebrow\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings_steps\` ADD \`short\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings_steps\` ADD \`long\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings_steps\` ADD \`meta\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings_testimonials\` ADD \`date\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings_testimonials\` ADD \`quote\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings_testimonials\` ADD \`photo_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`site_settings_testimonials\` ADD \`has_audio\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`site_settings_testimonials\` ADD \`audio_duration\` text;`)
  await db.run(sql`CREATE INDEX \`site_settings_testimonials_photo_idx\` ON \`site_settings_testimonials\` (\`photo_id\`);`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`hero_portrait_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`site_settings_hero_portrait_idx\` ON \`site_settings\` (\`hero_portrait_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`site_settings_hero_stories\`;`)
  await db.run(sql`DROP TABLE \`site_settings_steps_tags\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_site_settings_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`name\` text,
  	\`role\` text,
  	\`initials\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_site_settings_testimonials\`("_order", "_parent_id", "id", "text", "name", "role", "initials") SELECT "_order", "_parent_id", "id", "text", "name", "role", "initials" FROM \`site_settings_testimonials\`;`)
  await db.run(sql`DROP TABLE \`site_settings_testimonials\`;`)
  await db.run(sql`ALTER TABLE \`__new_site_settings_testimonials\` RENAME TO \`site_settings_testimonials\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`site_settings_testimonials_order_idx\` ON \`site_settings_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_testimonials_parent_id_idx\` ON \`site_settings_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_site_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`logo_id\` integer,
  	\`hero_background_id\` integer,
  	\`cta_button_link\` text DEFAULT '#contacts',
  	\`progress_current\` numeric DEFAULT 500,
  	\`progress_goal\` numeric DEFAULT 1000,
  	\`progress_label_done\` text DEFAULT 'Допомогли ветеранам',
  	\`progress_label_goal\` text DEFAULT 'Мета',
  	\`email\` text DEFAULT 'info@veteran-road.org.ua',
  	\`google_maps_embed\` text,
  	\`about_image_id\` integer,
  	\`edrpou\` text,
  	\`og_image_id\` integer,
  	\`canonical_url\` text,
  	\`google_verification\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`hero_background_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`about_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_site_settings\`("id", "logo_id", "hero_background_id", "cta_button_link", "progress_current", "progress_goal", "progress_label_done", "progress_label_goal", "email", "google_maps_embed", "about_image_id", "edrpou", "og_image_id", "canonical_url", "google_verification", "updated_at", "created_at") SELECT "id", "logo_id", "hero_background_id", "cta_button_link", "progress_current", "progress_goal", "progress_label_done", "progress_label_goal", "email", "google_maps_embed", "about_image_id", "edrpou", "og_image_id", "canonical_url", "google_verification", "updated_at", "created_at" FROM \`site_settings\`;`)
  await db.run(sql`DROP TABLE \`site_settings\`;`)
  await db.run(sql`ALTER TABLE \`__new_site_settings\` RENAME TO \`site_settings\`;`)
  await db.run(sql`CREATE INDEX \`site_settings_logo_idx\` ON \`site_settings\` (\`logo_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_hero_background_idx\` ON \`site_settings\` (\`hero_background_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_about_image_idx\` ON \`site_settings\` (\`about_image_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_og_image_idx\` ON \`site_settings\` (\`og_image_id\`);`)
  await db.run(sql`ALTER TABLE \`site_settings_steps\` DROP COLUMN \`eyebrow\`;`)
  await db.run(sql`ALTER TABLE \`site_settings_steps\` DROP COLUMN \`short\`;`)
  await db.run(sql`ALTER TABLE \`site_settings_steps\` DROP COLUMN \`long\`;`)
  await db.run(sql`ALTER TABLE \`site_settings_steps\` DROP COLUMN \`meta\`;`)
}
