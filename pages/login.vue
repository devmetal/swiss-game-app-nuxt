<script setup lang="ts">
definePageMeta({
  middleware: ["guest"],
});

import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
import { FetchError } from "ofetch";

const { login } = useAuth();

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(5, "Must be at least 5 characters"),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  email: undefined,
  password: undefined,
  error: "",
  pending: false,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  state.error = "";
  state.pending = true;

  try {
    await login(event.data.email, event.data.password);
    navigateTo("/profile");
  } catch (e) {
    state.pending = false;
    if (e instanceof FetchError) {
      if (e.status === 401) {
        state.error = "Wrong email or password";
        return;
      }
    }
    state.error = "Error during login";
  }
}
</script>

<template>
  <UContainer class="mt-4">
    <UCard>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" />
        </UFormGroup>

        <UFormGroup label="Password" name="password">
          <UInput v-model="state.password" type="password" />
        </UFormGroup>

        <UButton :disabled="state.pending" type="submit"> Submit </UButton>
      </UForm>
      <UAlert
        v-if="state.error"
        class="mt-4"
        color="red"
        variant="outline"
        title="Error"
        :description="state.error"
      />
    </UCard>
  </UContainer>
</template>
