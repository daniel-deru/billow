<script setup lang="ts">
import { computed, ref } from 'vue';
import type { IItem } from '@/stores/items';

interface IProps {
    item: IItem
}

const itemRef = ref<HTMLElement>()


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


</script>

<template>
<div class="flex justify-between p-3 rounded-xl mb-4 item-container" ref="itemRef">
    <input type="checkbox" name="" id="" @change="checkHandler">
    <div>{{ item.name }}</div>
    <div >{{ item.price.toFixed(2) }} x {{ item.quantity }}</div>
    <div class="text-right">{{ total.toFixed(2) }}</div>
</div>
</template>

<style scoped>
.item-container {
    box-shadow: 0px 0px 10px grey ;
}

.item-container input {
    width: 5%;
}

.item-container div {
    width: 30%;
}

.completed {
    color: rgb(179, 179, 179);
}
</style>