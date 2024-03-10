import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/config/axios'

export interface IItem {
    name: string,
    price: number,
    quantity: number,
    planned: boolean,
    shoppinglist_id?: string
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
    const listItems: IItem[] = items.value.filter(item => item.shoppinglist_id == listId)
    return listItems
  }

  async function loadItems(listId: string): Promise<void> {
    if(items.value.length <= 0) {
      const request = await api.get(`/shoppinglist/${listId}/item`)

      if(request.status == 200) {
        items.value.push(request.data)
      }
    }
  }

  function removeItem(itemId: string | undefined) {
    console.log(items.value)
    items.value = items.value.filter(item => item.id != itemId)
    console.log(items.value)
  }

  return { items, addItem, addItems, getItems, removeItem, loadItems }
})
