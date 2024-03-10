<script setup lang="ts">
import { ref, onMounted, computed } from "vue"
import Modal from '@/components/Modal.vue'
import { useRouter } from "vue-router"
import { useListsStore } from "@/stores/lists"
import { useItemsStore } from "@/stores/items"
import ShoppingItem from "@/components/ShoppingItem.vue"
import { storeToRefs } from "pinia"
import Header from "@/components/Header.vue"
import api from "@/config/axios"

import type { IList } from "@/stores/lists"
import type { IItem } from "@/stores/items"

const modalOpen = ref<boolean>(false) // Opens modal to create new item
const list = ref<IList>() // Local state for the current list

const listStore = useListsStore() 
const itemStore = useItemsStore()

const { getList } = listStore
const { getItems, addItems } = itemStore

const { items } = storeToRefs(itemStore) // create local state from item store
const router = useRouter()

// Computed Properties
// Get the total cost of items
const totalCost = computed<number>(() => {
    let sum = 0
    items.value.forEach(item => sum += (item.price * item.quantity))
    return sum
})

// Get items related to the current list
const currentItems = computed<IItem[]>(() => {
    console.log(items.value)
    console.log(list.value)
    return items.value.filter(item => item.shoppinglist_id == list.value?.id)
})

// Watchers
// watch(items, (newItems, oldItems) => {
//     items.value = newItems
// })


// Functions
// Show the create item modal
function showModal(){
    modalOpen.value = true
}

// Hide the create item modal
function hideModal(){
    modalOpen.value = false
}

// Get the current list from the id in the route
async function getCurrentList(): Promise<void> {
    const routeList = router.currentRoute.value.fullPath.split("/")
    const id = routeList[routeList.length - 1]

    list.value = getList(id)
    const localItems = getItems(id)

    if(localItems.length <= 0) {
        try {
            console.log("Getting Items from server")
            const request = await api.get(`/shoppinglist/${id}/item`)

            if(request.status == 200) {
                addItems(request.data)
                console.log(request.data)
            }

        } catch (err: any) {
            console.log(err.response.data)

            if(err.response.status == 401) {
                router.push("/login")
            }
        }
    } else {
        items.value = localItems
    }
}

// Lifecycle Hooks
onMounted(() => {
    getCurrentList() // Get the items for the current list
})

</script>

<template>
    <main>
        <section>
            <Header :title="list?.name || 'My List'"/>
            <div>
                <section class="text-2xl font-bold">
                    <div class="summary">
                        <div>Total</div>
                        <div>{{ totalCost }}</div>
                    </div>
                    <div class="summary">
                        <div>Items</div>
                        <div>{{ items.length }}</div>
                    </div>
                </section>
                <section class="mt-4">
                    <ShoppingItem v-for="item in currentItems" :key="item.id" :item="item"/>
                </section>
            </div>
        </section>
        <button @click.prevent="showModal">New Item</button>
        <Modal :is-open="modalOpen" @modal-close="hideModal"/>
    </main>

</template>

<style scoped>
main {
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100dvh;
}

.summary {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
}

.summary:first-child {
    border-bottom: 2px solid var(--main-color);
}
</style>