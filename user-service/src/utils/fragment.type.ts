/*
  this type allow us to declare which fields in interface we want to be required
  
  we can say that this is combination of Partial<> and Required<>
*/

export type Fragment<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} &
  {
    [P in K]-?: T[P];
  };
