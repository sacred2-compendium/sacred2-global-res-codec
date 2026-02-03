# sacred2-global-res-codec

Sacred 2 global.res encoder/decoder library + CLI.

## Project Setup

1. Install (or switch to) node v24

2. Install dependencies

    > npm install

## CLI Documentation

### Generate a hash from a given Loka ID

> npx s2-global-res generate-hash BLUEPRINT_1234

Outputs `1242901982`.

### Decode a global.res file into hashes and hash-text pairs

> npx s2-global-res decode --input global.res --hashes-output hashes.json --pairs-output pairs.json --json-indent 2

### Encode hashes and hash-text pairs into a new global.res

> npx s2-global-res encode --hashes-input hashes.json --pairs-input pairs.json --output modified-global.res
