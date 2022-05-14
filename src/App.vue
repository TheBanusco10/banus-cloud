<template>
  <main>
    <section v-if="!user.name" id="login-container">
      <Login />
    </section>
    <section v-else id="files-section">
      <Files />
      <UploadFile />
    </section>
  </main>
</template>

<script>
import UploadFile from './components/UploadFile.vue'
import Files from './components/Files.vue'
import Login from './components/Login.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: 'App',
  components: {
    UploadFile,
    Files,
    Login
  },

  setup() {
    const store = useStore();

    return {
      user: computed(() => store.getters.getUser)
    }
  }
}
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  main {

    height: 93vh;

    display: flex;
    flex-wrap: wrap;

    justify-content: center;
    align-items: center;

    #login-container {
      width: 60%;
    }
    
    #files-section {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  }

</style>
