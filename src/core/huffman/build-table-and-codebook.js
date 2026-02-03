function copyAndPush (array, element) {
  const last = array.length;
  const copy = new Uint8Array(last + 1);
  copy.set(array);
  copy[last] = element;
  return copy;
}

function processNonLeafNode (table, stack, node, code) {
  const entry = {
    indexOfLeftNode: null,
    indexOfRightNode: null,
    character: '\0',
  };
  table.push(entry);

  stack.push({
    node: node.rightNode,
    code: copyAndPush(code, 1),
    parent: entry,
    direction: 'indexOfRightNode',
  });
  stack.push({
    node: node.leftNode,
    code: copyAndPush(code, 0),
    parent: entry,
    direction: 'indexOfLeftNode',
  });
}

function processLeafNode (table, codebook, node, code) {
  table.push({
    indexOfLeftNode: 0,
    indexOfRightNode: 0,
    character: node.character,
  });

  codebook[node.character] = code;
}

export default function (rootNode) {
  const table = [];
  const codebook = Object.create(null);

  if (rootNode === null) {
    return {
      table,
      codebook,
    };
  }

  const stack = [];

  // Special case for root node
  if (rootNode.character === null) {
    const code = new Uint8Array(0);

    processNonLeafNode(table, stack, rootNode, code);
  } else {
    const code = new Uint8Array(1);
    code[0] = 1;

    processLeafNode(table, codebook, rootNode, code);
  }

  // Process remaining nodes
  while (stack.length) {
    const { node, code, parent, direction } = stack.pop();

    parent[direction] = table.length;

    if (node.character === null) {
      processNonLeafNode(table, stack, node, code);
    } else {
      processLeafNode(table, codebook, node, code);
    }
  }

  return {
    table,
    codebook,
  };
}
