import { Command, Option } from 'commander';
import action from './action.js';

const hashesInputOption = new Option('--hashes-input <file>', 'Input hashes file to encode')
  .makeOptionMandatory();

const hashesFormatOption = new Option('--hashes-format <format>', 'Format of hashes file')
  .choices(['json'])
  .default('json');

const pairsInputOption = new Option('--pairs-input <file>', 'Input hash-text pairs to encode')
  .makeOptionMandatory();

const pairsFormatOption = new Option('--pairs-format <format>', 'Format of hash-text pairs')
  .choices(['json'])
  .default('json');

const outputOption = new Option('--output <file>', 'Output file (global.res)')
  .makeOptionMandatory();

export default new Command('encode')
  .description('Encode hashes and hash-text pairs into a new global.res')
  .addOption(hashesInputOption)
  .addOption(pairsInputOption)
  .addOption(outputOption)
  .addOption(hashesFormatOption)
  .addOption(pairsFormatOption)
  .action(action);
