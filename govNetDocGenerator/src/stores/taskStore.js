import { defineStore } from 'pinia'

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [
      {id: 1, title: "Memarts", isFav: false},
    ], 
    name: 'Raymond'
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
    // async createDoc(task) {
    //    this.tasks.push(task)

    //   const res = await fetch('http://localhost:8080/generate', {
    //   method: 'POST',
    //   body: JSON.stringify(task),
    //   headers: {'Content-Type':'application/json'}
    // })
    //   if (res.error){
    //     console.log(res.error)
    //   }
    // },

    // async uploadData(file, jsonData) {
    //   const formData = new FormData();
    //   formData.append("file", file);
    //   formData.append("data", jsonData);

    //   try {
    //     const response = await fetch("http://localhost:8080/generate", {
    //       method: "POST",
    //       body: formData,
    //     });

    //     const result = await response.json();
    //     console.log(result);
    //   } catch (error) {
    //     console.error("Error uploading data:", error);
    //   }
    // }
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
