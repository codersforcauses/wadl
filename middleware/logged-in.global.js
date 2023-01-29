import { useUserStore } from "../stores/user";
import { defineNuxtRouteMiddleware, navigateTo } from "#imports";
import { useTournamentStore } from "../stores/tournaments";

export default defineNuxtRouteMiddleware(async (to, _from) => {
  // NOTE: Nuxt 3.0.0 does not support server side access to client state
  // If you are seeing this further down the line, refactor this funciton
  // to run server side for better security.

  if (process.client) {
    const userStore = useUserStore();
    if (userStore.requesting) {
      userStore.clearStore();
    }

    const tournamentStore = useTournamentStore();
    const fixturesRoutes = tournamentStore.getRunning.map(
      (tournament) => `/fixtures/${tournament.id}`
    );
    const otherPublicRoutes = ["/", "/signup", "/login"];

    const allPublicRoutes = otherPublicRoutes.concat(fixturesRoutes);
    if (allPublicRoutes.includes(to.path)) return;

    if (userStore.auth === null) {
      return navigateTo({ path: "/login" });
    }
  }
});
