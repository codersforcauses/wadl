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
  addDoc,
} from "firebase/firestore";

export const useInstitutionStore = defineStore("institution", {
  state: () => {
    return {
      institutions: [],
      filteredInstitutions: [],
      errorMessage: "",
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
          number: doc.data().phone_number,
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
      console.log(snapshot.data().count);
      if (snapshot.data().count === 0) {
        await updateDoc(ref, institution)
          .then(() => {
            this.errorMessage = "";
            return true;
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log("in else statement");
        this.errorMessage = "institution with same name exists";
        return false;
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
        await addDoc(collection($db, "institutions"), institution)
          .then(() => {
            this.errorMessage = "";
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
