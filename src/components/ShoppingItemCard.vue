<script setup lang="ts">
import { computed, ref } from 'vue';
import type { IItem } from '@/stores/items'
import { useItemsStore } from "@/stores/items"
import { Icon } from "@iconify/vue"

interface IProps {
    item: IItem
}

const expanded = ref<boolean>(false)

const itemStore = useItemsStore()
const { removeItem, completeItem } = itemStore


// Macros
const { item } = defineProps<IProps>()

// Computed Properties
const total = computed<number>(() => {
    return item.price * item.quantity 
})


// Functions
const toggleCompleted = () => {
    completeItem(item)
    toggleExpandCard()
}
const toggleExpandCard = () => expanded.value = !expanded.value


</script>

<template>
<div class="rounded-xl mb-4 item-container" :class="item.completed && 'completed'">
    <div class="flex justify-between">
        <div class="py-1 px-2 text-center align-middle w-10 h-10 icon-container expand" @click="toggleExpandCard">
            <div v-if="expanded">
                <Icon v-if="!item.completed" icon="fa6-solid:chevron-down" class="expand-icon"/>
                <Icon v-else icon="fa6-solid:chevron-down" class="expand-icon completed"/>
            </div>
            <div v-else>
                <Icon v-if="!item.completed" icon="fa6-solid:chevron-right" class="expand-icon"/>
                <Icon v-else icon="fa6-solid:chevron-right" class="expand-icon completed"/>
            </div>
        </div>
    
        <div class="flex justify-between flex-1 py-2 px-2" @click="toggleCompleted">
            <div class="mx-0 my-auto font-bold">
                {{ item.name }}
            </div>
            <div class="price-container flex flex-col">
                <div class="mr-10 my-auto font-bold">
                    {{ item.quantity }}
                </div>
                
            </div>
        </div>
        
        <div class="icon-container ml-5 cursor-pointer" @click="() => removeItem(item)">
            <Icon v-if="!item.completed" icon="ic:round-delete" class="icon"/>
            <Icon v-else icon="ic:round-delete" class="icon-completed"/>
        </div>
    </div>
    <div v-if="expanded" class="flex justify-evenly">
        <div class="p-2  mx-0 my-auto">
            {{ item.price.toFixed(2) }} x {{ item.quantity }} = <b>{{ total.toFixed(2) }}</b>
        </div>
        <div class="my-auto">
            {{ item.planned ? "Planned" : "Unplanned" }}
        </div>
    </div>

</div>
</template>

<style scoped>
.item-container {
    box-shadow: 0px 0px 5px rgb(191, 191, 191);
    user-select: none;
    
}

.expand {
    color: var(--main-color);
}

.expand-icon {
    font-size: 1.5em;
}

.completed {
    color: rgb(151, 151, 151);
    text-decoration: line-through;
}

.icon {
    color: rgb(252, 44, 44);
    font-size: 2em;
}

.icon-completed {
    font-size: 2em;
}

.icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>