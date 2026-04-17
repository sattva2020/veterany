import * as migration_20260413_085142_initial from './20260413_085142_initial';
import * as migration_20260414_201501 from './20260414_201501';
import * as migration_20260417_143604 from './20260417_143604';
import * as migration_20260417_152221 from './20260417_152221';

export const migrations = [
  {
    up: migration_20260413_085142_initial.up,
    down: migration_20260413_085142_initial.down,
    name: '20260413_085142_initial',
  },
  {
    up: migration_20260414_201501.up,
    down: migration_20260414_201501.down,
    name: '20260414_201501',
  },
  {
    up: migration_20260417_143604.up,
    down: migration_20260417_143604.down,
    name: '20260417_143604',
  },
  {
    up: migration_20260417_152221.up,
    down: migration_20260417_152221.down,
    name: '20260417_152221'
  },
];
