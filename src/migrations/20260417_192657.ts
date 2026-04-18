import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`role\` text DEFAULT 'editor',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric,
  	\`sizes_thumbnail_url\` text,
  	\`sizes_thumbnail_width\` numeric,
  	\`sizes_thumbnail_height\` numeric,
  	\`sizes_thumbnail_mime_type\` text,
  	\`sizes_thumbnail_filesize\` numeric,
  	\`sizes_thumbnail_filename\` text,
  	\`sizes_card_url\` text,
  	\`sizes_card_width\` numeric,
  	\`sizes_card_height\` numeric,
  	\`sizes_card_mime_type\` text,
  	\`sizes_card_filesize\` numeric,
  	\`sizes_card_filename\` text,
  	\`sizes_hero_url\` text,
  	\`sizes_hero_width\` numeric,
  	\`sizes_hero_height\` numeric,
  	\`sizes_hero_mime_type\` text,
  	\`sizes_hero_filesize\` numeric,
  	\`sizes_hero_filename\` text
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`media_sizes_thumbnail_sizes_thumbnail_filename_idx\` ON \`media\` (\`sizes_thumbnail_filename\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`media_sizes_card_sizes_card_filename_idx\` ON \`media\` (\`sizes_card_filename\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`media_sizes_hero_sizes_hero_filename_idx\` ON \`media\` (\`sizes_hero_filename\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`media_locales\` (
  	\`alt\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`media_locales_locale_parent_id_unique\` ON \`media_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`activities\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text,
  	\`icon\` text NOT NULL,
  	\`image_id\` integer,
  	\`is_featured\` integer DEFAULT false,
  	\`order\` numeric DEFAULT 0 NOT NULL,
  	\`is_active\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`activities_slug_idx\` ON \`activities\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`activities_image_idx\` ON \`activities\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`activities_updated_at_idx\` ON \`activities\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`activities_created_at_idx\` ON \`activities\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`activities_locales\` (
  	\`title\` text NOT NULL,
  	\`short_description\` text NOT NULL,
  	\`full_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`activities\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`activities_locales_locale_parent_id_unique\` ON \`activities_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`news\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text,
  	\`tag\` text NOT NULL,
  	\`featured_image_id\` integer,
  	\`publish_date\` text NOT NULL,
  	\`status\` text DEFAULT 'draft',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`featured_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`news_slug_idx\` ON \`news\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`news_featured_image_idx\` ON \`news\` (\`featured_image_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`news_updated_at_idx\` ON \`news\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`news_created_at_idx\` ON \`news\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`news_locales\` (
  	\`title\` text NOT NULL,
  	\`excerpt\` text NOT NULL,
  	\`content\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`news\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`news_locales_locale_parent_id_unique\` ON \`news_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`partners\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`logo_id\` integer NOT NULL,
  	\`type\` text,
  	\`website\` text,
  	\`order\` numeric DEFAULT 0,
  	\`is_active\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`partners_logo_idx\` ON \`partners\` (\`logo_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`partners_updated_at_idx\` ON \`partners\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`partners_created_at_idx\` ON \`partners\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`partners_locales\` (
  	\`name\` text NOT NULL,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`partners\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`partners_locales_locale_parent_id_unique\` ON \`partners_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`join_options\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icon\` text NOT NULL,
  	\`order\` numeric DEFAULT 0,
  	\`is_active\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`join_options_updated_at_idx\` ON \`join_options\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`join_options_created_at_idx\` ON \`join_options\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`join_options_locales\` (
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`full_content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`join_options\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`join_options_locales_locale_parent_id_unique\` ON \`join_options_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`contact_submissions\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`email\` text NOT NULL,
  	\`phone\` text,
  	\`subject\` text,
  	\`message\` text NOT NULL,
  	\`is_read\` integer DEFAULT false,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`contact_submissions_updated_at_idx\` ON \`contact_submissions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`contact_submissions_created_at_idx\` ON \`contact_submissions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`veteran_profiles_needs\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`veteran_profiles\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`veteran_profiles_needs_order_idx\` ON \`veteran_profiles_needs\` (\`order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`veteran_profiles_needs_parent_idx\` ON \`veteran_profiles_needs\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`veteran_profiles_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`veteran_profiles\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`veteran_profiles_sessions_order_idx\` ON \`veteran_profiles_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`veteran_profiles_sessions_parent_id_idx\` ON \`veteran_profiles_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`veteran_profiles\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`phone\` text,
  	\`status\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`veteran_profiles_updated_at_idx\` ON \`veteran_profiles\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`veteran_profiles_created_at_idx\` ON \`veteran_profiles\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`veteran_profiles_email_idx\` ON \`veteran_profiles\` (\`email\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`consultations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`email\` text NOT NULL,
  	\`phone\` text NOT NULL,
  	\`type\` text NOT NULL,
  	\`date\` text NOT NULL,
  	\`time\` text NOT NULL,
  	\`message\` text,
  	\`status\` text DEFAULT 'pending',
  	\`veteran_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`veteran_id\`) REFERENCES \`veteran_profiles\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`consultations_veteran_idx\` ON \`consultations\` (\`veteran_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`consultations_updated_at_idx\` ON \`consultations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`consultations_created_at_idx\` ON \`consultations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	\`activities_id\` integer,
  	\`news_id\` integer,
  	\`partners_id\` integer,
  	\`join_options_id\` integer,
  	\`contact_submissions_id\` integer,
  	\`veteran_profiles_id\` integer,
  	\`consultations_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`activities_id\`) REFERENCES \`activities\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`news_id\`) REFERENCES \`news\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`partners_id\`) REFERENCES \`partners\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`join_options_id\`) REFERENCES \`join_options\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`contact_submissions_id\`) REFERENCES \`contact_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`veteran_profiles_id\`) REFERENCES \`veteran_profiles\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`consultations_id\`) REFERENCES \`consultations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_activities_id_idx\` ON \`payload_locked_documents_rels\` (\`activities_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_news_id_idx\` ON \`payload_locked_documents_rels\` (\`news_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_partners_id_idx\` ON \`payload_locked_documents_rels\` (\`partners_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_join_options_id_idx\` ON \`payload_locked_documents_rels\` (\`join_options_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_contact_submissions_id_idx\` ON \`payload_locked_documents_rels\` (\`contact_submissions_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_veteran_profiles_id_idx\` ON \`payload_locked_documents_rels\` (\`veteran_profiles_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_consultations_id_idx\` ON \`payload_locked_documents_rels\` (\`consultations_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`veteran_profiles_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`veteran_profiles_id\`) REFERENCES \`veteran_profiles\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_preferences_rels_veteran_profiles_id_idx\` ON \`payload_preferences_rels\` (\`veteran_profiles_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`site_settings_phones\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`number\` text NOT NULL,
  	\`label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`site_settings_phones_order_idx\` ON \`site_settings_phones\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`site_settings_phones_parent_id_idx\` ON \`site_settings_phones\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`site_settings_social_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`platform\` text NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`site_settings_social_links_order_idx\` ON \`site_settings_social_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`site_settings_social_links_parent_id_idx\` ON \`site_settings_social_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`site_settings_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`number\` text,
  	\`label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`site_settings_stats_order_idx\` ON \`site_settings_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`site_settings_stats_parent_id_idx\` ON \`site_settings_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`site_settings_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`site_settings_steps_order_idx\` ON \`site_settings_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`site_settings_steps_parent_id_idx\` ON \`site_settings_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`site_settings_testimonials\` (
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
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`site_settings_testimonials_order_idx\` ON \`site_settings_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`site_settings_testimonials_parent_id_idx\` ON \`site_settings_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`site_settings\` (
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
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`site_settings_logo_idx\` ON \`site_settings\` (\`logo_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`site_settings_hero_background_idx\` ON \`site_settings\` (\`hero_background_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`site_settings_about_image_idx\` ON \`site_settings\` (\`about_image_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`site_settings_og_image_idx\` ON \`site_settings\` (\`og_image_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`site_settings_locales\` (
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
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`seo_keywords\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`site_settings_locales_locale_parent_id_unique\` ON \`site_settings_locales\` (\`_locale\`,\`_parent_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE IF EXISTS \`users_sessions\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`users\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`media\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`media_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`activities\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`activities_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`news\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`news_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`partners\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`partners_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`join_options\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`join_options_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`contact_submissions\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`veteran_profiles_needs\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`veteran_profiles_sessions\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`veteran_profiles\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`consultations\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`payload_kv\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`site_settings_phones\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`site_settings_social_links\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`site_settings_stats\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`site_settings_steps\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`site_settings_testimonials\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`site_settings\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`site_settings_locales\`;`)
}
