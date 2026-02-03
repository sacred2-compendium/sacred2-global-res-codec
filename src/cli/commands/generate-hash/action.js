import generateHash from '../../../core/utility/generate-hash.js';

export default function (lokaId) {
  const hash = generateHash(lokaId);

  console.log(hash);
}
