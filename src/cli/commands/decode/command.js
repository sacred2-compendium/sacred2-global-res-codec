import { Command, Option } from 'commander';
import action from './action.js';

const inputOption = new Option('--input <file>', 'Input global.res file to decode')
  .makeOptionMandatory();

const hashesOutputOtion = new Option('--hashes-output <file>', 'Output file for list of hashes')
  .makeOptionMandatory();

const hashesFormatOption = new Option('--hashes-format <format>', 'Format of hashes file')
  .choices(['json'])
  .default('json');

const outputPairsOption = new Option('--pairs-output <file>', 'Output file for hash-text pairs')
  .makeOptionMandatory();

const pairsFormatOption = new Option('--pairs-format <format>', 'Format of hash-text pairs')
  .choices(['json'])
  .default('json');

const jsonIndentOption = new Option('--json-indent <n>', 'Number of spaces for JSON outputs')
  .default('0')

export default new Command('decode')
  .description('Decode a global.res file into hashes and hash-text pairs')
  .addOption(inputOption)
  .addOption(hashesOutputOtion)
  .addOption(outputPairsOption)
  .addOption(hashesFormatOption)
  .addOption(pairsFormatOption)
  .addOption(jsonIndentOption)
  .action(action);
