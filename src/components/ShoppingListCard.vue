<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useItemsStore } from '@/stores/items'
import { useRouter } from 'vue-router'
import { Icon } from "@iconify/vue"

// Types & Interfaces
import type { IItem } from '@/stores/items'
import { useListsStore, type IList } from '@/stores/lists'
import { storeToRefs } from 'pinia'

interface IProps {
    list: IList,
}


const router = useRouter()
const itemStore = useItemsStore()
const { loadItems } = itemStore
const listStore = useListsStore()
const { deleteList } = listStore

// State
const { items } = storeToRefs(itemStore)


// Lifecycle Hooks
onMounted(async () => {
    await loadItems(list?.id)
})


// Macros
const { list } = defineProps<IProps>()

// Computed Properties
const totalCost = computed<number>(() => {
    let sum = 0

    if(items) {
        items.value.forEach((item: IItem) =>  {
            sum += (item.price * item.quantity)
        })
    }

    return sum
})

// Functions
function goToList(){
    router.push(`/shopping-lists/${list.id}`)
}

</script>

<template>
    <div class="shopping-list-item">
        <div class="data-container"  @click="goToList">
            <div >
                <div class="">{{ list.name }}</div>
                <div class="text-gray-500">{{ items?.length }} Items</div>
            </div>
            <div class="text-indigo-500 text-2xl mx-0 my-auto">{{ totalCost }}</div>
        </div>
        <div class="mx-0 my-auto">
            <Icon icon="ic:round-delete" class="text-red-400 text-3xl" @click="() => deleteList(list?.id)"/>
        </div>
    </div>
</template>

<style scoped>
.shopping-list-item {
    display: flex;
    justify-content: space-between;
    box-shadow: 0px 0px 10px rgb(142, 142, 142);
    padding: 10px;
    margin-top: 1em;
    border-radius: 10px;
    cursor: pointer;
}

.data-container {
    width: 80%;
    display: flex;
    justify-content: space-between;
}
</style>