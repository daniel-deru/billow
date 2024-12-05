<script setup lang="ts">
import { ref, onMounted, computed } from "vue"
import ItemFormModal from '@/components/ItemFormModal.vue'
import { useRouter } from "vue-router"
import { useListsStore } from "@/stores/lists"
import { useItemsStore } from "@/stores/items"
import ShoppingItemCard from "@/components/ShoppingItemCard.vue"
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
const totalCost = computed<number>(() => {
    if(!list.value?.id) return 0
    return Object.values(items.value[list.value.id]).reduce(sumTotal, 0)
})

const currentCompletedCost = computed<number>(() => {
    if(!list.value?.id) return 0
    return items.value[list.value.id].filter(filterCompletedItems).reduce(sumTotal, 0)
})

// Get items related to the current list
const currentItems = computed<IItem[]>(() => {
    if(!list.value?.id) return []
    return items.value[list.value.id].filter(filterActiveItems).sort(sortByCompleted)
})

const completedItems = computed<IItem[]>(() => {
    if(!list.value?.id) return []
    return items.value[list.value.id].filter(filterCompletedItems)
})


// Functions
const filterActiveItems = (item: IItem) => !item.completed

const filterCompletedItems = (item: IItem) => item.completed

// Sorts items by completed. Places completed items last
const sortByCompleted = (item: IItem) => item.completed ? 1 : 0

// Calculate the total for all items in this list
const sumTotal = (total: number, item: IItem) => total + (item.price * item.quantity)

const showModal = () => modalOpen.value = true
const hideModal = () => modalOpen.value = false

// Look at this function
// Get the current list from the id in the route
// TODO: Refactor this so that the api call becomes part of the store instead
async function getCurrentList(): Promise<void> {
    const routeList = router.currentRoute.value.fullPath.split("/")
    const id = routeList[routeList.length - 1]

    list.value = await getList(parseInt(id))
    const localItems = getItems(parseInt(id))

    if(!list.value?.id) return

    if(localItems.length <= 0) {
        try {
            console.log("Getting Items from server")
            const request = await api.get(`/shoppinglist/${id}/item`)

            if(request.status == 200) {
                addItems(request.data)
            }

        } catch (err: any) {
            console.log(err.response.data)

            if(err.response.status == 401) {
                router.push("/login")
            }
        }
    } else {
        items.value[list.value?.id] = localItems
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
                <section class="text-2xl font-bold pb-2">
                    <div class="summary">
                        <div>Total</div>
                        <div>{{ currentCompletedCost }} / {{ totalCost }}</div>
                    </div>
                    <div class="summary">
                        <div>Items</div>
                        <div>{{ completedItems.length }} / {{ list?.id && items[list?.id ].length }}</div>
                    </div>
                </section>
                <div class="overflow-y-scroll item-container">
                    <section v-if="currentItems.length > 0">
                        <h2 class="border-b-2 border-indigo-500 text-center text-xl">Current Items</h2>
                        <div class="mt-4">
                            <ShoppingItemCard v-for="item in currentItems" :key="item.id" :item="item"/>
                        </div>
                    </section>
                    <section v-if="completedItems.length > 0">
                        <h2 class="border-b-2 border-indigo-500 text-center text-xl">Completed Items</h2>
                        <div class="mt-4">
                            <ShoppingItemCard v-for="item in completedItems" :key="item.id" :item="item"/>
                        </div>
                    </section>
                </div>
            </div>
        </section>
        <button @click.prevent="showModal">New Item</button>
        <ItemFormModal :is-open="modalOpen" @modal-close="hideModal"/>
    </main>

</template>

<style scoped lang="css">
main {
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100dvh;
}

.item-container {
    overflow-y: auto;
    max-height: 70dvh;
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