<script setup lang="ts">
import type { HorizontalNavigationLink } from "#ui/types";

const links: HorizontalNavigationLink[] = [
  {
    label: "Home",
    icon: "i-heroicons-home",
    to: "/",
  },
  {
    label: "Login",
    icon: "i-heroicons-arrow-right-circle",
    to: "/login",
  },
  {
    label: "Profile",
    icon: "i-heroicons-user-circle",
    to: "/profile",
  },
];
</script>

<template>
  <NuxtLoadingIndicator />
  <UHorizontalNavigation
    :links="links"
    class="border-b border-gray-200 dark:border-gray-800"
  />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
