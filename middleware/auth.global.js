import { useUserStore } from "../stores/auth";
import { useNuxtApp } from "#imports";

export default defineNuxtRouteMiddleware(async (to) => {
  // TODO: make safe :) rm -rf /hacker(wo)mans
  const { $auth } = useNuxtApp();
  const authStore = useUserStore();
  console.log("global middleware ran", to);
  if (to.name.includes("admin") && authStore.$state.role !== "Admin") {
    console.log(authStore.$state.role);
  }
  // if (to.path.includes("admin") && authStore.role !== "Admin") {
  //   navigateTo({ path: "/" });
  // }
  // if (
  //   to.path.includes("coordinator") &&
  //   authStore.role !== "Team Coordinator"
  // ) {
  //   navigateTo({ path: "/" });
  // }
});
