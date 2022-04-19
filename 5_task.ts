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


function ParameterDecorator(target: Function, key: string, index: number) {
  key === "logYourInfo"
    ? console.log("this is my favourite method")
    : console.log("index: " + index);

  console.log("the method you are using now is " + key);
}

function MethodDecorator(
  target: any,
  propertyName: string,
  propertyDescriptor: PropertyDescriptor
) {
  let originalMethod = propertyDescriptor.value
 propertyDescriptor.value = function(){
   if(!this.weight|| !this.height){
     console.log('Not enough data indicated')
   } else{
     let bmi=(this.weight/this.height/this.height*10000).toFixed(2);
     console.log(`Person's BMI is ${bmi}`);
   }

   return originalMethod.apply(this)  
 }
}

@ClassDecorator
class Person {
  name: string = "Denis";
   weight: number = 85;
   height: number = 188;

  @ChangeAge(23)
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
a.logYourInfo(); //Expected console log "My name is : Denis and i am 23 years old" and 
//"Person's BMI is 24.05" from Method Decorator, According to BMI chart, I'm healthy :)
a.arr; // [1,2,3,4,5]
//@ts-ignore
a.breath(); //Expected output: 'can breathe'  
