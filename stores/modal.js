import { defineStore } from "pinia";

export const useModalStore = defineStore("modal", {
  state: () => {
    return {
      editMode: false,
      modalVisibility: false,
      form: null,
    };
  },
});
