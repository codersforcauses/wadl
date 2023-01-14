import { useUserStore } from "../stores/auth";
import { useNuxtApp } from "#imports";

export default defineNuxtRouteMiddleware(async (to) => {
  const { $auth } = useNuxtApp();
  const authStore = useUserStore();
  console.log("global middleware ran", to);
  console.log(authStore.$state);
  // if (to.name.includes("admin") && authStore.$state.role === "Admin") {
  //   console.log(authStore.$state.role);
  //   navigateTo("/adjudicators");
  // }
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
