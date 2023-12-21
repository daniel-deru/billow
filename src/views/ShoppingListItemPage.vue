<script setup lang="ts">
import { ref, onMounted, computed } from "vue"
import Modal from '@/components/Modal.vue'
import { useRouter } from "vue-router"
import { useListsStore } from "@/stores/lists"
import { useItemsStore } from "@/stores/items"
import ShoppingItem from "@/components/ShoppingItem.vue"
import { storeToRefs } from "pinia"
import Header from "@/components/Header.vue"

import type { IList } from "@/stores/lists"
import type { IItem } from "@/stores/items"

const modalOpen = ref<boolean>(false)
const list = ref<IList>()

const listStore = useListsStore()
const itemStore = useItemsStore()
const { getList } = listStore
const { getItems } = itemStore

const { items } = storeToRefs(itemStore)
const router = useRouter()

const totalCost = computed<number>(() => {
    let sum = 0
    items.value.forEach(item => sum += (item.price * item.quantity))
    return sum
})

const currentItems = computed<IItem[]>(() => {
    return items.value.filter(item => item.listId == list.value?.id)
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