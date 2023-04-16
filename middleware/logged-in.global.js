import { useUserStore } from "../stores/user";
import { defineNuxtRouteMiddleware, navigateTo } from "#imports";
import { useTournamentStore } from "../stores/tournaments";

export default defineNuxtRouteMiddleware(async (to, _from) => {
  // Running on client only to prevent routing conflicts -- admin
  // route and log in route conflicting. Important routes are still protected.
  if (process.client) {
    const userStore = await useUserStore();
    if (userStore.requesting) {
      await userStore.clearStore();
    }

    const tournamentStore = useTournamentStore();

    const allPublicRoutes = tournamentStore.getRunning.reduce(
      (publicRoutes, tournament) => {
        publicRoutes.push(`/fixtures/${tournament.id}`);
        return publicRoutes;
      },
      ["/", "/signup", "/login", "/resetpassword"]
    );
    if (allPublicRoutes.includes(to.path)) return;

    if (userStore.auth === null) {
      return navigateTo({ path: "/login" });
    }
  }
});
