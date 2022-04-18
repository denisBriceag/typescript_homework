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

// type ApiResponse<T> = {
//   data: {
//     [P in keyof T]: T[P];
//   } & { pagination: number }; //Here we'll allow typescript to pass pagination inside data. We receive a union of types: All types of T + pagination:number

//   errors: string[];
// };

// let a2: ApiResponse<User> = {
//   data: { id: 1, name: "Denis", age: 23, pagination: 2 },
//   errors: ["error"],
// };

//=====================================================================================================

type ApiResponse<T> = {
  data: {
    [key: string]: T | number; //Data will now hold the same types that T and number combines;
    pagination: number; //Pagination which always be a number
  };

  errors: string[];
};

let a33: ApiResponse<User> = {
  data: { someData: { id: 1, name: "Denis", age: 23 }, pagination: 2 },
  errors: ["error"],
}; //Here pagination always be apart of the data
