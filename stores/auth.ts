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

      user.value = response.user;
      token.value = response.token;

      const tokenCookie = useCookie('token');
      tokenCookie.value = response.token;
      error.value = null;
      await navigateTo('/dashboard');
    } catch (err) {
      console.error(err);
      error.value = 'Error al iniciar sesión.';
    }

    isLoading.value = false;
  };

  const setAuthData = (data: AuthResponse) => {
    user.value = data.user;
    token.value = data.token;
  };

  const logout = () => {
    user.value = null;
    token.value = null;
    useCookie('token').value = null;
  };

  return { user, token, isLoading, error, isAuthenticated, login, logout, setAuthData };
});
