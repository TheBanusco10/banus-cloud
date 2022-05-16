<template>
  <section v-if="!user.name" id="login-container">
    <main id="login-main">
      <Login />
    </main>
  </section>
  <section v-else>
    <Navbar />
    <section id="files-section">
      <Files />
      <UploadFile />
    </section>
  </section>
</template>

<script>
import UploadFile from './components/UploadFile.vue'
import Files from './components/Files.vue'
import Login from './components/Login.vue'
import { useStore } from 'vuex'
import {computed, onMounted} from 'vue'
import Navbar from "@/components/Navbar";

export default {
  name: 'App',
  components: {
    Navbar,
    UploadFile,
    Files,
    Login
  },

  setup() {
    const store = useStore();

    // If user is stored in LocalStorage, restart session
    onMounted(() => {
      const user = JSON.parse(localStorage.getItem('user')) || '';
      store.commit('setUser', user);
    });

    return {
      user: computed(() => store.getters.getUser)
    }
  }
}
</script>

<style lang="scss">

  #app-container {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #login-main {

    height: 93vh;

    display: flex;
    flex-wrap: wrap;

    justify-content: center;
    align-items: center;

    #login-container {
      width: 60%;
    }

  }

  #files-section {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

</style>
