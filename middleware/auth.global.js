import { useUserStore } from "../stores/auth";

export default defineNuxtRouteMiddleware(async (to) => {
  // return await navigateTo("/");
  const authStore = useUserStore();
  console.log("global middleware ran", to, authStore);
  if (to.path === "/admin" && authStore.role !== "Admin") {
    navigateTo({ path: "/" });
  }
});
