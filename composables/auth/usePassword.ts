import { isValidPassword } from '../../utils/validate-password';

export const usePassword = () => {
  const password = ref('');
  const passwordRules = [
    (value: string) => !!value || 'La contraseña es obligatoria',
    (value: string) =>
      isValidPassword(value) ||
      'La contraseña debe tener mínimo una mayúscula, un número y un carácter especial'
  ];

  return {
    password,
    passwordRules
  };
};
