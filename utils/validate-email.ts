/* eslint-disable no-useless-escape */

// https://github.com/colinhacks/zod/blob/40e72f9eaf576985f876d1afc2dbc22f73abc1ba/src/types.ts#L595
const emailRegex =
  /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;

export const isValidEmail = (email: string): boolean => {
  return emailRegex.test(email);
};
