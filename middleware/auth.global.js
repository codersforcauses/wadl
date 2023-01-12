import { useUserStore } from "../stores/auth";

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useUserStore();
  console.log("global middleware ran", to, authStore);
  if (to.path.includes("admin") && authStore.role !== "Admin") {
    navigateTo({ path: "/" });
  }

});
