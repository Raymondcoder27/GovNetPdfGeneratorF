<template>
  <main>
    <div>
      <!-- Form to upload file and JSON data -->
      <div class="dataUploadForm">
        <div class="upload">
          <div class="template">
            <h4>Upload Template File</h4>
            <input type="file" @change="handleFileUpload" />
          </div>
          <div class="json">
            <h4>Insert JSON Data</h4>
            <textarea
              v-model="jsonInput"
              placeholder="Enter JSON here..."
            ></textarea>
          </div>
        </div>
        <button class="submitt" @click="dataUpload">
            Upload
          </button>
          <br>
          <!-- Toggle Preview Button -->
        <button v-if="pdfUrl" @click="togglePreview">
          {{ showPreview ? 'Close Preview' : 'Show Preview' }}
        </button>
         <!-- Preview PDF and download link -->
         <div v-if="showPreview" class="pdfPreview">
          <div class="pdfContainer">
            <iframe :src="pdfUrl" frameborder="0"></iframe>
          </div>
          <br>
          <a :href="pdfUrl" class="download" download="document.pdf">Download PDF</a>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "@/stores/taskStore";
const showPreview = ref(false); // State to track visibility of the preview

const taskStore = useTaskStore();
const jsonInput = ref("");
const file = ref(null);
const pdfUrl = ref(null);

function handleFileUpload(event) {
  file.value = event.target.files[0];
}

async function dataUpload() {
  if (file.value) {
    try {
      const formData = new FormData();
      formData.append("file", file.value);
      formData.append("data", jsonInput.value);

      const response = await fetch("http://localhost:8080/generate", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const base64String = data.pdf;

      // Convert base64 to a Blob
      const byteCharacters = atob(base64String);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });

      // Create a URL for the Blob and set it to pdfUrl
      pdfUrl.value = URL.createObjectURL(blob);
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  } else {
    console.error("No file selected");
  }
}

function togglePreview() {
  showPreview.value = !showPreview.value; // Toggle the preview visibility
}
</script>

<style scoped>
main {
  margin-top: 30px;
  text-align: center;
  justify-content: center;
  align-items: center;
}

.dataUploadForm {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pdfPreview {
  text-align: center;
  margin-top: 20px;
}

/* .previews{
  display: flex;
  text-align: center;
} */

.pdfContainer {
  position: relative;
  width: 100%;
 width: 600px; /* Adjust this width as needed */
  height: 700px; /* Fixed height for the preview */
}

.pdfContainer iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}
.download{
  background: #fa3b10;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  padding: 4px;
}
</style>