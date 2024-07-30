<template>
  <main>
    <!-- <div class="data"> -->
    <!-- </div> -->
    <br />
    <br />
    <div class="card border rounded-lg shadow-lg">
      <div class="card-body p-4 text-sm bg-gray-50 rounded-lg">
        <table
          class="min-w-full divide-y divide-gray-200 bg-gray-50 table-fixed"
        >
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                File Name
              </th>
              <th
                class="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Reference Number
              </th>
              <th
                class="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <!-- Add some rows here to test -->
            <tr v-for="document in documents" :key="document.id">
              <td class="px-1 py-4 whitespace-nowrap">{{ document.name }}</td>
              <td class="px-1 py-4 whitespace-nowrap">{{ document.id }}</td>
              <td class="px-1 py-4 whitespace-nowrap">
                <!-- <button
                  class="bg-blue-500 text-white mr-2 px-4 py-2 rounded hover:bg-blue-600"
                >
                  Preview
                </button> -->
                <button
                @click="deleteDocument(document.id)"
                  class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <ul>
      <div class="task-list" v-if="filter === 'all'">
        <p>You have {{ taskStore.totalCount }} uploaded files</p>
        <li class="task-list" v-for="task in taskStore.tasks" :key="task.id">
          <TaskDetails :task="task" />
        </li>
      </div>
      <div class="task-list" v-if="filter === 'favs'">
        <p>You have {{ taskStore.favCount }} Generated PDFs.</p>
        <li class="task-list" v-for="task in taskStore.favs" :key="task.id">
          <!-- <TaskDetails :task="task" /> -->
          <div class="task">
            <h3>{{ task.title }}</h3>
            <div class="icons">
              <i class="material-icons" @click="taskStore.deleteTask(task.id)"
                >delete</i
              >

              <i
                class="material-icons"
                @click="taskStore.toggleFav(task.id)"
                :class="{ active: task.isFav }"
                >favorite</i
              >
              <button class="preview">Preview</button>
            </div>
          </div>
        </li>
      </div>
    </ul>
  </main>
</template>
  
  <script setup>
import { onMounted, ref } from "vue";
import { useToast } from "vue-toastification";

const toast = useToast();
const documents = ref([]);


const fetchDocuments = async () => {
  try {
    const response = await fetch("http://localhost:8000/documents");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    documents.value = data;
    // alert(JSON.stringify(data))

    console.log(response.data);
  } catch (error) {
    console.error(console.error("Error fetching documents:", error));
  }
};

// const deleteFile = (id) => {
//   documents.value = documents.value.filter((document) => 
//     document.id != id)
//     toast.success('document deleted.')
// }

const deleteDocument = async (id) => {
    const response = await fetch(`http://localhost:8000/documents/${id}`, {
      method: "DELETE"
    })  

    if (!response.ok){
      console.error("Error getting document.")
    }
    const data = await response.json()
    // alert(JSON.stringify(data))
    toast.success("Document deleted.")
    documents.value = documents.value.filter((document) => document.id != id)

  }

onMounted(() => {
  fetchDocuments();
});
</script>
  
  <style scoped>
main {
  margin-top: 30px;
  text-align: center;
  justify-content: center;
  align-items: center;
}
ul {
  display: none;
}
</style>
  
  