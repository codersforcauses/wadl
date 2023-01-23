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
  },
});
