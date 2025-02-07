// Keep only the DOMContentLoaded event listener if needed
document.addEventListener('DOMContentLoaded', () => {
    // Any initialization code for the homepage
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