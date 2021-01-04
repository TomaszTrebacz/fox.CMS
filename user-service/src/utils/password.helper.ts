import * as argon2 from 'argon2';

export const hashPassword = async (password: string): Promise<string> => {
  return await argon2.hash(password, {
    type: argon2.argon2i,
    hashLength: 40,
  });
};

export const comparePassword = async (
  rawPassword: string,
  hashPassword: string,
): Promise<boolean> => {
  return await argon2.verify(hashPassword, rawPassword);
};
