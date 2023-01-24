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
} from "firebase/firestore";
import { useUserStore } from "./auth";

export const useInstitutionStore = defineStore("institution", {
  state: () => {
    return {
      institutions: [],
      filteredInstitutions: [],
      userInstitution: null,
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
      // Do do convert institution to snake case e.g number -> phone_number
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
  },
});
