<script setup lang="ts">
import {  ref } from "vue"
import api from "@/config/axios";
import { useRouter } from "vue-router";

const email = ref<string>("")
const password = ref<string>("")

const router = useRouter()

async function submit(){
   
    const body = {
        email: email.value,
        password: password.value
    }

    const headers = {
        "Content-Type": "application/json"
    }

    try {
        const request = await api.post("/users/signup", body, {headers})

        if(request.status == 201) {
            router.push("/login")
        }

    } catch (err: any) {
        console.log(err.response.data.detail)
    }
}


</script>

<template>
<main>
<h1 class="text-center font-bold text-2xl pt-10">Sign Up</h1>
<form>
    <div>
        <label for="email">Email</label>
        <input type="text" name="email" v-model="email">
    </div>
    <div>
        <label for="password">Password</label>
        <input type="password" name="password" v-model="password">
    </div>
    <button @click.prevent="submit" type="button">Sign Up</button>
</form>

</main>
</template>

<style>
    form {
        margin: 15px;
        margin-top: 10rem;
    }

    form > div {
        padding-top: 15px;
    }

    form > button {
        margin-top: 15px;
    }
</style>