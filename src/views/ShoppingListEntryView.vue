<script setup lang="ts">
import { ref, onMounted, onUpdated, computed } from "vue"
import Modal from '@/components/Modal.vue'
import { useRouter } from "vue-router"
import { useListsStore } from "@/stores/lists"
import { useItemsStore } from "@/stores/items"
import GroceryListItem from "@/components/GroceryListItem.vue"
import { Icon } from '@iconify/vue';
import { storeToRefs } from "pinia"

import type { IList } from "@/stores/lists"
import type { IItem } from "@/stores/items"

const modalOpen = ref<boolean>(false)
const list = ref<IList>()
const items = ref<IItem[]>([])


const listStore = useListsStore()
const itemStore = useItemsStore()
const { getList } = listStore
const { getItems } = itemStore

// const { items } = storeToRefs(itemStore)
const router = useRouter()

const totalCost = computed<number>(() => {
    let sum = 0
    items.value.forEach(item => sum += (item.price * item.quantity))
    return sum
})

function showModal(){
    modalOpen.value = true
}

function hideModal(){
    modalOpen.value = false
}

onMounted(() => {
    const routeList = router.currentRoute.value.fullPath.split("/")
    const id = routeList[routeList.length - 1]
    list.value = getList(id)
    items.value = getItems(id)
})

onUpdated(() => {
    // if(list.value?.id) {
    //     items.value = getItems(list.value.id)
    // }
    // const routeList = router.currentRoute.value.fullPath.split("/")
    // const id = routeList[routeList.length - 1]
    // list.value = getList(id)
    // items.value = getItems(id)
})

</script>

<template>
    <main>
        <section>
            <div class="flex justify-between">
                <Icon 
                    icon="bxs:chevron-left" 
                    class="align-middle text-4xl text-indigo-500"
                    @click.prevent="() => router.back()"
                />
                <h1 class="text-center text-2xl mb-4">{{ list?.name }}</h1>
                <Icon icon="clarity:home-solid" class="align-middle text-3xl text-indigo-500" @click.prevent="() => router.push('/')"/>
            </div>
            <div>
                <section class="text-lg font-bold">
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
                    <GroceryListItem v-for="item in items" :key="item.id" :item="item"/>
                </section>
            </div>
        </section>
        <button @click.prevent="showModal">New Item</button>
        <Modal :is-open="modalOpen" @modal-close="hideModal"/>
    </main>

</template>

<style scoped>
main {
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
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