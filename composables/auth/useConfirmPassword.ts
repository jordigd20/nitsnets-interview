export const useConfirmPassword = (password: globalThis.Ref<string, string>) => {
  const confirmPassword = ref('');
  const confirmPasswordRules = [
    (value: string) => !!value || 'La confirmación de la contraseña es obligatoria',
    (value: string) => value === password.value || 'Las contraseñas no coinciden'
  ];

  return {
    confirmPassword,
    confirmPasswordRules
  };
};
