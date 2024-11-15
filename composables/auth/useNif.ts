export const useNif = () => {
  const nif = ref('');
  const nifRules = [
    (value: string) => !!value || 'El NIF es obligatorio',
    (value: string) => isValidNif(value) || 'El NIF debe ser válido'
  ];

  return {
    nif,
    nifRules
  };
};
