import { useUserStore } from "../stores/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useUserStore();
  console.log("global middleware ran", to, authStore);
  console.log(authStore.role);
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
