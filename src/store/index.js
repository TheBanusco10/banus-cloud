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
    getUserFiles: (state, files) => {
      state.userFiles = files;
    },

    removeFile: (state, index) => {
      state.userFiles.splice(index, 1);
    }
  },
  actions: {
    getUserFiles: async ({commit}) => {
      const res = await fetch('http://localhost:3000/api/file');
      const data = await res.json();

      commit('getUserFiles', data.files);

    },

    removeFile: async ({commit}, payload) => {
      const res = await fetch(`http://localhost:3000/api/file/${payload.filename}`, {
          method: 'DELETE'
      });

      const data = await res.json();

      if (res.status !== 200) {
          console.log(data.message);
          return;
      }

      commit('removeFile', payload.index);

    }
  },
  modules: {
  }
})
