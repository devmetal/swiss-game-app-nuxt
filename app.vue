<script setup lang="ts">
import type { HorizontalNavigationLink } from "#ui/types";

const user = useAuthUser();
const { logout } = useAuth();

async function handleLogout() {
  await logout();
  navigateTo("/");
}

const guestLinks: HorizontalNavigationLink[] = [
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
];

const userLinks: HorizontalNavigationLink[][] = [
  [
    {
      label: "Home",
      icon: "i-heroicons-home",
      to: "/",
    },
    {
      label: "Profile",
      icon: "i-heroicons-user-circle",
      to: "/profile",
    },
  ],
  [
    {
      label: "Logout",
      icon: "i-heroicons-arrow-left-end-on-rectangle",
      click: handleLogout,
    },
  ],
];

const links = computed(() => (user.value ? userLinks : guestLinks));
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
