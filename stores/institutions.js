import { defineStore } from "pinia";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { useNuxtApp } from "#imports";

export const useInstitutionStore = defineStore("institution", {
  state: () => {
    return {
      institutions: [
        {
          id: 1,
          name: "Perth Modern",
          code: "1234",
          abbreviation: "PM",
        },
        {
          id: 2,
          name: "Ballajura Community College",
          code: "111",
          abbreviation: "BCC",
        },
      ],
    };
  },
  getters: {},
  actions: {
    async createInstitution(institution) {
      this.institutions.push({
        ...institution,
        id: this.institutions.length + 1,
      });
    },
    async editInstitution(institution) {
      this.institutions.forEach((inst) => {
        if (inst.id === institution.id) {
          Object.assign(inst, institution);
        }
      });
    },
    async registerTeam(team) {
      const { $db } = useNuxtApp();
      const ref = doc(collection($db, "teams"));
      await setDoc(ref, {
        hasvenuePreference: true,
        notes: team.notes,
        teams: team.teams,
        tournamentId: team.tournament,
        venuePrefernce: team.venuePreferences,
      })
        .then((element) => {
          console.log("Team Saved!");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getTeams() {
      const { $db } = useNuxtApp();
      const ref = collection($db, "teams");
      const snapShot = await getDocs(ref);
      snapShot.forEach((doc) => {
        const data = {
          hasvenuePreference: doc.data().hasvenuePreference,
          notes: doc.data().notes,
          teams: doc.data.teams,
          tournamentId: doc.data().tournamentId,
          venuePrefernce: doc.data().venuePrefernce,
        };
        // this.teams.push(data)
      });
    },
  },
});
