import { defineStore } from 'pinia'

export const useDocumentStore = defineStore('documentStore', {
  state: () => ({
    tasks: [
      {id: 1, title: "Memarts", isFav: false},
    ], 
  }),
  getters: {
    favs() {
      return this.tasks.filter(t => t.isFav)
    },
    favCount() {
      return this.tasks.reduce((p, c) => {
        return c.isFav ? p + 1 : p
      }, 0)
    },
    totalCount: (state) => {
      return state.tasks.reduce(()=> {
        return state.tasks.length
      })
    }
  },
  actions: {
    async getFiles(){
      const res = await fetch('http://localhost:8000/generated-file')
      const data = await res.json()
    },
  },
    deleteTask(id){
      this.tasks = this.tasks.filter(t => {
        return t.id !== id})
    },
    toggleFav(id){
      const task = this.tasks.find(t => t.id === id)
         task.isFav = !task.isFav
    }
  })
