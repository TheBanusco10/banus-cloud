<template>
  <UploadFile />
  <Files />

</template>

<script>
import UploadFile from './components/UploadFile.vue'
import Files from './components/Files.vue'

export default {
  name: 'App',
  components: {
    UploadFile,
    Files
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
  margin-top: 60px;
}
</style>
