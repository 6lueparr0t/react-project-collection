class Animal<T> {
  static ONE: i32 = 1;
  static add(a: i32, b: i32): i32 {
    return a + b;
  }

  two: i16 = 2;
  sub<T>(a: T, b: T): T {
    return a - b;
  }
}

export function one(): i32 {
  return Animal.ONE;
}

export function add(a: i32, b: i32): i32 {
  return Animal.add(a, b);
}

export function two(): i32 {
  let animal = new Animal<i32>();
  return animal.two;
}

export function sub(a: f32, b: f32): f32 {
  let animal = new Animal<f32>();
  return animal.sub<f32>(a, b);
}

export function helloWorld(): string {
  return "Hello, World! Hello, AssemblyScript!";
}
