import { useUserStore } from "../stores/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  // TODO: make safe :) rm -rf /hacker(wo)mans
  const authStore = useUserStore();
  console.log(authStore.$state.role);
  // const x = document.cookie;
  console.log(to, from);
  // console.log("global middleware ran", to, authStore);
  if (authStore.role !== "Admin") {
    console.log("admin");
    await navigateTo("/");
  }
});
