document.addEventListener('DOMContentLoaded', () => {
    // Select all subject cards
    const subjectCards = document.querySelectorAll('.subject-card');
    
    // Select the "Add File" button
    const addFileBtn = document.getElementById('addFileBtn');

    // Event listener for each subject card
    subjectCards.forEach(card => {
        card.addEventListener('click', () => {
            // Show the "Add File" button when a subject is clicked
            addFileBtn.style.display = 'block';
        });
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