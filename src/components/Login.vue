<template>
  <div v-if="isLogging" @keyup.enter="login" class="login-modal">
    <p class="title">Login</p>
    <input type="text" placeholder="Email" v-model="userInformation.email">
    <input type="password" placeholder="Password" v-model="userInformation.password">
    <button @click="login">Log in</button>

    <p @click="isLogging = false" class="change-modal">Don't have an account yet? Register here</p>
  </div>
  <div v-else @keyup.enter="registerUser" class="login-modal">
    <p class="title">Register</p>
    <input type="text" placeholder="Name" v-model="userInformation.name">
    <input type="text" placeholder="Email" v-model="userInformation.email">
    <input type="password" placeholder="Password" v-model="userInformation.password">
    <button @click="registerUser">Create account</button>

    <p @click="isLogging = true" class="change-modal">I already have an account</p>
  </div>
</template>

<script>
import {ref} from 'vue'
import {useStore} from 'vuex';

export default {
  name: 'Login',
  setup() {

    const isLogging = ref(true);

    const store = useStore();

    const userInformation = ref({
      name: '',
      email: '',
      password: ''
    });

    const registerUser = async () => {
      const res = await fetch(`${process.env.VUE_APP_BASE_API}/register`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(userInformation.value)
      });

      const data = await res.json();

      store.commit('setUser', data);
      storeUserSession(data);

      console.log(data);
    }

    const login = async () => {
      const res = await fetch(`${process.env.VUE_APP_BASE_API}/login`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(userInformation.value)
      });

      const data = await res.json();

      if (res.status === 200) {
        store.commit('setUser', data.user);
        storeUserSession(data.user);
      }

      console.log(data);
    }

    const storeUserSession = (user) => {

      delete user['password'];

      localStorage.setItem('user', JSON.stringify(user));
    }

    return {
      isLogging,
      userInformation,

      registerUser,
      login
    }

  },
}
</script>

<style lang="scss" scoped>

@import '../scss/variables';

.login-modal {
  display: flex;
  flex-wrap: wrap;
  flex-flow: column;

  .title {
    font-size: 26px;
    text-transform: uppercase;
  }

  input {
    margin-bottom: 1rem;
    padding: 10px;

    border: none;
    border-bottom: 2px solid $border-color;

    transition: all .3s;

    &:focus {
      outline: none !important;
      border-color: $border-color-hover;
    }
  }

  button {
    padding: 10px;

    border: 2px solid $border-color;
    background-color: transparent;

    text-transform: uppercase;

    cursor: pointer;

    transition: all .3s;

    &:hover {
      color: white;
      background-color: $border-color;
    }
  }

  .change-modal {
    font-size: 13px;
    color: gray;

    cursor: pointer;

    transition: all .3s;

    border-bottom: 2px solid transparent;

    &:hover {
      border-bottom: 2px solid $border-color;
    }
  }
}

</style>