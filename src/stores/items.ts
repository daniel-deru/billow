import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface IItem {
    name: string,
    price: number,
    quantity: number,
    planned: boolean,
    listId: number
    id: string
}

export const useItemsStore = defineStore('items', () => {
  const items = ref<IItem[]>([])
  
  function addItem(item: IItem){
    items.value.push(item)
  }

  function addItems(newItems: IItem[]){
    items.value.push(...newItems)
  }

  return { items, addItem, addItems }
})
