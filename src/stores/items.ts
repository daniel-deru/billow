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
  
  async function addItem(item: IItem, listId: string): Promise<void> {

    try {
      const request = await api.post(`/shoppinglist/${listId}/item`, item)

      if(request.status == 201) {
        items.value.push(request.data)
      } else {
          console.log("Something bad happened!")
        }
    } catch (err: any) {
        console.log(err.response)
      }
    
  }

  function addItems(newItems: IItem[]){
    items.value.push(...newItems)
  }

  function getItems(listId: string): Array<IItem> {
    const listItems: IItem[] = items.value.filter(item => item.shoppinglist_id == listId)
    return listItems
  }

  async function loadItems(listId: string | undefined): Promise<void> {
    if(items.value.length <= 0 && listId) {

      console.log("Making a server request to get items")

      const request = await api.get(`/shoppinglist/${listId}/item`)
      
      if(request.status == 200) {
        items.value = [...items.value, ...request.data]
      }
    }
  }

  async function removeItem(item: IItem | undefined) {
    if(!item) return

    try {
      const request  = await api.delete(`/shoppinglist/${item.shoppinglist_id}/item/${item.id}`)
      
      if(request.status == 200) {
        items.value = items.value.filter(curItem => curItem.id != item.id)
      }

    } catch (err: any) {
        console.log(err.response.data)
      }
    
  }

  return { items, addItem, addItems, getItems, removeItem, loadItems }
})
