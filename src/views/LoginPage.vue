<script setup lang="ts">
import { ref } from "vue"
import api from "@/config/axios";
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref<string>("")
const password = ref<string>("")

async function submit(){
    const body = {
        email: email.value,
        password: password.value
    }

    try {
        const request = await api.post("/users/login", body)
        
        if(request.status == 200) {
            router.push("/shopping-lists")
        }
    } catch (err: any) {
        console.log(err.response.data.detail)
    }

}

</script>

<template>
    <main>
        <h1>Login</h1>
        <form>
            <div>
                <label for="email">Email</label>
                <input type="text" name="email" v-model="email">
            </div>
            <div>
                <label for="password">Password</label>
                <input type="password" name="password" v-model="password">
            </div>
            <button @click.prevent="submit" type="button">Login</button>
        </form>
    </main>
</template>

<style>

</style>