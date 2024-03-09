import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface IItem {
    name: string,
    price: number,
    quantity: number,
    planned: boolean,
    listId?: string
    id?: string
}

export const useItemsStore = defineStore('items', () => {
  const items = ref<IItem[]>([])
  
  function addItem(item: IItem){
    items.value.push(item)
  }

  function addItems(newItems: IItem[]){
    items.value.push(...newItems)
  }

  function getItems(listId: string): Array<IItem> {
    const listItems: IItem[] = items.value.filter(item => item.listId == listId)
    return listItems
  }

  function removeItem(itemId: string) {
    console.log(items.value)
    items.value = items.value.filter(item => item.id != itemId)
    console.log(items.value)
  }

  return { items, addItem, addItems, getItems, removeItem }
})
