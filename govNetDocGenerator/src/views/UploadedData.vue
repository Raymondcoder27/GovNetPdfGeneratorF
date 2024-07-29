<template>
  <main>
    <!-- <div class="data"> -->
    <!-- </div> -->
    <br />
    <br />
    <div class="card">
      <div class="card-body" style="font-size: 14px">
        <!-- <div class="ms-auto btn btn-primary text-light" @click="addProduct" >
    Add Product
  </div> --><a
          href="/add-product"
          class="btn btn-primary btn-block text-light"
          style="font-size: 15px"
          >Add Product</a
        ><!-- <h1 class = "text-center"> Products List</h1> --><!-- <router-link to="/product-variations">Product Variations</router-link><br> -->
        <table class="table table-striped text-center">
          <thead>
            <tr>
              <th>File Name</th>
              <th>Reference Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody></tbody>
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
  
  