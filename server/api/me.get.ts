import { FetchError } from "ofetch";

export type MeResponse = {
  email: string;
  id: number;
};

export default defineEventHandler(async (event) => {
  const token = getCookie(event, "token");

  const url = "http://localhost:8000/api/auth/me";

  try {
    const data = await $fetch<MeResponse>(url, {
      headers: { Authorization: `Bearer: ${token}` },
    });

    return data;
  } catch (e) {
    if (e instanceof FetchError) {
      if (e.status === 401) {
        return null;
      }
    }
    return null;
  }
});
