import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/config/axios'


export interface IList {
  name: string,
  date: number,
  id?: number
}

export const useListsStore = defineStore('lists', () => {
  const lists = ref<IList[]>([])
  
  function addList(list: IList){
    lists.value.push(list)
  }

  async function loadLists(): Promise<void> {

    if(lists.value.length <= 0) {
      console.log("Getting Lists from Server")

      const request = await api.get("/shoppinglist")

      if(request.status == 200) {
          lists.value = request.data
      }
    }    
  }

  async function getList(listId: number){
    const list: IList[] = lists.value.filter(list => list.id == listId)

    if(list.length <= 0) {
      try {
        const request = await api.get(`/shoppinglist/${listId}`)

        if(request.status == 200) {
          lists.value.push(request.data)
        }

        return request.data

      } catch (err: any) {
          console.log(err.response.data)
      }
    } 
    return list[0]
  }

  async function deleteList(listId: number | undefined): Promise<void> {
    if(!listId) return

    try {
      const request = await api.delete(`/shoppinglist/${listId}`)

      if(request.status == 200) {
        lists.value = lists.value.filter(listItem => listItem.id != listId)
      }

    } catch (err: any) {
        console.log(err.response.data)
    }
  }

  return { lists, addList, loadLists, getList, deleteList }
})
