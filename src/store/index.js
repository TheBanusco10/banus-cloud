import { createStore } from 'vuex'

export default createStore({
  state: {
    userFiles: []
  },
  getters: {
    getUserFiles: (state) => {
      return state.userFiles;
    }
  },
  mutations: {
    getUserFiles: ({commit}) => {
      commit.commit('getUserFiles');
    }
  },
  actions: {
    getUserFiles: async ({state}) => {
      const res = await fetch('http://localhost:3000/api/file');
      const data = await res.json();

      state.userFiles = data.files;
  }
  },
  modules: {
  }
})
