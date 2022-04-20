// EX 4 ------------------------------------------------------------------------------------------------------------
//Having two interfaces:
/*interface User {
  id: number;
  name: string;
  age: number;
}
interface Car {
  id: number;
  color: string;
  numberOfDoors: number;
}
Replicate an API response that will have the following structure:
{
  data: {
    [any keys of string type]: Generic type;
    pagination: number;
  }
  errors: string[]
}

=========================================================================================================
type ApiResponse<T> = {
  data: {
    [key: string]: T
    pagination: number
  }
  errors: string[]
}

let a: ApiResponse<number> = { data: {ADD: 1, pagination: 100}}  
this code shows error : 'Property 'pagination' of type 'number' is not assignable to 'string' index type 'T''



*/
//-----------------------------------------------------------------------------------------------------------------

interface User {
  id: number;
  name: string;
  age: number;
}
interface Car {
  id: number;
  color: string;
  numberOfDoors: number;
}

type ApiResponse<T> = {
  data: {
    [P in keyof T extends Car? "cars" : "users"] : T[]
  
  } & {pagination : number}
  errors: string[];
};


let a: ApiResponse<Car> = {
  data: { users : [{id: 1, color: "Denis", numberOfDoors: 23}, {id: 2, color: "Anastasia", numberOfDoors: 23}], pagination:2 }, 
  errors:['err1', 'err2']
};
