import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/config/axios'


export interface IList {
  name: string,
  date: number,
  id?: string
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

  function getList(listId: string){
    const list: IList = lists.value.filter(list => list.id == listId)[0]
    return list
  }

  function deleteList(listId: string | undefined): void {
    if(listId) {
      lists.value = lists.value.filter(listItem => listItem.id != listId)
    }
  }

  return { lists, addList, loadLists, getList, deleteList }
})
