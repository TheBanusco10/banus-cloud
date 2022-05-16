<template>

  <nav>
    <div id="app-title">
      <h1>Banus Cloud</h1>
    </div>
    <div id="avatar-section">
      <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" alt="avatar" class="avatar">
      <div class="dropdown-content">
        <p class="avatar-email">
          {{ user.email }}
        </p>
        <ul>
          <li>Profile</li>
          <li @click="logout">Log out</li>
        </ul>
      </div>
    </div>
  </nav>
  
</template>

<script>
import {useStore} from "vuex";
import {computed} from "vue";

export default {
  name: "Navbar",

  setup() {
    const store = useStore();

    return {
      user: computed(() => store.getters.getUser),

      logout: () => store.commit('logout')
    }
  }
}
</script>

<style lang="scss" scoped>

  nav {
    display: flex;
    justify-content: space-between;

    padding: 0 2rem;

    #avatar-section {
      position: relative;

      .avatar {
        width: 50px;
        border-radius: 100%;

        cursor: pointer;
      }

      &:hover {
        .dropdown-content {
          display: block;
        }
      }

      .dropdown-content {
        display: none;
        text-align: left;
        position: absolute;

        left: -110%;

        background-color: white;

        box-shadow: 0 0 10px rgba(0,0,0,.2);

        border-radius: 4px;

        z-index: 2;

        .avatar-email {
          font-size: 13px;
          color: gray;

          padding: 0 5px;
        }

        ul {
          padding: 0;
          margin: 0;

          li {
            list-style: none;
            padding: 15px;
            cursor: pointer;

            transition: all .3s;

            &:hover {
              background-color: rgba(210, 210, 210, 0.5);
            }
          }
        }
      }
    }
  }

</style>