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
  console.log(target);
  target?.age < 18
    ? console.log("Go to school")
    : console.log("Take your beer");
  console.log(propertyDescriptor);
}

@ClassDecorator
class Person {
  name: string = "Denis";

  @ChangeAge(15)
  age: number = 18;

  constructor() {}

  @MethodDecorator
  logYourInfo(): any {
    console.log(`My name is : ${this.name} and i am ${this.age} years old`);
    return this.age;
  }
}

let a = new Person();
a.logYourInfo();
//@ts-ignore
a.breath();
