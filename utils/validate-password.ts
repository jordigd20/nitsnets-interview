/* eslint-disable no-useless-escape */
const upperCaseRegex = /[A-Z]/;
const numberRegex = /[0-9]/;
const symbolRegex = /[-#!$@£%^&*()_+|~=`{}\[\]:";'<>?,.\/\\ ]/;

export const isValidPassword = (password: string): boolean => {
  return (
    hasUpperCase(password) && hasNumber(password) && hasSymbol(password) && hasLength(password)
  );
};

const hasUpperCase = (password: string): boolean => {
  return upperCaseRegex.test(password);
};

const hasNumber = (password: string): boolean => {
  return numberRegex.test(password);
};

const hasSymbol = (password: string): boolean => {
  return symbolRegex.test(password);
};

const hasLength = (password: string): boolean => {
  return password.length >= 3;
};
