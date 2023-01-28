import { defineStore } from "pinia";
import { useNuxtApp } from "#imports";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  getCountFromServer,
  query,
  where,
  setDoc,
  getDoc,
  writeBatch,
} from "firebase/firestore";
import { useUserStore } from "./user";

export const useInstitutionStore = defineStore("institution", {
  state: () => {
    return {
      institutions: [],
      userInstitution: null,
      errorMessage: "",
      teams: [],
    };
  },
  getters: {},
  actions: {
    async getInstitutions() {
      const { $clientFirestore } = useNuxtApp();
      const ref = collection($clientFirestore, "institutions");
      const querySnapshot = await getDocs(ref);
      querySnapshot.forEach((doc) => {
        const data = {
          id: doc.id,
          name: doc.data().name,
          number: doc.data().number,
          email: doc.data().email,
          code: doc.data().code,
          abbreviation: doc.data().abbreviation,
        };
        this.institutions.push(data);
      });
    },
    async getInstitutionByID(id) {
      const { $clientFirestore } = useNuxtApp();
      const ref = doc($clientFirestore, "institutions", id);
      await getDoc(ref).then((doc) => {
        this.userInstitution = {
          id: doc.id,
          name: doc.data().name,
          email: doc.data().email,
          number: doc.data().number,
          code: doc.data().code,
          abbreviation: doc.data().abbreviation,
        };
      });
    },
    async checkInstitution(institution) {
      let newInstitution = true;
      this.institutions.forEach(async (element) => {
        if (element.name.toLowerCase() === institution.name.toLowerCase()) {
          this.updateInstitution(element, institution);
          newInstitution = !newInstitution;
        }
      });
      if (newInstitution === true) {
        this.createInstitution(institution);
      } else {
        this.userInstitution = { ...institution };
        this.updateProfile(institution);
      }
    },
    async editInstitution(institution) {
      const { $clientFirestore } = useNuxtApp();
      const ref = doc($clientFirestore, "institutions", institution.id);
      const sameName = query(
        collection($clientFirestore, "institutions"),
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
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.errorMessage = "institution with same name exists";
      }
    },
    async updateInstitution(element, institution) {
      const { $clientFirestore } = useNuxtApp();
      if (
        element.number !== institution.number ||
        element.email !== institution.email ||
        element.code !== institution.code ||
        element.abbreviation !== institution.abbreviation
      ) {
        const ref = doc($clientFirestore, "institutions", institution.id);
        const data = {
          abbreviation: institution.abbreviation,
          code: institution.code,
          email: institution.email,
          number: institution.number,
        };
        await updateDoc(ref, data)
          .catch((error) => {
            console.log(error);
          })
          .then(() => {
            this.updateProfile(ref);
          });
      }
    },
    async createInstitution(institution) {
      const userStore = useUserStore();
      let matchingInstitution = false;
      this.institutions.forEach((element) => {
        if (element.name.toLowerCase() === institution.name.toLowerCase()) {
          matchingInstitution = !matchingInstitution;
        }
      });
      if (matchingInstitution) {
        this.errorMessage = "An Institution with the same name already exists";
      } else {
        this.errorMessage = "";
        const { $clientFirestore } = useNuxtApp();
        const ref = doc(collection($clientFirestore, "institutions"));
        const data = {
          id: ref.id,
          name: institution.name,
          email: institution.email,
          code: institution.code,
          number: institution.number,
          abbreviation: institution.abbreviation,
        };
        if (userStore.role !== "Team Coordinator") {
          await setDoc(ref, data).catch((error) => {
            console.log(error);
          });
          this.institutions.push(data);
        } else {
          await setDoc(ref, data)
            .then(() => {
              this.userInstitution = { ...data };
              this.updateProfile(ref);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    },
    async updateProfile(id) {
      const { $clientFirestore, $clientAuth } = useNuxtApp();
      const userStore = useUserStore();
      const ref = doc($clientFirestore, "users", $clientAuth.currentUser.uid);
      await updateDoc(ref, { institution: id.id });
      userStore.institution = id.id;
    },
    async clearStore() {
      this.institutions = [];
    },
    async registerTeams(team) {
      // novice
      this.errorMessage = "";
      if (!team.tournamentId) {
        this.errorMessage = "No tournament selected."
        return;
      }
      let totalTeams;
      for(let i = 0; i < team.teams.length; i++) {
        const numTeam = parseInt(team.teams[i].numberOfTeams);
        const tueAllocation = parseInt(team.teams[i].allocatedTue);
        const wedAllocation = parseInt(team.teams[i].allocatedWed);
        if (numTeam <= 0) {
          this.errorMessage =
          team.teams[i].teamLevel + " selected but no total teams selected.";
        } else if (numTeam > 50) {
          this.errorMessage =
            "Registering too many teams at once. Please enter a lower number of teams.";
        } else if (tueAllocation < 0 || wedAllocation < 0) {
          this.errorMessage =
            "Please allocate a positive number of teams for " + team.teams[i].teamLevel + ".";
        } else if (tueAllocation > numTeam || wedAllocation > numTeam) {
          this.errorMessage = "Too many teams allocated to a single day in " + team.teams[i].teamLevel + ".";
        } else if (numTeam > tueAllocation + wedAllocation) {
          this.errorMessage =
            "Not enough teams allocated to days in " + team.teams[i].teamLevel + ".";
        } else if (numTeam * 2 < tueAllocation + wedAllocation) {
          this.errorMessage =
            "Too many teams allocated to days in  " + team.teams[i].teamLevel + ".";
        }
        if (this.errorMessage != "") break;
      }
      if (!this.errorMessage) {
        this.errorMessage = "";
        const { $clientFirestore } = useNuxtApp();
        let teamCounter = 1;
        try {
          const batch = writeBatch($clientFirestore);
          team.teams.forEach((level) => {
            const num = parseInt(level.numberOfTeams);
            const tueAllocation = parseInt(level.allocatedTue);
            const wedAllocation = parseInt(level.allocatedWed);
            const overlap = tueAllocation + wedAllocation - num;
            const tueOnly = tueAllocation - overlap;
            if (num > 0) {
              for (let i = 0; i < num; i++) {
                const ref = doc(collection($clientFirestore, "teams"));
                batch.set(ref, {
                  name: team.userTeam + " " + teamCounter,
                  tournamentId: team.tournamentId,
                  institutionId: team.institutionId,
                  level: level.teamLevel,
                  timeslot: level.timeslot,
                  weekPreference: level.weekPreference,
                  allocatedTue: i < overlap + tueOnly,
                  allocatedWed: i < overlap || i >= overlap + tueOnly,
                  hasVenuePreference: team.hasVenuePreference,
                  venuePreference: team.venuePreference,
                  notes: team.notes,
                  division: null,
                });
                teamCounter++;
              }
            }
          });
          await batch.commit();
        } catch (error) {
          console.log(error);
        }
      }
    },

    async editTeam(team) {
      const { $clientFirestore } = useNuxtApp();
      const ref = doc($clientFirestore, "teams", team.id);
      await updateDoc(ref, {
        allocatedTue: team.allocatedTue,
        allocatedWed: team.allocatedWed,
        division: team.division,
        hasVenuePreference: team.hasVenuePreference,
        institutionId: team.institutionId,
        level: team.level,
        name: team.name,
        notes: team.notes,
        timeslot: team.timeslot,
        tournamentId: team.tournamentId,
        venuePreference: team.venuePreference,
        weekPreference: team.weekPreference,
      });
      this.teams.forEach((t) => {
        if (t.id === team.id) {
          Object.assign(t, team);
        }
      });
    },
    async getTeamsByID(institutionId) {
      const { $clientFirestore } = useNuxtApp();
      try {
        const ref = collection($clientFirestore, "teams");
        const q = query(ref, where("institutionId", "==", institutionId));
        const snapShot = await getDocs(q);
        snapShot.forEach((doc) => {
          const data = {
            id: doc.id,
            name: doc.data().name,
            tournamentId: doc.data().tournamentId,
            institutionId: doc.data().institutionId,
            level: doc.data().level,
            timeslot: doc.data().timeslot,
            weekPreference: doc.data().weekPreference,
            allocatedTue: doc.data().allocatedTue,
            allocatedWed: doc.data().allocatedWed,
            hasVenuePreference: doc.data().hasVenuePreference,
            venuePreference: doc.data().venuePreference,
            notes: doc.data().notes,
            division: doc.data().division,
          };
          this.teams.push(data);
        });
      } catch (e) {
        console.log("NO TEAMS", e);
      }
    },
  },
});
