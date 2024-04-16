<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
});

const { data: me } = await useFetch("/api/me");
</script>

<template>
  <div>Page: profile</div>
  <div>{{ me }}</div>
</template>

<style scoped></style>
