import { createStore } from "vuex";
import { auth } from "./auth.module";
import userAdmin from "./modules/userAdmin";

const store = createStore({
  modules: {
    auth,
    userAdmin,
  },
});

export default store;