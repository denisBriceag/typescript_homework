// Write a class decorator, method decorator and parameter decorator functions for any Class the logic inside each decorator is up to you

function ClassDecorator(constructor: Function) {
  //Here as a parameter we receive a class constructor to which this decorator will be applied
  constructor.prototype.walk = function () {
    console.log("can walk");
  };
  constructor.prototype.breath = function () {
    console.log("can breathe");
  };
}

function ChangeAge(age: number): PropertyDecorator {
  return function (target, key): void {
    Reflect.deleteProperty(target, key);
    Reflect.defineProperty(target, key, {
      get: () => age,
      set: (newVal) => {
        return newVal;
      },
      enumerable: true,
      configurable: true,
    });
  };
}

function MethodDecorator(
  target: any,
  propertyName: string,
  propertyDescriptor: PropertyDescriptor
) {
  target?.age < 18
    ? console.log("Go to school")
    : console.log("Take your beer");
}

function ParameterDecorator(target: Function, key: string, index: number) {
  key === "logYourInfo"
    ? console.log("this is my favourite method")
    : console.log("index: " + index);

  console.log("the method you are using now is " + key);
}

@ClassDecorator
class Person {
  name: string = "Denis";

  @ChangeAge(15)
  age: number = 18;

  constructor(public arr: number[]) {}

  addNumber(@ParameterDecorator num: number): void {
    this.arr.push(num);
  }

  @MethodDecorator
  logYourInfo(): any {
    console.log(`My name is : ${this.name} and i am ${this.age} years old`);
    return this.age;
  }
}

const array = [1, 2, 3, 4];

let a = new Person(array);
a.addNumber(5); // Expected output is: "the method you are using now is addNumber"
a.logYourInfo(); //Expected console log "go to school" because @ChangeAge(15) is aplied to the property age
a.arr;
//@ts-ignore
a.breath(); //Expected output: 'can breathe'
