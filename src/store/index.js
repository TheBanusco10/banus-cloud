import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {},
    userFiles: []
  },
  getters: {
    getUser: (state) => {
      return state.user;
    },
    getUserFiles: (state) => {
      return state.userFiles;
    }
  },
  mutations: {
    setUser: (state, user) => {
      state.user = user;
    },

    getUserFiles: (state, files) => {
      state.userFiles = files;
    },

    removeFile: (state, index) => {
      state.userFiles.splice(index, 1);
    }
  },
  actions: {
    getUserFiles: async ({commit, state}) => {
      const res = await fetch(`${process.env.VUE_APP_BASE_API}/get-files`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          user_id: state.user._id
        })
      });

      const data = await res.json();

      commit('getUserFiles', data.files);

    },

    removeFile: async ({commit}, payload) => {
      const res = await fetch(`${process.env.VUE_APP_BASE_API}/file/${payload.filename}`, {
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
