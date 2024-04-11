import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  id: "user",
  state: () => ({
    name: "Thomas LAMBOLEZ",
    id: "",
    isAuth: true,
    right: "admin",
  }),
  getter: {
    getUserName: (state) => {
      state.name = "Thomas LAMBOLEZ";
    },
  },
});
