import { defineStore } from "pinia";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  writeBatch,
} from "firebase/firestore";
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
    // TODO: figure out best way the do tues/wed allocation
    async registerTeam(team) {
      const { $db } = useNuxtApp();
      let teamCounter = 1;
      const ref = doc(collection($db, "teams"));
      try {
        const batch = writeBatch($db);
        console.log(batch);
        team.teams.map(async (level, index) => {
          if (level.numberOfTeams > 0) {
            for (let i = 0; i < level.numberOfTeams; i++) {
              batch.set(ref, {
                name: "Perth Modern " + teamCounter,
                tournamentId: team.tournament,
                institutionId: 2,
                level: level.teamLevel,
                timeslot: level.timeslot,
                weekPerference: level.weekPerference,
                tuesdayAllocation: 0,
                wednesdayAllocation: 1,
                hasvenuePreference: team.hasVenuePreference,
                venuePreference: team.venuePreferences,
                notes: team.notes,
              });
              teamCounter++;
            }
          }
        });
        await batch.commit();
        console.log("Team Saved!");
      } catch (error) {
        console.log(error);
      }
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
