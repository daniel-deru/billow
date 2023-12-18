<script setup lang="ts">
import { useListsStore, } from '@/stores/lists';
// import type { IList } from '@/stores/lists';
import { v4 as uuidv4 } from "uuid"
import ShoppingListItem from '@/components/ShoppingListItem.vue';
// import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

// const list = ref<IList>()

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

    // list.value = newList
    addList(newList)

    router.push(`/shopping-lists/${newList.id}`)
}
</script>

<template>
    <main class="shopping-container">
        <section>
            <h1 class="text-center text-2xl">My Shopping Lists</h1>
            <div>
                <ShoppingListItem v-for="listItem in lists" :list="listItem" :key="listItem.id" />
            </div>
        </section>
        <button @click.prevent="createList">New List</button>
    </main>
</template>

<style scoped>
.shopping-container {
    padding: 10px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>