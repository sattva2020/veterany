import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_site_settings_hero_stories\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`chapter\` text,
  	\`title1\` text,
  	\`title2\` text,
  	\`body\` text,
  	\`name\` text,
  	\`meta\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_site_settings_hero_stories\`("_order", "_parent_id", "id", "chapter", "title1", "title2", "body", "name", "meta") SELECT "_order", "_parent_id", "id", "chapter", "title1", "title2", "body", "name", "meta" FROM \`site_settings_hero_stories\`;`)
  await db.run(sql`DROP TABLE \`site_settings_hero_stories\`;`)
  await db.run(sql`ALTER TABLE \`__new_site_settings_hero_stories\` RENAME TO \`site_settings_hero_stories\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`site_settings_hero_stories_order_idx\` ON \`site_settings_hero_stories\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_hero_stories_parent_id_idx\` ON \`site_settings_hero_stories\` (\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`hero_story1_photo_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`hero_story2_photo_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`hero_story3_photo_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`hero_story4_photo_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`site_settings_hero_story1_photo_idx\` ON \`site_settings\` (\`hero_story1_photo_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_hero_story2_photo_idx\` ON \`site_settings\` (\`hero_story2_photo_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_hero_story3_photo_idx\` ON \`site_settings\` (\`hero_story3_photo_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_hero_story4_photo_idx\` ON \`site_settings\` (\`hero_story4_photo_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_site_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`logo_id\` integer,
  	\`hero_background_id\` integer,
  	\`hero_portrait_id\` integer,
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
  	FOREIGN KEY (\`hero_portrait_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`about_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_site_settings\`("id", "logo_id", "hero_background_id", "hero_portrait_id", "cta_button_link", "progress_current", "progress_goal", "progress_label_done", "progress_label_goal", "email", "google_maps_embed", "about_image_id", "edrpou", "og_image_id", "canonical_url", "google_verification", "updated_at", "created_at") SELECT "id", "logo_id", "hero_background_id", "hero_portrait_id", "cta_button_link", "progress_current", "progress_goal", "progress_label_done", "progress_label_goal", "email", "google_maps_embed", "about_image_id", "edrpou", "og_image_id", "canonical_url", "google_verification", "updated_at", "created_at" FROM \`site_settings\`;`)
  await db.run(sql`DROP TABLE \`site_settings\`;`)
  await db.run(sql`ALTER TABLE \`__new_site_settings\` RENAME TO \`site_settings\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`site_settings_logo_idx\` ON \`site_settings\` (\`logo_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_hero_background_idx\` ON \`site_settings\` (\`hero_background_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_hero_portrait_idx\` ON \`site_settings\` (\`hero_portrait_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_about_image_idx\` ON \`site_settings\` (\`about_image_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_og_image_idx\` ON \`site_settings\` (\`og_image_id\`);`)
  await db.run(sql`ALTER TABLE \`site_settings_hero_stories\` ADD \`photo_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`site_settings_hero_stories_photo_idx\` ON \`site_settings_hero_stories\` (\`photo_id\`);`)
}
