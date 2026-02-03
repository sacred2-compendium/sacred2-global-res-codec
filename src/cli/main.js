import { Command } from 'commander';
import decodeCommand from './commands/decode/command.js';
import encodeCommand from './commands/encode/command.js';
import generateHashCommand from './commands/generate-hash/command.js';

const program = new Command('s2-global-res')
  .description('CLI for encoding and decoding Sacred 2 global.res files')
  .version('0.0.0')
  .addCommand(decodeCommand)
  .addCommand(encodeCommand)
  .addCommand(generateHashCommand);

await program.parseAsync(process.argv);
