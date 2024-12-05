<script setup lang="ts">
import { Icon } from "@iconify/vue"
import { useRouter } from "vue-router"

interface IProps {
    title: string
    backButtonAction?: () => void
}

const router = useRouter()



const props = defineProps<IProps>()

function goBack() {
    if(typeof props.backButtonAction != "undefined")
        props.backButtonAction()
    else router.back()
}

</script>

<template>
    <header class="flex justify-between">
        <Icon icon="bxs:chevron-left" class="align-middle text-4xl text-indigo-500" @click.prevent="goBack" />
        <h1 class="text-center text-2xl mb-4">{{ title }}</h1>
        <Icon icon="clarity:home-solid" class="align-middle text-3xl text-indigo-500" @click.prevent="() => router.push('/')"/>
    </header>
</template>

<style>
header {
    height: 10vh;
}

</style>