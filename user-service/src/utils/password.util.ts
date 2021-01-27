import * as argon2 from 'argon2';
import * as generator from 'generate-password';

export const hashPassword = async (password: string): Promise<string> => {
  return await argon2.hash(password, {
    type: argon2.argon2i,
    hashLength: 40,
  });
};

export const comparePassword = async (
  rawPassword: string,
  hashPassword: string,
): Promise<void> => {
  const res: boolean = await argon2.verify(hashPassword, rawPassword);
  if (!res) {
    throw new Error('Wrong password!');
  }
};

export const generatePassword = (length: number): string => {
  return generator.generate({
    length: length,
    numbers: true,
  });
};

export const generateRandomCode = (): number => {
  return Math.floor(1000 + Math.random() * 9000);
};
