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
import { useUserStore } from "./auth";

export const useInstitutionStore = defineStore("institution", {
  state: () => {
    return {
      institutions: [],
      filteredInstitutions: [],
      userInstitution: null,
      errorMessage: "",
      successMessage: "",
      teams: [],
    };
  },
  getters: {},
  actions: {
    async getInstitutions() {
      const { $db } = useNuxtApp();
      const ref = collection($db, "institutions");
      const querySnapshot = await getDocs(ref);
      querySnapshot.forEach((doc) => {
        const data = {
          id: doc.data().id,
          name: doc.data().name,
          number: doc.data().number,
          email: doc.data().email,
          code: doc.data().code,
          abbreviation: doc.data().abbreviation,
        };
        this.institutions.push(data);
      });
      this.filteredInstitutions = [...this.institutions];
    },
    async getInstitutionByID(id) {
      console.log(id);
      const { $db } = useNuxtApp();
      const ref = doc($db, "institutions", id);
      await getDoc(ref).then((doc) => {
        this.userInstitution = {
          id: doc.data().id,
          name: doc.data().name,
          email: doc.data().email,
          number: doc.data().number,
          code: doc.data().code,
          abbreviation: doc.data().abbreviation,
        };
        console.log("USER INST", this.userInstitution);
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
    async updateInstitution(element, institution) {
      console.log(institution);
      const { $db } = useNuxtApp();
      if (
        element.number !== institution.number ||
        element.email !== institution.email ||
        element.code !== institution.code ||
        element.abbreviation !== institution.abbreviation
      ) {
        const ref = doc($db, "institutions", institution.id);
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
        const { $db } = useNuxtApp();
        const ref = doc(collection($db, "institutions"));
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
          this.filteredInstitutions.push(data);
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
      const { $db, $auth } = useNuxtApp();
      const userStore = useUserStore();
      const ref = doc($db, "users", $auth.currentUser.uid);
      await updateDoc(ref, { institution: id.id });
      userStore.institution = id.id;
    },
    async clearStore() {
      this.institutions = [];
    },
    // TODO: figure out best way the do tues/wed allocation
    async registerTeam(team) {
      // novice
      this.errorMessage = "";
      if (team.teams[0].levelPresent) {
        const numTeam = parseInt(team.teams[0].numberOfTeams);
        const tueAllocation = parseInt(team.teams[0].tuesdayAllocation);
        const wedAllocation = parseInt(team.teams[0].wednesdayAllocation);
        console.log(numTeam, tueAllocation, wedAllocation);
        if (numTeam > tueAllocation + wedAllocation) {
          this.errorMessage =
            "Please allocate the same number of teams created for NOVICE";
        } else if (numTeam * 2 < tueAllocation + wedAllocation) {
          this.errorMessage =
            "Please reduce the amount of allocations for NOVICE to match number of teams.";
        }
      }
      // junior
      if (team.teams[1].levelPresent) {
        const numTeam = parseInt(team.teams[1].numberOfTeams);
        const tueAllocation = parseInt(team.teams[1].tuesdayAllocation);
        const wedAllocation = parseInt(team.teams[1].wednesdayAllocation);
        console.log(numTeam, tueAllocation, wedAllocation);
        if (numTeam > tueAllocation + wedAllocation) {
          this.errorMessage =
            "Please allocate the same number of teams created for JUNIOR";
        } else if (numTeam * 2 < tueAllocation + wedAllocation) {
          this.errorMessage =
            "Please reduce the amount of allocations for JUNIOR to match number of teams.";
        } else if (tueAllocation > numTeam || wedAllocation > numTeam) {
          this.errorMessage = "Too many teams allocated to a single day.";
        }
      }
      // senior
      if (team.teams[2].levelPresent) {
        const numTeam = parseInt(team.teams[2].numberOfTeams);
        const tueAllocation = parseInt(team.teams[2].tuesdayAllocation);
        const wedAllocation = parseInt(team.teams[2].wednesdayAllocation);
        console.log(numTeam, tueAllocation, wedAllocation);
        if (numTeam > tueAllocation + wedAllocation) {
          this.errorMessage =
            "Please allocate the same number of teams created for SENIOR";
        } else if (numTeam * 2 < tueAllocation + wedAllocation) {
          this.errorMessage =
            "Please reduce the amount of allocations for SENIOR to match number of teams.";
        }
      }
      if (!this.errorMessage) {
        this.errorMessage = "";
        const { $db } = useNuxtApp();
        let teamCounter = 1;
        try {
          const batch = writeBatch($db);
          team.teams.forEach((level) => {
            const num = parseInt(level.numberOfTeams);
            const tueAllocation = parseInt(level.tuesdayAllocation);
            const wedAllocation = parseInt(level.wednesdayAllocation);
            const overlap = tueAllocation + wedAllocation - num;
            const tueOnly = tueAllocation - overlap;
            const wedOnly = wedAllocation - overlap;
            // number of people to fill into tues till both days are equal.
            let equalise = tueOnly - wedOnly; // 5 7 (10) over =2 to = 3 wo=5 equ=
            if (equalise > overlap) equalise = overlap;
            if (equalise < overlap * -1) equalise = overlap * -1;
            // can go on either day.
            const extra = overlap - Math.abs(equalise);

            if (num > 0) {
              for (let i = 0; i < tueOnly; i++) {
                const ref = doc(collection($db, "teams"));
                batch.set(ref, {
                  name: team.userTeam + " " + teamCounter,
                  tournament_id: team.tournamentId,
                  institution_id: team.institutionId,
                  level: level.teamLevel,
                  timeslot: level.timeslot,
                  week_pref: level.weekPreference,
                  allocated_tue: true,
                  allocated_wed: false,
                  has_venue_preference: team.hasVenuePreference,
                  ven_pref: team.venuePreferences,
                  notes: team.notes,
                  division: null,
                });
                teamCounter++;
              }
              for (let i = 0; i < wedOnly; i++) {
                const ref = doc(collection($db, "teams"));
                batch.set(ref, {
                  name: team.userTeam + " " + teamCounter,
                  tournament_id: team.tournamentId,
                  institution_id: team.institutionId,
                  level: level.teamLevel,
                  timeslot: level.timeslot,
                  week_pref: level.weekPreference,
                  allocated_tue: false,
                  allocated_wed: true,
                  has_venue_preference: team.hasVenuePreference,
                  ven_pref: team.venuePreferences,
                  notes: team.notes,
                  division: null,
                });
                teamCounter++;
              }
              for (let i = 0; i < Math.abs(equalise); i++) {
                const ref = doc(collection($db, "teams"));
                batch.set(ref, {
                  name: team.userTeam + " " + teamCounter,
                  tournament_id: team.tournamentId,
                  institution_id: team.institutionId,
                  level: level.teamLevel,
                  timeslot: level.timeslot,
                  week_pref: level.weekPreference,
                  allocated_tue: equalise < 0,
                  allocated_wed: equalise >= 0,
                  has_venue_preference: team.hasVenuePreference,
                  ven_pref: team.venuePreferences,
                  notes: team.notes,
                  division: null,
                });
                teamCounter++;
              }
              for (let i = 0; i < extra; i++) {
                const ref = doc(collection($db, "teams"));
                batch.set(ref, {
                  name: team.userTeam + " " + teamCounter,
                  tournament_id: team.tournamentId,
                  institution_id: team.institutionId,
                  level: level.teamLevel,
                  timeslot: level.timeslot,
                  week_pref: level.weekPreference,
                  allocated_tue: i % 2 === 0,
                  allocated_wed: i % 2 === 1,
                  has_venue_preference: team.hasVenuePreference,
                  ven_pref: team.venuePreferences,
                  notes: team.notes,
                  division: null,
                });
                teamCounter++;
              }
            }
          });
          await batch.commit();
          console.log("Teams Saved!");
          this.successMessage = "Teams Saved!";
        } catch (error) {
          console.log(error);
        }
      }
    },

    async editTeam(team) {
      const { $db } = useNuxtApp();
      console.log(team);
      const ref = doc($db, "teams", team.id);
      await updateDoc(ref, {
        allocated_tue: team.tuesdayAllocation,
        allocated_wed: team.wednesdayAllocation,
        division: team.division,
        has_venue_preference: team.hasVenuePreference,
        institution_id: team.institutionId,
        level: team.level,
        name: team.name,
        notes: team.notes,
        timeslot: team.timeslot,
        tournament_id: team.tournamentId,
        ven_pref: team.venuePreferences,
        week_pref: team.weekPreference,
      });
      this.teams.forEach((t) => {
        if (t.id === team.id) {
          Object.assign(t, team);
        }
      });
    },

    // THIS WORKS PLS DONT TOUCH
    async getTeamsByID(institutionId) {
      const { $db } = useNuxtApp();
      try {
        const ref = collection($db, "teams");
        const q = query(ref, where("institution_id", "==", institutionId));
        const snapShot = await getDocs(q);
        snapShot.forEach((doc) => {
          const data = {
            id: doc.id,
            name: doc.data().name,
            tournamentId: doc.data().tournament_id,
            institutionId: doc.data().institution_id,
            level: doc.data().level,
            timeslot: doc.data().timeslot,
            weekPreference: doc.data().week_pref,
            tuesdayAllocation: doc.data().allocated_tue,
            wednesdayAllocation: doc.data().allocated_wed,
            hasVenuePreference: doc.data().has_venue_preference,
            venuePreferences: doc.data().ven_pref,
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
