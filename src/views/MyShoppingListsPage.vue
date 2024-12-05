<script setup lang="ts">
import { useListsStore } from '@/stores/lists'
import { onMounted, watch } from 'vue'
import ShoppingListCard from '@/components/ShoppingListCard.vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import Header from '@/components/Header.vue'
import api from '@/config/axios'
import axios, { AxiosError } from 'axios'


const listStore = useListsStore()

const { lists } = storeToRefs(listStore)
const { addList, loadLists } = listStore


const router = useRouter()

async function createList(){
    const date = new Date()

    const body = {
        name: date.toDateString(),
        date: date.getTime()
    }

    try {
        const request = await api.post("/shoppinglist", body)
        const newList = request.data

        addList(newList)

        router.push(`/shopping-lists/${newList?.id}`)
    } catch (err: unknown) {
        if(axios.isAxiosError(err)){
            console.log((err as AxiosError).response?.data)
        }
    }


}

async function getLists(){

    console.log("Getting Lists from Server")
    try {
        await loadLists()
        console.log(lists.value)

    } catch (err: any) {
        if(err.response.status == 401) {
            router.push("/login")
        }
    }
}

// Watchers

watch(lists, (newList, oldList) => {
    oldList.values = newList.values
})

// Lifecycle hooks
onMounted(() => {
   getLists()
})

</script>

<template>
    <main class="shopping-container">
        <Header title="My Shopping Lists"/>  
        <section class="shopping-card-container">
            <ShoppingListCard v-for="listItem in lists" :list="listItem" :key="listItem.id" />
        </section>
        <section class="add-btn-container">
            <button @click.prevent="createList" class="add-btn">New List</button>
        </section>
        
        
    </main>
</template>

<style scoped>
.shopping-container {
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.shopping-card-container {
    height: 90vh;
    overflow: scroll;
}

.add-btn-container {
    padding-top: 1em;
}
</style>