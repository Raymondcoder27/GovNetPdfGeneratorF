<template>
  <main>
    <div class="p-6 max-w-3xl mx-auto bg-gray-50 rounded-lg shadow-md">
  <!-- Form to upload file and JSON data -->
  <div class="dataUploadForm space-y-6">
    <div class="upload flex flex-col space-y-4">
      <div class="template">
        <h4 class="text-xl font-semibold text-gray-800">Upload Template File</h4>
        <input type="file" @change="handleFileUpload" class="w-full py-2 px-4 border border-gray-300 rounded-lg bg-white"/>
      </div>
      <div class="json">
        <h4 class="text-xl font-semibold text-gray-800">Insert JSON Data</h4>
        <textarea
          v-model="jsonInput"
          placeholder="Enter JSON here..."
          class="w-full h-40 py-2 px-4 border border-gray-300 rounded-lg bg-white resize-none"
        ></textarea>
      </div>
    </div>
    <button
      class=" bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      @click="dataUpload"
    >
      Upload
    </button>
    <!-- Toggle Preview Button -->
    <button
      v-if="pdfUrl"
      @click="togglePreview"
      class=" btn border border-black p-1 bg-gray-300 text-gray-800 py-1 rounded-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
    >
      {{ showPreview ? 'Close Preview' : 'Show Preview' }}
    </button>
    <!-- Preview PDF and download link -->
    <div v-if="showPreview" class="pdfPreview space-y-4">
      <div class="pdfContainer border border-gray-300 rounded-lg overflow-hidden">
        <iframe :src="pdfUrl" frameborder="0" class="h-96"></iframe>
      </div>
      <a
        :href="pdfUrl"
        class="text-blue-500 hover:underline"
        download="document.pdf"
      >
        Download PDF
      </a>
    </div>
  </div>
</div>

  </main>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "@/stores/taskStore";
import { useToast } from "vue-toastification"
const showPreview = ref(false); // State to track visibility of the preview

const taskStore = useTaskStore();
const jsonInput = ref("");
const file = ref(null);
const pdfUrl = ref(null);
const toast = useToast();

    // const showToast = () => {
    //   toast.success('This is a success message!');
    // };


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
      jsonInput.value = ""
      file.value = ""
      toast.success('PDF generated successfully,   ref no:2343d!');
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
  border: 1px solid black;
  padding: 3px;
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
  background: rgba(255, 0, 0, 0.838);
  color: white;
  text-decoration: none;
  border-radius: 4px;
  padding: 4px;
}
</style>