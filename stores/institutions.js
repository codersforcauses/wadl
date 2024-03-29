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
  deleteDoc,
} from "firebase/firestore";
import { useUserStore } from "./user";

export const useInstitutionStore = defineStore("institution", {
  state: () => {
    return {
      institutions: [],
      userInstitution: null,
      teams: [],
    };
  },
  getters: {},
  actions: {
    async getInstitutions() {
      this.institutions = [];
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
          abbreviation: doc.data().abbreviation,
          tournaments: null,
        };
        if (doc.data().tournaments !== undefined) {
          this.userInstitution.tournaments = doc.data().tournaments;
        }
      });
    },
    async checkInstitution(institution) {
      let newInstitution = true;
      await Promise.all(
        this.institutions.map(async (element) => {
          if (element.name.toLowerCase() === institution.name.toLowerCase()) {
            await this.updateInstitution(element, institution);
            newInstitution = false;
          }
        })
      );
      if (newInstitution === true) {
        await this.createInstitution(institution);
      } else {
        this.userInstitution = { ...institution };
        await this.updateProfile(institution);
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
      if (snapshot.data().count > 0) {
        throw new Error("Institution with same name exists");
      }
      await updateDoc(ref, institution);
      const index = this.institutions.findIndex(function (item, i) {
        return item.id === institution.id;
      });
      this.institutions[index] = institution;
    },
    async updateInstitution(element, institution) {
      const { $clientFirestore } = useNuxtApp();
      if (
        element.number !== institution.number ||
        element.email !== institution.email ||
        element.abbreviation !== institution.abbreviation
      ) {
        const ref = doc($clientFirestore, "institutions", institution.id);
        const data = {
          abbreviation: institution.abbreviation,
          email: institution.email,
          number: institution.number,
        };
        await updateDoc(ref, data);
        await this.updateProfile(ref);
      }
    },
    async createInstitution(institution) {
      const userStore = await useUserStore();
      let matchingInstitution = false;
      this.institutions.forEach((element) => {
        if (element.name.toLowerCase() === institution.name.toLowerCase()) {
          matchingInstitution = !matchingInstitution;
        }
      });
      if (matchingInstitution) {
        throw new Error("An Institution with the same name already exists");
      } else {
        const { $clientFirestore } = useNuxtApp();
        const ref = doc(collection($clientFirestore, "institutions"));
        const data = {
          id: ref.id,
          name: institution.name,
          email: institution.email,
          number: institution.number,
          code: institution.code,
          abbreviation: institution.abbreviation,
        };
        if (userStore.role !== "Team Coordinator") {
          await setDoc(ref, data);
          this.institutions.push(data);
        } else {
          await setDoc(ref, data);
          this.userInstitution = { ...data };
          await this.updateProfile(ref);
        }
      }
    },
    async updateProfile(id) {
      const { $clientFirestore, $clientAuth } = useNuxtApp();
      const userStore = await useUserStore();
      const ref = doc($clientFirestore, "users", $clientAuth.currentUser.uid);
      await updateDoc(ref, { institution: id.id });
      userStore.institution = id.id;
      await this.getTeamsByID(id.id);
    },
    async clearStore() {
      this.institutions = [];
    },
    async registerTeams(team) {
      const userStore = await useUserStore();
      // novice
      if (!team.tournamentId) {
        throw new Error("No tournament selected.");
      }
      for (let i = 0; i < team.teams.length; i++) {
        const numTeam = parseInt(team.teams[i].numberOfTeams);
        const tueAllocation = parseInt(team.teams[i].allocatedTue);
        const wedAllocation = parseInt(team.teams[i].allocatedWed);
        if (numTeam <= 0 && team.teams[i].levelPresent) {
          throw new Error(
            team.teams[i].teamLevel + " selected but no total teams selected."
          );
        } else if (numTeam > 50) {
          throw new Error(
            "Registering too many teams at once. Please enter a lower number of teams."
          );
        } else if (tueAllocation < 0 || wedAllocation < 0) {
          throw new Error(
            "Please allocate a positive number of teams for " +
              team.teams[i].teamLevel +
              "."
          );
        } else if (tueAllocation > numTeam || wedAllocation > numTeam) {
          throw new Error(
            "Too many teams allocated to a single day in " +
              team.teams[i].teamLevel +
              "."
          );
        } else if (numTeam > tueAllocation + wedAllocation) {
          throw new Error(
            "Not enough teams allocated to days in " +
              team.teams[i].teamLevel +
              "."
          );
        } else if (numTeam * 2 < tueAllocation + wedAllocation) {
          throw new Error(
            "Too many teams allocated to days in  " +
              team.teams[i].teamLevel +
              "."
          );
        }
      }
      const { $clientFirestore } = useNuxtApp();
      const query_ = query(
        collection($clientFirestore, "teams"),
        where("institutionId", "==", userStore.institution),
        where("tournamentId", "==", team.tournamentId)
      );
      const snapshot = await getCountFromServer(query_);
      let teamCounter = snapshot.data().count + 1;
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
            const teamDetails = {
              name: team.userTeam + " " + teamCounter,
              tournamentId: team.tournamentId,
              institutionId: team.institutionId,
              level: level.teamLevel,
              timeslot: level.timeslot,
              weekPreference: level.weekPreference,
              allocatedTue: i < overlap + tueOnly,
              allocatedWed: i < overlap || i >= overlap + tueOnly,
              hasVenuePreference: team.hasVenuePreference,
              venuePreference: team.hasVenuePreference
                ? team.venuePreference
                : null,
              notes: team.notes,
              division: null,
            };
            batch.set(ref, teamDetails);
            this.teams.push(teamDetails);
            teamCounter++;
          }
        }
      });
      await batch.commit();
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
      this.teams = [];
      const { $clientFirestore } = useNuxtApp();
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
    },
    async deleteInstitution(id) {
      const { $clientFirestore } = useNuxtApp();
      const ref = doc($clientFirestore, "institutions", id);
      await deleteDoc(ref);
      const index = this.institutions.findIndex((t) => {
        return id === t.id;
      });
      this.institutions.splice(index, 1);
    },
    async updateInstitutionTournaments(institutionId, tournament) {
      const { $clientFirestore } = useNuxtApp();
      const ref = doc($clientFirestore, "institutions", institutionId);
      const data = {
        tournaments: tournament,
      };
      await updateDoc(ref, data).then(() => {
        this.updateProfile(ref);
      });
    },
  },
});
