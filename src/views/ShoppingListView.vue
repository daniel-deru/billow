<script setup lang="ts">
import { useListsStore, } from '@/stores/lists'
import { v4 as uuidv4 } from "uuid"
import ShoppingListItem from '@/components/ShoppingListItem.vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import Header from '@/components/Header.vue'


const listStore = useListsStore()
const { lists } = storeToRefs(listStore)
const { addList } = listStore

const router = useRouter()

function createList(){
    const date = new Date()

    const newList = {
        name: date.toDateString(),
        date: date.getTime(),
        id: uuidv4()
    }

    addList(newList)

    router.push(`/shopping-lists/${newList.id}`)
}
</script>

<template>
    <main class="shopping-container">  
        <section>
            <Header title="My Shopping Lists"/>
            <ShoppingListItem v-for="listItem in lists" :list="listItem" :key="listItem.id" />
        </section>
        <button @click.prevent="createList">New List</button>
    </main>
</template>

<style scoped>
.shopping-container {
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>