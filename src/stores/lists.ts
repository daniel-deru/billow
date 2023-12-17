import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface IList {
  name: string,
  date: number,
  id: string 
}

export const useListsStore = defineStore('lists', () => {
  const lists = ref<IList[]>([])
  
  function addList(list: IList){
    lists.value.push(list)
  }

  function loadLists(newLists: IList[]){
    lists.value.push(...newLists)
  }

  return { lists, addList, loadLists }
})
