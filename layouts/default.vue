<template>
  <v-layout>
    <NavigationSidebar />
    <DashboardHeader />

    <v-main>
      <v-container fluid class="px-6">
        <slot />
      </v-container>
    </v-main>
  </v-layout>
</template>
