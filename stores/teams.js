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
      const { $clientFirestore } = useNuxtApp();
      if (!$clientFirestore) return;
      const ref = collection($clientFirestore, "teams");
      const querySnapshot = await getDocs(ref);
      querySnapshot.forEach((doc) => {
        const team = {
          // id: doc.id,
          name: doc.data().name,
          level: doc.data().level,
          division: doc.data().division,
          timeslot: doc.data().timeslot,
          hasVenuePreference: doc.data().hasVenuePreference,
          venuePreference: doc.data().venuePreference,
          weekPreference: doc.data().weekPreference,
          allocatedTue: doc.data().allocatedTue,
          allocatedWed: doc.data().allocatedWed,
          notes: doc.data().notes,
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
