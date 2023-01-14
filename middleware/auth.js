import { useUserStore } from "../stores/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  // TODO: make safe :) rm -rf /hacker(wo)mans
  if (process.client) {
    const authStore = useUserStore();
    console.log(to, from);
    console.log(authStore.$state.role);
    if (authStore.role === "Admin") {
      console.log("admin");
    } else if (authStore.role !== "Admin") {
      console.log("not");
      return navigateTo({ path: "/login" });
    }
  }
});
