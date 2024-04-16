export default defineEventHandler(async (event) => {
  const reqBody = await readBody(event);

  const resp = await $fetch("http://localhost:8000/api/auth/login", {
    method: "POST",
    body: reqBody,
  });

  return resp;
});
