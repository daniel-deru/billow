<script setup lang="ts">
import { ref } from "vue"
import Modal from '@/components/Modal.vue'

const modalOpen = ref<boolean>(false)

function showModal(){
    modalOpen.value = true
}

function hideModal(){
    modalOpen.value = false
}

</script>

<template>
    <main>
        <h1>List 1</h1>
        <button @click.prevent="showModal">New Item</button>
        <Modal :is-open="modalOpen" @modal-close="hideModal"/>
    </main>

</template>

<style scoped>
main {
    position: relative;
}
</style>