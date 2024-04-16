import type { MeResponse } from "~/server/api/me.get";
import type { User } from "./useAuthUser";

export const useAuth = () => {
  const user = useAuthUser();

  function setUser(u: User | null) {
    user.value = u;
  }

  async function logout() {
    setUser(null);
    try {
      await $fetch("/api/logout");
    } catch (e) {
      console.log(e);
    }
  }

  async function login(email: string, password: string) {
    try {
      const body = await $fetch<User>("/api/login", {
        method: "POST",
        body: {
          email,
          password,
        },
      });

      setUser(body);
    } catch (e) {
      throw e;
    }
  }

  async function me() {
    if (user.value) {
      return;
    }

    try {
      const data = await $fetch<MeResponse>("/api/me", {
        headers: useRequestHeaders(["cookie"]),
      });

      setUser(data);

      return data;
    } catch (e) {
      throw e;
    }
  }

  return {
    login,
    logout,
    me,
  };
};
