<template>
  <main>
    <!-- <div class="data"> -->
    <!-- </div> -->
    <br />
    <br />
    <div class="card border rounded-lg shadow-lg">
  <div class="card-body p-4 text-sm">
    <table class="min-w-full divide-y divide-gray-200 bg-white table-fixed">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">File Name</th>
          <th class="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Reference Number</th>
          <th class="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <!-- Add some rows here to test -->
        <tr>
          <td class="px-1 py-4 whitespace-nowrap">Sample File</td>
          <td class="px-1 py-4 whitespace-nowrap">123456</td>
          <td class="px-1 py-4 whitespace-nowrap">
            <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">View</button>
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
//  import Counter from '@/components/Counter.vue';
// import axios from "axios";
// import NewTask from "@/components/NewTask.vue";
import TaskDetails from "@/components/TaskDetails.vue";
import { useTaskStore } from "@/stores/taskStore";
import { ref } from "vue";

const taskStore = useTaskStore();
const filter = ref("all");
const jsonInput = ref("");

const dataUpload = async () => {
  const fileInput = document.querySelector('input[type="file"]');
  const file = fileInput.files[0];

  if (!file) {
    console.error("No file selected");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("data", jsonInput.value);

  try {
    const response = await axios.post(
      "http://localhost:8080/generate",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(response.data);
  } catch (error) {
    console.error(
      "Error uploading data:",
      error.response ? error.response.data : error.message
    );
  }
};
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
  
  