import { defineStore } from "pinia";
import { useNuxtApp } from "#imports";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  addDoc,
} from "firebase/firestore";

export const useInstitutionStore = defineStore("institution", {
  state: () => {
    return {
      institutions: [],
      editInstition: null,
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
          phoneNumber: doc.data().phone_number,
          email: doc.data().email,
          code: doc.data().code,
          abbreviation: doc.data().abbreviation,
        };
        this.institutions.push(data);
      });
    },
    async checkInstitution(institution) {
      console.log(institution);
      let newInstitution = true;
      this.institutions.forEach(async (element) => {
        if (
          element.name.toLowerCase() === institution.schoolName.toLowerCase()
        ) {
          this.editInstition = true;
          this.updateInstitution(element, institution);
          newInstitution = false;
        }
      });
      if (newInstitution) {
        this.createInstitution(institution);
      }
    },
    async updateInstitution(element, institution) {
      const { $db } = useNuxtApp();
      if (
        element.number !== institution.schoolNumber ||
        element.email !== institution.schoolEmail ||
        element.code !== institution.schoolCode ||
        element.abbreviation !== institution.schoolAbbreviation
      ) {
        const ref = doc($db, "institutions", institution.id);
        await updateDoc(ref, {
          abbreviation: institution.schoolAbbreviation,
          code: institution.schoolCode,
          email: institution.schoolEmail,
          number: institution.schoolNumber,
        }).catch((error) => {
          console.log(error);
        });
      }
    },
    async createInstitution(institution) {
      console.log(institution);
      const { $db } = useNuxtApp();
      const ref = collection($db, "institutions");
      await addDoc(ref, {
        name: institution.schoolName,
        email: institution.schoolEmail,
        code: institution.schoolCode,
        phone_number: institution.schoolNumber,
        abbreviation: institution.schoolAbbreviation,
      }).catch((error) => {
        console.log(error);
      });
    },
    async updateProfile(institution) {
      const { $db, $auth } = useNuxtApp();
      const ref = doc($db, "users", $auth.currentUser.uid);
      await updateDoc(ref, { institutions: institution.id });
    },
    async clearStore() {
      this.institutions = [];
    },
  },
});
