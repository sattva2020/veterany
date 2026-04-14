import * as migration_20260413_085142_initial from './20260413_085142_initial';
import * as migration_20260414_201501 from './20260414_201501';

export const migrations = [
  {
    up: migration_20260413_085142_initial.up,
    down: migration_20260413_085142_initial.down,
    name: '20260413_085142_initial',
  },
  {
    up: migration_20260414_201501.up,
    down: migration_20260414_201501.down,
    name: '20260414_201501'
  },
];
