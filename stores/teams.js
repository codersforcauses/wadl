import { defineStore } from "pinia";
import { useNuxtApp } from "#imports";
import { collection, getDocs } from "firebase/firestore";

export const useTeamStore = defineStore("team", {
  state: () => {
    return {
      teams: [],
    };
  },
  getters: {},
  actions: {
    async getTeams() {
      const { $db } = useNuxtApp();
      const ref = collection($db, "teams");
      const querySnapshot = await getDocs(ref);
      querySnapshot.forEach((doc) => {
        const team = {
          // id: doc.id,
          name: doc.data().name,
          level: doc.data().level,
          division: doc.data().division,
          timeslot: doc.data().timeslot,
          venuePreferences: doc.data().ven_pref,
          hasVenuePreference: !doc.data().ven_no_pref,
          weekPreference: doc.data().week_pref,
          tuesdayAllocation: doc.data().allocated_tue,
          wednesdayAllocation: doc.data().allocated_wed,
        };
        this.teams.push(team);
      });
    },
    async editTeam(team) {
      // const { $db } = useNuxtApp();
    },
    async createTeam(team) {
      // const { $db } = useNuxtApp();
    },
  },
});
