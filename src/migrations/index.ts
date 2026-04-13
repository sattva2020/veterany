import * as migration_20260413_085142_initial from './20260413_085142_initial';

export const migrations = [
  {
    up: migration_20260413_085142_initial.up,
    down: migration_20260413_085142_initial.down,
    name: '20260413_085142_initial'
  },
];
