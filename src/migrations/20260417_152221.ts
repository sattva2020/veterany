import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`og_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`canonical_url\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`google_verification\` text;`)
  await db.run(sql`CREATE INDEX \`site_settings_og_image_idx\` ON \`site_settings\` (\`og_image_id\`);`)
  await db.run(sql`ALTER TABLE \`site_settings_locales\` ADD \`seo_title\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings_locales\` ADD \`seo_description\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings_locales\` ADD \`seo_keywords\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_site_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`logo_id\` integer,
  	\`hero_background_id\` integer,
  	\`cta_button_link\` text DEFAULT '#contacts',
  	\`email\` text DEFAULT 'info@veteran-road.org.ua',
  	\`google_maps_embed\` text,
  	\`about_image_id\` integer,
  	\`edrpou\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`hero_background_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`about_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_site_settings\`("id", "logo_id", "hero_background_id", "cta_button_link", "email", "google_maps_embed", "about_image_id", "edrpou", "updated_at", "created_at") SELECT "id", "logo_id", "hero_background_id", "cta_button_link", "email", "google_maps_embed", "about_image_id", "edrpou", "updated_at", "created_at" FROM \`site_settings\`;`)
  await db.run(sql`DROP TABLE \`site_settings\`;`)
  await db.run(sql`ALTER TABLE \`__new_site_settings\` RENAME TO \`site_settings\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`site_settings_logo_idx\` ON \`site_settings\` (\`logo_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_hero_background_idx\` ON \`site_settings\` (\`hero_background_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_about_image_idx\` ON \`site_settings\` (\`about_image_id\`);`)
  await db.run(sql`ALTER TABLE \`site_settings_locales\` DROP COLUMN \`seo_title\`;`)
  await db.run(sql`ALTER TABLE \`site_settings_locales\` DROP COLUMN \`seo_description\`;`)
  await db.run(sql`ALTER TABLE \`site_settings_locales\` DROP COLUMN \`seo_keywords\`;`)
}
