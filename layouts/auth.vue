<template>
  <section class="layout-center auth-layout">
    <div class="auth-container">
      <slot />
    </div>
  </section>
</template>

<style>
  .v-theme--dark .auth-container {
    background-color: rgb(var(--v-theme-surface)) !important;
  }

  .auth-container {
    border-radius: 0.375rem;
    box-shadow:
      0 3px 3px -2px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)),
      0 3px 4px 0 var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)),
      0 1px 8px 0 var(--v-shadow-key-ambient-opacity, rgba(0, 0, 0, 0.12));
    max-width: 450px;
    width: 100%;
  }

  .auth-container > h1 {
    padding: 1.5rem 0;
    text-align: center;
  }

  .auth-container > form {
    padding: 0 2rem;
  }

  .auth-footer {
    display: flex;
    font-size: 0.875rem;
    justify-content: space-between;
    padding: 2rem 2rem 1rem 2rem;
  }
</style>
