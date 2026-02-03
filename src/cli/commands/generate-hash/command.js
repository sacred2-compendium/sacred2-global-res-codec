import { Command, Argument } from 'commander';
import action from './action.js';

const lokaIdArgument = new Argument('<loka-id>', 'Loka ID to hash. Must be an ASCII string.');

export default new Command('generate-hash')
  .description('Generate a hash from a given Loka ID')
  .addArgument(lokaIdArgument)
  .action(action);
