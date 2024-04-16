export type LoginResponse = {
  token: string;
};

export default defineEventHandler(async (event) => {
  const reqBody = await readBody(event);

  const { token } = await $fetch<LoginResponse>(
    "http://localhost:8000/api/auth/login",
    {
      method: "POST",
      body: reqBody,
    }
  );

  setCookie(event, "token", token, { httpOnly: true });

  return token;
});
