<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useItemsStore } from '@/stores/items'
import { useListsStore } from "@/stores/lists"
import { useRouter } from 'vue-router'
import { Icon } from "@iconify/vue"

// Types & Interfaces
import type { IItem } from '@/stores/items'
import type { IList } from '@/stores/lists'

interface IProps {
    list: IList,
}


const router = useRouter()
const itemStore = useItemsStore()
const { getItems } = itemStore
const { deleteList } = useListsStore()

// State
const items = ref<IItem[]>()


// Lifecycle Hooks
onMounted(() => {
    items.value = getItems(list.id)
})


// Macros
const { list } = defineProps<IProps>()

// Computed Properties
const totalCost = computed<number>(() => {
    let sum = 0

    if(items.value)
        items.value.forEach((item: IItem) => sum += (item.price * item.quantity))

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
        <div class="mx-0 my-auto" @click="() => deleteList(list.id)">
            <Icon icon="ic:round-delete" class="text-red-400 text-3xl"/>
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