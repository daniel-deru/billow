<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue"

const name = ref<string>("")
const price = ref<number>()
const quanity = ref<number>(1)
const planned = ref<boolean>(false)

function changeQuantity(delta: number){
    if(quanity.value == 1 && delta == -1) return
    quanity.value += delta
}


interface IModalProps {
    isOpen: boolean
}

defineProps<IModalProps>()

const emit = defineEmits(["modal-close"])

</script>

<template>
    <section v-if="isOpen">
        <div>
            <h1 class="text-2xl text-center">Add Item</h1>
            <form class="mt-4">
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
                <div>
                    <input type="checkbox" v-model="planned" name="planned" class="mr-2">
                    <label for="planned" class="inline-label">Planned</label>
                </div>
                <div></div>
            </form>
        </div>
        
        <button @click.prevent="emit('modal-close')" class="submit-btn">Create Item</button>
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