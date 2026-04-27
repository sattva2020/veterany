import * as migration_20260427_180211 from './20260427_180211';

export const migrations = [
  {
    up: migration_20260427_180211.up,
    down: migration_20260427_180211.down,
    name: '20260427_180211'
  },
];
