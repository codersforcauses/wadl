import { defineEventHandler, readBody, setCookie } from "#imports";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  setCookie(event, "auth-token", body.token);
  return {
    api: "works",
  };
});
