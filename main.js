const searchIcon = document.querySelector('.search-icon');
const searchInput = document.getElementById('search-input');

// Fonction pour la recherche
function filterTasks(searchText) {
    const tasks = document.querySelectorAll('#list-container li');
    const searchLower = searchText.toLowerCase();
    
    tasks.forEach(task => {
        const taskText = task.querySelector('.task-text').textContent.toLowerCase();
        const taskDesc = task.querySelector('.task-description')?.textContent.toLowerCase() || '';
        
        if (taskText.includes(searchLower) || taskDesc.includes(searchLower)) {
            task.style.display = '';
        } else {
            task.style.display = 'none';
        }
    });
    
}