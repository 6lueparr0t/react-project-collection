interface Cube {
  width: number;
  height: number;
  depth: number;
}

function addLines(c: Cube) {
  let total = 0;

  for (const axis of Object.keys(c)) {
    const length = c[axis];

    total += length;
  }

  return total;
}

const namedCube = {
  width: 6,
  height: 5,
  depth: 4,
  name: "SweetCube",
};

console.log(addLines(namedCube));
