document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('fileModal');
    const uploadStep = document.getElementById('uploadStep');
    const detailsStep = document.getElementById('detailsStep');
    const closeModal = document.getElementsByClassName('close')[0];
    
    // When the user clicks the close button, hide the modal
    closeModal.onclick = () => modal.style.display = 'none';
    window.onclick = (event) => {
        if (event.target == modal) modal.style.display = 'none';
    }
    
    // When the Upload File button is clicked
    document.getElementById('uploadFileBtn').addEventListener('click', () => {
      const fileInput = document.getElementById('fileUploadInput');
      if (fileInput.files.length === 0) {
        alert("Please select a file first!");
        return;
      }
      
      // Here you would typically handle the file upload (e.g., via AJAX)
      // For demonstration purposes, we simply simulate an upload delay:
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

function addFileToSubject(fileData) {
    const subjectFiles = document.getElementById(`${fileData.subject.toLowerCase()}Files`);
    if (!subjectFiles) return;

    const fileEntry = document.createElement('div');
    fileEntry.className = 'file-entry';
    fileEntry.innerHTML = `
        <div>
            <strong>${fileData.name}</strong><br>
            <span>${fileData.date} • ${fileData.type.toUpperCase()}</span>
        </div>
        <span class="file-icon">${getFileIcon(fileData.type)}</span>
    `;

    subjectFiles.appendChild(fileEntry);
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