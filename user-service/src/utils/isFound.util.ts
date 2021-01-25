// util throw error if query does not return any row(s)
export const isFound = (res: any): void => {
  if (res == null || res.length == 0) {
    throw new Error(`Can not find any data.`);
  }
};
