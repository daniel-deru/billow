<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import type { IItem } from '@/stores/items'
import { Icon } from "@iconify/vue"
import { useItemsStore } from "@/stores/items"

interface IProps {
    item: IItem
}

const itemRef = ref<HTMLElement>()
const completed = ref<boolean>(false)

const itemStore = useItemsStore()
const { removeItem } = itemStore


// Macros
const { item } = defineProps<IProps>()

// Computed Properties
const total = computed<number>(() => {
    return item.price * item.quantity 
})

function checkHandler(e: Event){
    const checked = (e.target as HTMLInputElement).checked

    if(checked) {
        itemRef.value?.classList.add("completed")

    } else {
        itemRef.value?.classList.remove("completed")
    }
}

onMounted(() => {
    console.log("Shopping Item Mounted")
})

</script>

<template>
<div class="flex justify-between p-3 rounded-xl mb-4 item-container" ref="itemRef">
    <input type="checkbox" v-model="completed" name="" id="" @change="checkHandler">
    <div class="mx-0 my-auto font-bold">
        {{ item.name }}
    </div>
    <div class="price-container flex flex-col">
        <div class="text-center mx-0 my-auto font-bold">
            {{ total.toFixed(2) }}
        </div>
        <div class=" text-center mx-0 my-auto text-gray-400">
            {{ item.price.toFixed(2) }} x {{ item.quantity }}
        </div>
    </div>
    <div class="icon-container ml-5 cursor-pointer" @click="() => removeItem(item)">
        <Icon v-if="!completed" icon="ic:round-delete" class="icon"/>
        <Icon v-else icon="ic:round-delete" class="icon-completed"/>
    </div>
</div>
</template>

<style scoped>
.item-container {
    box-shadow: 0px 0px 10px grey;
    
}

.item-container input {
    width: 5%;
}

.item-container > div:not(div.icon-container) {
    width: 35%;
}

.completed {
    color: rgb(179, 179, 179);
    box-shadow: 0px 0px 10px rgb(179, 179, 179);
}

.icon {
    color: rgb(252, 44, 44);
    font-size: 2em;
}

.icon-completed {
    color: rgb(221, 221, 221);
    font-size: 2em;
}

.icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>