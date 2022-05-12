<template>
    <div v-if="isLogging" id="logging">
        <p>Login</p>
        <input type="text" placeholder="example@example.com" v-model="userInformation.email">
        <input type="password" placeholder="******" v-model="userInformation.password">
        <button @click="logging">Log in</button>

        <p @click="isLogging = false">Change to Register</p>
    </div>
    <div v-else id="register">
        <p>Register</p>
        <input type="text" placeholder="Name" v-model="userInformation.name">
        <input type="text" placeholder="example@example.com" v-model="userInformation.email">
        <input type="password" placeholder="******" v-model="userInformation.password">
        <button @click="registerUser">Register</button>

        <p @click="isLogging = true">Change to Login</p>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex';

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
            const res = await fetch(`${process.env.VUE_APP_BASE_API}/user`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userInformation.value)
            });

            const data = await res.json();

            store.commit('setUser', data);
            console.log(data);
        }

        const logging = async () => {
            const res = await fetch(`${process.env.VUE_APP_BASE_API}/login`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userInformation.value)
            });

            const data = await res.json();

            if (res.status === 200)
                store.commit('setUser', data);

            console.log(data);
        }

        return {
            isLogging,
            userInformation,

            registerUser,
            logging
        }

    },
}
</script>