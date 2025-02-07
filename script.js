document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('fileModal');
    const addBtn = document.getElementById('addFileBtn');
    const span = document.getElementsByClassName('close')[0];

    // Mock subjects - you can add more
    const subjects = ['Math', 'Science', 'History'];
    const subjectsContainer = document.getElementById('subjectsContainer');
    
    subjects.forEach(subject => {
        const subjectCard = document.createElement('div');
        subjectCard.className = 'subject-card';
        subjectCard.innerHTML = `
            <h3>${subject}</h3>
            <div class="files-list" id="${subject.toLowerCase()}Files"></div>
        `;
        subjectsContainer.appendChild(subjectCard);
    });

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
            subject: document.getElementById('fileSubject').value,
            date: document.getElementById('fileDate').value,
            file: document.getElementById('fileUpload').files[0]
        };

        addFileToSubject(fileData);
        modal.style.display = 'none';
    };
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