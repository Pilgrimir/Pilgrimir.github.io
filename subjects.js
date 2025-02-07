document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('fileModal');
    const addBtn = document.getElementById('addFileBtn');
    const span = document.getElementsByClassName('close')[0];
    const fileList = document.getElementById('fileList');
    const subjectTitle = document.getElementById('subjectTitle');

    // Get the subject from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const subject = urlParams.get('subject');
    subjectTitle.textContent = subject;

    // Load files for this subject
    loadFiles(subject);

    // Modal controls
    addBtn.onclick = () => modal.style.display = 'block';
    span.onclick = () => modal.style.display = 'none';
    window.onclick = (event) => {
        if (event.target == modal) modal.style.display = 'none';
    }

    // Form submission
    document.getElementById('fileForm').onsubmit = (e) => {
        e.preventDefault();
        
        const fileData = {
            name: document.getElementById('fileName').value,
            type: document.getElementById('fileType').value,
            date: document.getElementById('fileDate').value,
            file: document.getElementById('fileUpload').files[0]
        };

        saveFile(subject, fileData);
        loadFiles(subject);
        modal.style.display = 'none';
    };
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