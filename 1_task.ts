// EX 1 -----------------------------------

// interface Entity {
//   readonly id?: string;
//   readonly name?: string;
//   readonly age?: number;
//   readonly ethnicity?: string;
// }

// Given following interface do the following operations:
// Remove - 1. readonly, 2. optional type and 3. id property & ethnicity property
// do this as 3 separate mutation types
// create a mapper function that maps response type of all keys to boolean

// expected:
// type newType = A<B<C<D<Type>>>>
/*
  {
    name: boolean;
    age: boolean;
  }
 */

interface Entity {
  readonly id?: string;
  readonly name?: string;
  readonly age?: number;
  readonly ethnicity?: string;
}

//1.Removed readonly
type RemoveReadonly<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};

type NonReadonly = RemoveReadonly<Entity>;

//2.Remove removed optional
type RemoveOptional<Type> = {
  [Property in keyof Type]-?: Type[Property];
};

type RequiredUser = RemoveOptional<Entity>;

//3.Removed id property & ethnicity property
type RemovedIdEthnicity = Omit<Entity, "id" | "ethnicity">;

//4. All to bool
type ToBool<Type> = {
  [Property in keyof Type]: boolean;
};

type test = ToBool<
  Omit<RemoveReadonly<RemoveOptional<Entity>>, "id" | "ethnicity">
>;
