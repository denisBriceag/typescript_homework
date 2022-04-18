// Write a detailed explanation with images || steps || words how  withLet function works and why did we get the expected result

var app = () => {
  var withVar = () => {
    for (var index: number = 0; index < 10; index += 1) {
      setTimeout(() => console.log(`var idx = ${index}`), 0);
      console.log(`var index withOutSetTimeOut = ${index}`);
    }
  };

  var withLet = () => {
    for (let index: number = 0; index < 10; index += 1) {
      setTimeout(() => console.log(`let index = ${index}`), 0);
      console.log(`let index withOutSetTimeOut = ${index}`);
    }
  };

  withVar();
  withLet();
};
setTimeout(app, 0);

//1 SetTimeOut gets into the eventLoop, then it goes to webApi, The webApi sees the timer "0" and after 0 miliseconds returns app
//which afterwards goes to the queue. The call stack at this time is clear so the 'app' function goes to call stack

//2 Inside the app two functions are first declared and then called : 'withVar' and 'withLet'.

//3 withVar goes to the queue and then gets into the call stack, while withLet remains in queue. Inside the withVar function we see a for loop.
//The indexes are declared with var key word. To be precise, the code under the hood will look in the follwing way:
// var index:number; // index = undefined
// for(index = 0; index<10; index = index + 1){...}

// 4 Inside the for loop:
//As setTimeOut is asynchronous function, each setTimeOut function will first go into the webApi without pausing execution of console.log's.
//At the same time The console.log will execute one after another in the call stack. At this time the console should look like this:
//******var index withOutSetTimeOut = 0
//******var index withOutSetTimeOut = 1
//******var index withOutSetTimeOut = 2
//******var index withOutSetTimeOut = 3
//******var index withOutSetTimeOut = 4
//******var index withOutSetTimeOut = 5
//******var index withOutSetTimeOut = 6
//******var index withOutSetTimeOut = 7
//******var index withOutSetTimeOut = 8
//******var index withOutSetTimeOut = 9
//
//At this point index is equal to 10. To be more explicit here, take a look at this code snippet:
var index = 0;
if (index < 10) {
  setTimeout(() => console.log(`var idx = ${index}`), 0);
  console.log(`var index withOutSetTimeOut = ${index}`);
}
// index ++
//and so on... until index will be equal to 10 and it won't pass 'if' check

//At the same time all setTimeOut's callback's got into the queue. After the last console.log executes "var index withOutSetTimeOut = 9". The call back's one by one
//are gettin into queue. After that they get into the call stack. But index now is equal to 10, thus all console logs will see index as 10 and the output will be the following:
//****var idx = 10
//****var idx = 10
//****var idx = 10
//****var idx = 10
//****var idx = 10
//****var idx = 10
//****var idx = 10
//****var idx = 10
//****var idx = 10
//****var idx = 10

//5 withVar() terminates it's executions and call stack gets rid of withVar()

//6 withLet() gets into the call stack and and begins it's execution.

//7 Inside the withVar function we see a for loop.
//This time  indexes are declared with let key word. The let key word is BLOCK SCOPED, thus we'll see another behaviour!!
//Before running anything inside the for loop, the loop will create an overall block scope. To be more precise here, here's how the code itself will basically look like:

{
  //overal scope
  let index: number = 0;

  {
    //With every iteration a new block scope will be created
    let index: number; //With every iteration the index will be redeclared
    index = 0; // The index will be initiallized with the value from the last scope

    if (index < 10) {
      setTimeout(() => console.log(`let index = ${index}`), 0);
      console.log(`let index withOutSetTimeOut = ${index}`);
    }
  }

  {
    //New iteration --> new block scope
    let index: number; // New iteration --> new declaration of index
    index = 0; //index is initiallizing with the value from the last scope
    index++; //Index is iterating INSIDE THE EVERY NEW BLOCK SCOPE EXCEPT the first one, which is 0;
    if (index < 10) {
      setTimeout(() => console.log(`let index = ${index}`), 0);
      console.log(`let index withOutSetTimeOut = ${index}`);
    }
  }

  //... and so on
}

//!!!IMPORTANT NOTE!!!:In this case the each index inside the setTimeOut function is inside it's own scope. Basically every iteration has it's own scope.

//The same as in 'withVar' function, the console.log's are getting one by one inside the call stack and outputing the same result as in withVar function:
//******var index withOutSetTimeOut = 0
//******var index withOutSetTimeOut = 1
//******var index withOutSetTimeOut = 2
//******var index withOutSetTimeOut = 3
//******var index withOutSetTimeOut = 4
//******var index withOutSetTimeOut = 5
//******var index withOutSetTimeOut = 6
//******var index withOutSetTimeOut = 7
//******var index withOutSetTimeOut = 8
//******var index withOutSetTimeOut = 9

//Then setTimeOut call-backs goes one by one into the queue and then also one after another are getting inside the call stack.

//But this time, the console.log's inside the callback's will show another image. As was mentioned before, thanks to the let/const behaviour: index inside the setTimeOut function will be inside it's own scope, The output will be the following:

//****var idx = 0
//****var idx = 1
//****var idx = 2
//****var idx = 3
//****var idx = 4
//****var idx = 5
//****var idx = 6
//****var idx = 7
//****var idx = 8
//****var idx = 9

//8 WithLet function termitaes it's executions and leaves call stack.

//9 app fucntion terminates it's execution and leaves call stack. The call stack is clear.

//End.
