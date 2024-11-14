import { isValidEmail } from '../../utils/validate-email';

export const useEmail = () => {
  const email = ref('');
  const emailRules = [
    (value: string) => !!value || 'El correo electrónico es obligatorio',
    (value: string) => isValidEmail(value) || 'El correo electrónico debe ser válido'
  ];

  return {
    email,
    emailRules
  };
};
