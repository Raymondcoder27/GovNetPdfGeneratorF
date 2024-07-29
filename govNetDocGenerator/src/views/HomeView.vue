<template>
  <main>
    <!-- <header class="header2">
    <div class="new-task">
      <NewTask />
    </div>
   </header> -->

    <!-- <nav class="filter">
      <button @click="filter = 'all'">Data Upload</button>
      <button @click="filter = 'favs'">Generated PDF files</button>
    </nav> -->

    <br />
    <br />
    <!-- <div class="data"> -->
    <form class="dataUploadForm" @submit.prevent="dataUpload">
      <div class="upload">
        <div class="template">
          <h3>Upload Template File</h3>
          <input
            type="file"
            ref="file"
            name="file"
            placeholder="Template File"
          />
        </div>
        <br />
        <br />
        <div class="json">
          <h3>Insert JSON Data</h3>
          <!-- <input type=" " placeholder="Insert Json"> -->
          <!-- <form class="form" @submit.prevent="handleSubmit"> -->
          <textarea
            type="text"
            v-model="jsonInput"
            placeholder="Insert Json"
          ></textarea>
          <!-- </form> -->
          <br />
        </div>
      </div>
      <button class="submitt" type="submit">Submit</button>
    </form>

    <!-- </div> -->
    <br />
    <br />
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
import axios from "axios";
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
  text-align: center;
  justify-content: center;
  align-items: center;
}
ul{
  display: none;
}
main .upload .form {
  width: 200px;
}
</style>

