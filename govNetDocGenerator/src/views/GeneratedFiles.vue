<template>
    <main>
      <div class="data-retrieval">
      <div
        class=" p-6 max-w-md mx-auto bg-gray-50 rounded-lg shadow-md"
      >
        <h3 class="text-2xl font-semibold text-gray-800 mb-4">
          Retrieve your PDF Documents
        </h3>
        <p class="text-gray-600 mb-6">Enter the document's reference number.</p>
        <input
          type="text"
          v-model="referenceNumber"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Reference Number"
        />
        <button
          @click="getDocument"
          class="w-1/5 bg-blue-500 text-white py-1 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </div>
  
      <div v-if="document" class="mt-4">
        <div class="text-lg font-medium text-gray-700">Document Details:</div>
        <p>{{ document.name }}</p>
        <p>{{ document.id }}</p>
        <button
          @click="togglePreview"
          class="btn border border-black p-1 bg-gray-300 text-gray-800 py-1 rounded-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          {{ showPreview ? "Close Preview" : "Show Preview" }}
        </button>

        <!-- Preview PDF and download link -->
        <div v-if="showPreview" class="pdfPreview">
            <div class="pdfContainer border border-gray-300 rounded-lg overflow-hidden">
        <iframe :src="pdfUrl" frameborder="0" class="h-96"></iframe>
      </div>
      <br>
          <a
          style="text-decoration: none;"
            :href="pdfUrl"
            class="text-black-500 p-1 rounded-md border border-red-500 hover:underline"
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
  const referenceNumber = ref("");
  const document = ref(null);
  const pdfUrl = ref(""); // Ensure consistent naming
  const showPreview = ref(false);
  
  const togglePreview = () => {
    showPreview.value = !showPreview.value;
  };
  
  const getDocument = async () => {
    try {
    //   alert("data");
      const response = await fetch(
        `http://localhost:8000/documents/${referenceNumber.value}`
      );
      if (!response.ok) {
        throw new Error("Could not retrieve the document");
      }
      const data = await response.json();
      document.value = data;

    //   alert(JSON.stringify(data))

      // Assuming the PDF base64 string is in data.data
    const base64String = data.data;
    //   const base64String = data.pdf;        
  
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
      console.error("Error fetching document:", error);
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
  .generated-files {
    margin-top: 30px;
  }
  input {
    border-radius: 4px;
  }
  
.pdfPreview {
  text-align: center;
  margin-top: 20px;
  /* border: 1px solid black; */
  padding: 3px;
}

.data-retrieval {
 align-items: center;
 display: flex;
 flex-direction: column;
}

/* .preview{
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
  </style>
  