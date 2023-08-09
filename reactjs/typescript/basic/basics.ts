// Primitives : number, string, boolean
// More complex types: arrays, objects
// Function types, parameters

// Primitives

let age: number = 24;

age = 12;

let userName: string | string[]; // Union Type

userName = "Daehyun";

let isInstructor: boolean;

isInstructor = true;

// More complex types

let hobbies: string[];

hobbies = ["Sports", "Cooking"];

// Type Aliases
type Person = {
  name: string;
  age: number;
};

// let person: any;
let person: Person;

person = {
  name: userName,
  age: 32,
};

// person = {
//   isEmployee: true
// };

let people: Person[];

// Type inference (타입 추론)

// 타입 추론을 쓰기 때문에 굳이 string 을 선언해 줄 필요는 없다.
// let course: string = 'React - The Complete Guide';
// let course = 'React - The Complete Guide';

// Error
// course = 12341;

// Union Type
let course: string | number = "React - The Complete Guide";

// Pass
course = 12341;

// Functions & types
function add(a: number, b: number) {
  return a + b;
}

function printOutput(value: any) {
  console.log(value);
}

// Generics
function insertAtBeginning<T>(array: T[], value: T) {
  const newArray = [value, ...array];
  return newArray;
}

const demoArray = [1, 2, 3];

const updatedArray = insertAtBeginning(demoArray, -1); // [-1, 1, 2, 3]
const stringArray = insertAtBeginning(['a', 'b', 'c'], 'd'); // ['a', 'b', 'c', 'd']

// Error
// updatedArray[0].split('');

// Pass
stringArray[0].split('');

// Same
let numbers1: Array<number> = [1,2,3,4];
let numbers2: number[] = [1,2,3,4];
