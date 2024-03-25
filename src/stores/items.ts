import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/config/axios'

export interface IItem {
    name: string,
    price: number,
    quantity: number,
    planned: boolean,
    completed: boolean | null
    shoppinglist_id?: number
    id?: string
}

type ItemStore = {
  [index: number]: IItem[]
}

export const useItemsStore = defineStore('items', () => {
  const items = ref<ItemStore>({})
  
  async function addItem(item: IItem, listId: string): Promise<void> {

    try {
      const request = await api.post(`/shoppinglist/${listId}/item`, item)
      
      if(request.status == 201) {
        const newItem: IItem = request.data
        if(!newItem.shoppinglist_id) return

        if(items.value[newItem.shoppinglist_id]) {
          items.value[newItem.shoppinglist_id].push(newItem)
        } else {
          items.value[newItem.shoppinglist_id] = [newItem]
        } 

      } else {
          console.log("Something bad happened!")
        }
    } catch (err: any) {
        console.log(err.response)
      }
    
  }

  function addItems(newItems: IItem[]){

    for(const item of newItems) {

      if(item.shoppinglist_id) {

        if(items.value[item.shoppinglist_id]) {

          items.value[item.shoppinglist_id].push(item)
        } else {

          items.value[item.shoppinglist_id] = [item]
        }

      }
    }

  }

  function getItems(listId: number | string): Array<IItem> {

    if(typeof listId == "string") {
      return items.value[parseInt(listId)] ?? []
    }
    return items.value[listId] ?? []

  }

  async function loadItems(listId: number | undefined): Promise<void> {
    if(!listId) return

    if(!items.value[listId]) {

      console.log("Making a server request to get items")

      const request = await api.get(`/shoppinglist/${listId}/item`)
      
      if(request.status == 200) {
        items.value[listId] = request.data
      }
    }
  }

  async function removeItem(item: IItem | undefined) {
    if(!item) return
    if(!item.shoppinglist_id) return

    try {
      const request  = await api.delete(`/shoppinglist/${item.shoppinglist_id}/item/${item.id}`)
      
      if(request.status == 200) {
        items.value[item.shoppinglist_id] = items.value[item.shoppinglist_id].filter(curItem => curItem.id != item.id)
      }

    } catch (err: any) {
        console.log(err.response.data)
      }
    
  }

  async function completeItem(item: IItem): Promise<void> {
    if(!item) return
    if(!item.shoppinglist_id) return

    try {
      const request = await api.put(
        `/shoppinglist/${item.shoppinglist_id}/item/${item.id}/complete`, 
        {completed: !item.completed}
      )

      if(request.status == 200) {
        const itemIndex = items.value[item.shoppinglist_id].findIndex(i => i.id == item.id)
        items.value[item.shoppinglist_id][itemIndex].completed = !item.completed
      }


    } catch (err: any) {
      console.log(err)
    }
  }

  return { items, addItem, addItems, getItems, removeItem, loadItems, completeItem }
})
