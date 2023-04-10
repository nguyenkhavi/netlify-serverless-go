export type Assign<T1 = object, T2 = object> = Omit<T1, keyof T2> & T2

export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

type Test = { a: 1 | 3 } & { b: 2 } & { c: 3 } & { d: string | number }
//    ^?
export type PrettifiedTest = Prettify<Test>
//          ^?
