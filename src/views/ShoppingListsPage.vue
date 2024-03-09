<script setup lang="ts">
import { useListsStore } from '@/stores/lists'
import { onMounted } from 'vue'
import ShoppingListsItem from '@/components/ShoppingListsItem.vue'
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
    if(lists.value.length <= 0) {
        try {
            const request = await api.get("/shoppinglist")

            if(request.status == 200) {
                const responseLists = request.data
                loadLists(responseLists)
            }
        } catch (err: any) {
            console.log(err.response.status)
            if(err.response.status == 401) {
                router.push("/login")
            }
        }
    }
}

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