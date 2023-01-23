import { defineStore } from "pinia";
import { useNuxtApp } from "#imports";
import {
  collection,
  doc,
  updateDoc,
  getCountFromServer,
  getDocs,
  query,
  where,
  setDoc,
  writeBatch,
} from "firebase/firestore";

export const useInstitutionStore = defineStore("institution", {
  state: () => {
    return {
      institutions: [],
      filteredInstitutions: [],
      errorMessage: "",
      teams: [
        {
          id: 1,
          name: "Perth Modern 1",
          level: "Novice",
          division: "Not Allocated",
          timeslot: "5.15pm",
          venuePreferences: ["Perth Modern", "BCC", "Mercy"],
          hasVenuePreference: true,
          weekPreference: "Week 1",
          tuesdayAllocation: true,
          wednesdayAllocation: false,
          notes: "Some note",
        },
        {
          id: 2,
          name: "Perth Modern 2",
          level: "Senior",
          division: "Not Allocated",
          timeslot: "7.15pm",
          venuePreferences: ["Perth Modern", "Trinity", "Mercy"],
          hasVenuePreference: true,
          weekPreference: "Week 1",
          tuesdayAllocation: true,
          wednesdayAllocation: true,
          notes: "Hi",
        },
      ],
    };
  },
  getters: {},
  actions: {
    async getInstitutions() {
      const { $db } = useNuxtApp();
      const ref = collection($db, "institutions");
      const querySnapshot = await getDocs(ref);
      querySnapshot.forEach((doc) => {
        const institution = {
          abbreviation: doc.data().abbreviation,
          code: doc.data().code,
          email: doc.data().email,
          id: doc.id,
          name: doc.data().name,
          phone_number: doc.data().phone_number,
        };
        this.institutions.push(institution);
      });
      this.filteredInstitutions = [...this.institutions];
    },
    async editInstitution(institution) {
      const { $db } = useNuxtApp();
      const ref = doc($db, "institutions", institution.id);
      const sameName = query(
        collection($db, "institutions"),
        where("name", "==", institution.name),
        where("id", "!=", institution.id)
      );
      const snapshot = await getCountFromServer(sameName);
      if (snapshot.data().count === 0) {
        await updateDoc(ref, institution)
          .then(() => {
            this.errorMessage = "";
            const index = this.institutions.findIndex(function (item, i) {
              return item.id === institution.id;
            });
            this.institutions[index] = institution;
            const indexFiltered = this.filteredInstitutions.findIndex(function (
              item,
              i
            ) {
              return item.id === institution.id;
            });
            this.filteredInstitutions[indexFiltered] = institution;
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.errorMessage = "institution with same name exists";
      }
    },
    async createInstitution(institution) {
      const { $db } = useNuxtApp();
      const sameName = query(
        collection($db, "institutions"),
        where("name", "==", institution.name)
      );
      const snapshot = await getCountFromServer(sameName);
      if (snapshot.data().count === 0) {
        institution.id = doc(collection($db, "institutions")).id;
        await setDoc(doc($db, "institutions", institution.id), institution)
          .then(() => {
            this.errorMessage = "";
            this.institutions.push(institution);
            this.filteredInstitutions.push(institution);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.errorMessage = "institution with same name exists";
      }
    },
    async editTeam(team) {
      this.teams.forEach((t) => {
        if (t.id === team.id) {
          Object.assign(t, team);
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
