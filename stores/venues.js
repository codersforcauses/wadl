import { defineStore } from "pinia";
import { useNuxtApp } from "#imports";
import { collection, getDocs, addDoc } from "firebase/firestore";

export const useVenueStore = defineStore("venue", {
  state: () => {
    return {
      venues: [],
      filteredVenues: [],
    };
  },
  getters: {},
  actions: {
    async createVenue(venue) {
      const { $clientFirestore } = useNuxtApp();
      if (!$clientFirestore) return;
      const newVenue = await addDoc(collection($clientFirestore, "venues"), {
        ...venue,
      });
      this.venues.push({ ...venue, id: newVenue.id });
    },
    async editVenue(venue) {
      this.venues.forEach((ven) => {
        if (ven.id === venue.id) {
          Object.assign(ven, venue);
        }
      });
    },
    async getVenues() {
      this.$reset();
      const { $clientFirestore } = useNuxtApp();
      if (!$clientFirestore) return;
      const ref = collection($clientFirestore, "venues");
      const querySnapshot = await getDocs(ref);
      querySnapshot.forEach((doc) => {
        this.venues.push({ id: doc.id, ...doc.data() });
      });
    },
  },
});
