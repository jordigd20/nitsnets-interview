import type { AuthResponse } from '~/interfaces';

export default defineNuxtRouteMiddleware(async () => {
  const token = useCookie('token').value;
  const authStore = useAuthStore();

  if (!token) {
    return navigateTo('/');
  }

  const { data, error } = await useFetch<AuthResponse>(`${BASE_API_URL}/refresh-token`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (error.value || !data.value) {
    console.error(error.value);
    authStore.logout();
    return navigateTo('/');
  }

  authStore.setAuthData(data.value);
});
