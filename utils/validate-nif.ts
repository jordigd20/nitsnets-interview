const DNI_CONTROL_LETTERS = 'TRWAGMYFPDXBNJZSQVHLCKE';
const DNI_REGEX = /^([KLM]\d{7}|\d{8})[TRWAGMYFPDXBNJZSQVHLCKE]$/i;
const NIE_REGEX = /^[XYZ]\d{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;

export const isValidNif = (nif: string): boolean => {
  return isValidDni(nif) || isValidNie(nif);
};

const isValidDni = (dni: string): boolean => {
  return DNI_REGEX.test(dni) && isValidControlLetter(dni);
};

const isValidNie = (nie: string): boolean => {
  return NIE_REGEX.test(nie) && isValidControlLetter(replaceNieLetter(nie));
};

const isValidControlLetter = (dni: string): boolean => {
  const letterIndex = +dni.replace(/[^\d]/g, '') % 23;
  const letter = dni.slice(-1);

  return DNI_CONTROL_LETTERS[letterIndex] === letter;
};

const replaceNieLetter = (nie: string): string => {
  const firstLetter = nie.charAt(0).toUpperCase();

  if (firstLetter === 'X') return 0 + nie.substring(1);
  if (firstLetter === 'Y') return 1 + nie.substring(1);
  if (firstLetter === 'Z') return 2 + nie.substring(1);

  return '';
};
