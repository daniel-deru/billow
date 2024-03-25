<script setup lang="ts">
import { useListsStore } from '@/stores/lists'
import { onMounted, watch } from 'vue'
import ShoppingListCard from '@/components/ShoppingListCard.vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import Header from '@/components/Header.vue'
import api from '@/config/axios'


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
    } catch (err: any) {
        console.log(err.response.data)
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
        <section>
            <Header title="My Shopping Lists"/>
            <ShoppingListCard v-for="listItem in lists" :list="listItem" :key="listItem.id" />
        </section>
        <button @click.prevent="createList">New List</button>
    </main>
</template>

<style scoped>
.shopping-container {
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>