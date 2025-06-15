
// Elementos do DOM
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const filterBtns = document.querySelectorAll('.filter-btn');
const totalTasksSpan = document.getElementById('totalTasks');
const completedTasksSpan = document.getElementById('completedTasks');

// Array para armazenar tarefas
let tasks = [];

// Adicionar tarefa
function addTask() {
  const taskText = taskInput.value.trim();
  
  if (taskText === '') {
    alert('Por favor, digite uma tarefa!');
    return;
  }

  const task = {
    id: Date.now(),
    text: taskText,
    completed: false
  };

  tasks.push(task);
  taskInput.value = '';
  renderTasks();
  updateStats();
}

// Renderizar tarefas
function renderTasks(filter = 'all') {
  taskList.innerHTML = '';

  let filteredTasks = tasks;

  if (filter === 'pending') {
    filteredTasks = tasks.filter(task => !task.completed);
  } else if (filter === 'completed') {
    filteredTasks = tasks.filter(task => task.completed);
  }

  filteredTasks.forEach(task => {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    
    li.innerHTML = `
      <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} 
             onchange="toggleTask(${task.id})">
      <span class="task-text">${task.text}</span>
      <button class="delete-btn" onclick="deleteTask(${task.id})">Excluir</button>
    `;
    
    taskList.appendChild(li);
  });
}

// Alternar status da tarefa
function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    renderTasks();
    updateStats();
  }
}

// Deletar tarefa
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  renderTasks();
  updateStats();
}

// Atualizar estatísticas
function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  
  totalTasksSpan.textContent = total;
  completedTasksSpan.textContent = completed;
}

// Event Listeners
addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderTasks(btn.dataset.filter);
  });
});

// Inicializar
renderTasks();
updateStats();