<script setup lang="ts">
// Imports
import { ref, defineProps, defineEmits, computed} from "vue"
import { useItemsStore } from "@/stores/items"
import { v4 as uuidv4 } from "uuid"
import { useRouter } from "vue-router"

// Types & Interfaces
import type { FormHTMLAttributes } from 'vue'
import type { IItem } from "@/stores/items"

interface IModalProps {
    isOpen: boolean
}

// Hooks
const router = useRouter()
const itemStore = useItemsStore()
const { addItem } = itemStore

// State
const name = ref<string>("")
const price = ref<number | null>(null)
const quanity = ref<number>(1)
const planned = ref<boolean>(false)

const formRef = ref<FormHTMLAttributes>()

// Computed Properties
const total = computed<number>(() => {
    if(price?.value && quanity.value > 0){
        return price.value * quanity.value
    }
    return 0
})

// Functions
function changeQuantity(delta: number){
    if(quanity.value == 1 && delta == -1) return
    quanity.value += delta
}

function createItem(){
    const routeList = router.currentRoute.value.fullPath.split("/")
    const listId = routeList[routeList.length - 1]

    const newItem: IItem = {
        name: name.value,
        price: price.value || 0,
        quantity: quanity.value,
        planned: planned.value,
        id: uuidv4(),
        listId: listId
    }

    addItem(newItem)
    emit("modal-close")
    clearForm()
}

function clearForm(){
    name.value = ""
    price.value = null
    quanity.value = 1
    planned.value = false
}

// Lifecycle Hooks

// Macros
defineProps<IModalProps>()
const emit = defineEmits(["modal-close"])

</script>

<template>
    <section v-if="isOpen">
        <div>
            <h1 class="text-2xl text-center">Add Item</h1>
            <form class="mt-4" ref="formRef">
                <div>
                    <label for="name">Name</label>
                    <input type="text" v-model="name" name="name" placeholder="Eg: Bananas">
                </div>
                <div>
                    <label for="price">Price</label>
                    <input type="number" v-model.number="price" name="price" placeholder="Eg: 10.50" min="0">
                </div>
                <div>
                    <label for="quanity">Quantity</label>
                    <div class="flex justify-evenly quantity-container">
                        <input type="number" name="quantity" v-model.number="quanity" min="1">
                        <button type="button" @click="() => changeQuantity(-1)"> - </button>
                        <button type="button" @click="() => changeQuantity(1)"> + </button>
                    </div>

                </div>
                <div class="mt-4">
                    <input type="checkbox" v-model="planned" name="planned" class="mr-2">
                    <label for="planned" class="inline-label">Planned</label>
                </div>
                <div class="text-center text-4xl mt-8">{{ total.toFixed(2) }}</div>
            </form>
        </div>
        
        <button @click.prevent="createItem" class="submit-btn">Create Item</button>
    </section>
</template>

<style scoped>
section {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: white;
    padding: 10px;
}

label {
    display: block;
    margin-bottom: 5px;
    margin-top: 20px;
    font-size: 1.15em;
}

.inline-label {
    display: inline-block;
}

input[type="checkbox"] {
    width: 25px;
    height: 25px;
}

button {
    background-color: var(--main-color);
    font-size: 1.5em;
    padding: 10px 20px;
    border-radius: 30px;
    width: 100%;
    color: white;
    margin-top: 20px;
}

.quantity-container > * {
    margin: 0px 5px;
}
.quantity-container > input {
    width: 100%;
}

.quantity-container > button {
    width: 50%;
}

</style>