document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('fileModal');
    const uploadStep = document.getElementById('uploadStep');
    const detailsStep = document.getElementById('detailsStep');
    const closeModal = document.getElementsByClassName('close')[0];
    const addFileBtn = document.getElementById('addFileBtn');
  
    // When the user clicks the add file button, open the modal
    addFileBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });
    
    // When the user clicks the close button, hide the modal
    closeModal.onclick = () => modal.style.display = 'none';
    window.onclick = (event) => {
        if (event.target == modal) modal.style.display = 'none';
    }
    
    // Display selected file name when a file is chosen
    document.getElementById('fileUploadInput').addEventListener('change', function() {
      const selectedFile = this.files[0];
      if (selectedFile) {
        document.getElementById('selectedFileName').textContent = selectedFile.name;
      }
    });
    
    // When the Upload File button is clicked
    document.getElementById('uploadFileBtn').addEventListener('click', () => {
      const fileInput = document.getElementById('fileUploadInput');
      if (fileInput.files.length === 0) {
        alert("Please select a file first!");
        return;
      }
      
      // Here you would typically handle the file upload (e.g., via AJAX)
      // For demonstration, we simulate an upload delay:
      setTimeout(() => {
        // Assume upload is successful. Now show the details section.
        uploadStep.style.display = 'none';
        detailsStep.style.display = 'block';
      }, 1000);
    });
    
    // Handle submission of the file details form
    document.getElementById('fileDetailsForm').addEventListener('submit', (e) => {
      e.preventDefault();
      
      const fileData = {
        name: document.getElementById('fileName').value,
        type: document.getElementById('fileType').value,
        date: document.getElementById('fileDate').value
        // Note: the actual file is already handled in the first step
      };
      
      // Save fileData or perform any further processing
      console.log("File details submitted:", fileData);
      
      // Optionally, clear the form or reset modal states
      detailsStep.style.display = 'none';
      uploadStep.style.display = 'block';
      modal.style.display = 'none';
    });
});


function saveFile(subject, fileData) {
    const files = JSON.parse(localStorage.getItem(subject)) || [];
    files.push(fileData);
    localStorage.setItem(subject, JSON.stringify(files));
}

function loadFiles(subject) {
    const files = JSON.parse(localStorage.getItem(subject)) || [];
    const fileList = document.getElementById('fileList');
    fileList.innerHTML = '';

    files.forEach(file => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <div>
                <strong>${file.name}</strong><br>
                <span>${file.date} • ${file.type.toUpperCase()}</span>
            </div>
            <span class="file-icon">${getFileIcon(file.type)}</span>
        `;
        fileList.appendChild(fileItem);
    });
}

function getFileIcon(type) {
    const icons = {
        'doc': '📄',
        'ppt': '📊',
        'xls': '📈',
        'other': '📁'
    };
    return icons[type] || '📁';
}