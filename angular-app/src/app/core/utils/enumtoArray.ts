export interface EnumI<E> {
  name: E;
}

export const enumtoArray = <E>(Enum: any): EnumI<E>[] => {
  return Object.keys(Enum).map((key) => ({ name: Enum[key] } as EnumI<E>));
};
