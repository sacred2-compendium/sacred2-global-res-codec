function binarySearch (array, targetValue) {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const middle = left + ((right - left) >>> 1);

    const currentValue = array[middle].hash;
    if (currentValue < targetValue) {
      left = middle + 1;
    } else if (currentValue > targetValue) {
      right = middle - 1;
    } else {
      return array[middle];
    }
  }

  return null;
}

export default function (entries, hashedLokaId) {
  return binarySearch(entries, hashedLokaId);
}
