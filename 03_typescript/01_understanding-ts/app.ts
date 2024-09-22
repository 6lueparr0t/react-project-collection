function add(n1: number, n2: number) {
  // 이 코드는 런타임에 체크되지만, 우리는 컴파일 타임에 체크할 수 있다.
  // if (typeof n1 !== 'number' || typeof n2 !== 'number') {
  //  throw new Error('Incorrect input!');
  // }
  return +n1 + +n2;
}

const number1 = 5;
const number2 = 2.8;

const result = add(number1, number2);
console.log(result);
