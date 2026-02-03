import createPriorityQueue from './create-priority-queue.js';

export default function (frequencyMap) {
  const leafNodes = Object.entries(frequencyMap).map(([character, frequency]) => {
    return {
      character,
      frequency,
      leftNode: null,
      rightNode: null,
    };
  });

  if (leafNodes.length === 0) return null;

  if (leafNodes.length === 1) {
    // Add a dummy node. Otherwise things down the line will break.
    leafNodes.push({
      character: leafNodes[0].character,
      frequency: 0,
      leftNode: null,
      rightNode: null,
    });
  }

  const priorityQueue = createPriorityQueue(leafNodes);

  while (priorityQueue.hasAtLeastTwoElements()) {
    const leftNode = priorityQueue.shift();
    const rightNode = priorityQueue.shift();
    priorityQueue.insert({
      character: null,
      frequency: leftNode.frequency + rightNode.frequency,
      leftNode,
      rightNode,
    });
  }

  return priorityQueue.getRootNode();
}
