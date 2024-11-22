import type { User, AuthResponse } from '~/interfaces';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const isAuthenticated = computed(() => !!token.value);

  const login = async (email: string, password: string) => {
    isLoading.value = true;

    try {
      const response = await $fetch<AuthResponse>(`${BASE_API_URL}/login`, {
        method: 'POST',
        body: {
          email,
          password
        }
      });

      if (!response) throw new Error('Error al iniciar sesión.');

      // Al utilizar un mock server, se usa el email y contraseña del usuario almacenado en localStorage
      const userInStorage = getUserFromStorage();

      if (userInStorage.email !== email || userInStorage.password !== password) {
        throw new Error('Usuario o contraseña incorrectos.');
      }

      user.value = {
        id: userInStorage.id,
        email: userInStorage.email,
        name: userInStorage.name,
        role: response.user.role
      };
      token.value = response.token;

      const tokenCookie = useCookie('token');
      tokenCookie.value = response.token;
      error.value = null;
      await navigateTo('/dashboard');
    } catch (err) {
      console.error(err);
      error.value = (err as Error).message || 'Error al iniciar sesión.';
    }

    isLoading.value = false;
  };

  const setAuthData = (data: AuthResponse) => {
    user.value = data.user;
    token.value = data.token;
  };

  const getUserFromStorage = () => {
    const userStorage = localStorage.getItem('user');

    if (!userStorage) {
      throw new Error('Usuario o contraseña incorrectos.');
    }

    return JSON.parse(userStorage) as User & { password?: string };
  };

  const updateUserProperties = (data: Partial<User>) => {
    user.value = {
      ...user.value!,
      ...data
    };
  };

  const logout = () => {
    user.value = null;
    token.value = null;
    useCookie('token').value = null;
  };

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    login,
    logout,
    getUserFromStorage,
    setAuthData,
    updateUserProperties
  };
});
