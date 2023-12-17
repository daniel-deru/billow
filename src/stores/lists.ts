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

  function getList(listId: string){
    const list: IList = lists.value.filter(list => list.id == listId)[0]
    return list
  }

  return { lists, addList, loadLists, getList }
})
