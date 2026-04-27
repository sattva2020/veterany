import * as migration_20260417_192657 from './20260417_192657';
import * as migration_20260427_161733 from './20260427_161733';
import * as migration_20260427_171149 from './20260427_171149';

export const migrations = [
  {
    up: migration_20260417_192657.up,
    down: migration_20260417_192657.down,
    name: '20260417_192657',
  },
  {
    up: migration_20260427_161733.up,
    down: migration_20260427_161733.down,
    name: '20260427_161733',
  },
  {
    up: migration_20260427_171149.up,
    down: migration_20260427_171149.down,
    name: '20260427_171149'
  },
];
