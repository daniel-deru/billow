<script setup lang="ts">
import { useListsStore } from '@/stores/lists'
import { useItemsStore } from '@/stores/items'
import { onMounted, watch } from 'vue'
import ShoppingListsItem from '@/components/ShoppingListsItem.vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import Header from '@/components/Header.vue'
import api from '@/config/axios'


const listStore = useListsStore()
const itemStore = useItemsStore()
const { loadItems } = itemStore

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
    const routeList = router.currentRoute.value.fullPath.split("/")
    const id = routeList[routeList.length - 1]

    console.log("Getting Lists from Server")
    try {
        console.log(lists.value)
        await loadLists()
        // await loadItems(id)
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
            <ShoppingListsItem v-for="listItem in lists" :list="listItem" :key="listItem.id" />
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