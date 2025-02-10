interface Cube {
  width: number;
  height: number;
  depth: number;
}

function addLines(c: Cube) {
  let total: number = 0;

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
  // 타입스크립트는구조적 타입을 가지기 때문에, 구조만 맞으면 에러가 아님
  name: "SweetCube",
};

console.log(addLines(namedCube));
