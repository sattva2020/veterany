import * as migration_20260427_180211 from './20260427_180211';
import * as migration_20260629_140000 from './20260629_140000';
import * as migration_20260706_112024 from './20260706_112024';

export const migrations = [
  {
    up: migration_20260427_180211.up,
    down: migration_20260427_180211.down,
    name: '20260427_180211'
  },
  {
    up: migration_20260629_140000.up,
    down: migration_20260629_140000.down,
    name: '20260629_140000'
  },
  {
    up: migration_20260706_112024.up,
    down: migration_20260706_112024.down,
    name: '20260706_112024'
  },
];
