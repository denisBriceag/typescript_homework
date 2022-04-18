// EX 2 ------------------------------------------------
/*
1. Create an interface Id that has property id of type number
2. Create an interface Name that has property name of type string
3. Create a new type IdOrName and pass in a generic type
* If passed in type extends Id, IdOrName - will be of type number
* Else If passed in type extends Name, IdOrName - will be of type string
* Else passed in type extends Anything Else, IdOrName - will be of type {age: boolean}
 */

interface Id {
  id: number;
}

interface Name {
  name: string;
}

type IdOrName<T> = T extends Id
  ? number
  : T extends Name
  ? string
  : { age: boolean };

//Example

let idTest: Id = {
  id: 22,
};

let nameTest: Name = {
  name: "Denis",
};

let other = {
  try: "this",
};

function test<T>(idOrName: T): IdOrName<T> {
  throw "unimplemented";
}

let a1 = test({}); // Expected type of a: {age:boolean}
let b = test(nameTest); // Expected type of b: string
let c = test(idTest); // Expected type of c: number
