function compareFn (a, b) {
  if (a.frequency < b.frequency) {
    return -1;
  } else if (a.frequency > b.frequency) {
    return 1;
  } else {
    return a.character.codePointAt(0) - b.character.codePointAt(0);
  }
}

function binarySearchLeftmost (array, targetValue) {
  let left = 0;
  let right = array.length;

  while (left < right) {
    const middle = left + ((right - left) >>> 1);
    if (array[middle].frequency < targetValue) {
      left = middle + 1;
    } else {
      right = middle;
    }
  }

  return left;
}

export default function (initialElements) {
  const queue = initialElements;// Destructive!
  queue.sort(compareFn);

  return {
    hasAtLeastTwoElements: function () {
      return queue.length > 1;
    },
    shift: function () {
      return queue.shift();// TODO Shift is slow
    },
    insert: function (element) {
      const index = binarySearchLeftmost(queue, element.frequency);
      queue.splice(index, 0, element);
    },
    getRootNode: function () {
      return queue[0];
    },
  };
}
