const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const counter = document.getElementById('counter');

var taskCtr = 0;
var taskArray = [];

taskForm.addEventListener('submit', addTask);

function addTask(event){
    event.preventDefault()
    const taskText = taskInput.value.trim();
    
    if(taskText !== ""){
        const taskItem = document.createElement('li');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const btn = document.createElement('button');
        const btnText = document.createTextNode('X');
        const spanText = document.createTextNode(taskText);
        input.type = 'checkbox';
        input.id = 'taskCheck';
        input.setAttribute('class','mr-2 ml-3');
        span.id = taskText;
        span.contentEditable = 'true';
        span.setAttribute('class','task-text');
        btn.id = 'delete-btn';
        btn.setAttribute('class', 'bg-red-600 m-2 px-2 rounded-full text-xs text-gray-300');
        btn.appendChild(btnText);
        span.appendChild(spanText);
        taskList.append(taskItem);
        taskItem.appendChild(input);
        taskItem.appendChild(span);
        taskItem.appendChild(btn);
       
        taskInput.value = "";
        taskCtr++;
        counter.innerHTML = `Total Tasks: ${taskCtr}`;
       
        const deleteBtn = taskItem.querySelector('#delete-btn');
        deleteBtn.addEventListener('click', deleteTask);

        const checkBx = taskItem.querySelector('#taskCheck');
        checkBx.addEventListener('click', crossTask);      
    }

    function crossTask(event){
        const textCheck = event.target.parentElement;
        textCheck.style.textDecoration = 'line-through';
    }

    function deleteTask(event){
        const taskItem = event.target.parentElement;
        taskList.removeChild(taskItem);
        taskCtr--;
        counter.innerHTML = `Total Tasks: ${taskCtr}`;      
    }

}

const saveButton = document.getElementById('saveButton');
saveButton.addEventListener('click', saveList);

function saveList(){
    
    const allTasks = document.querySelectorAll('#taskList li span');
    let i=0;
    allTasks.forEach(element => {
        taskArray[i] = element.textContent;
        i++;
    });

    let taskString = JSON.stringify(taskArray);
    localStorage.setItem('tString', taskString);
    
}

function loadList(){
    const loadArray = JSON.parse(localStorage.getItem('tString'));
    if(loadArray !== null){
        for(let i=0; i<loadArray.length; i++){
            loadTasks(loadArray[i]);
        }
    }
    
}

function loadTasks(i){
    const taskItem = document.createElement('li');

    taskItem.innerHTML = `
    <input type="checkbox" id = 'taskCheck' class = 'mr-2 ml-3'/><span contentEditable="true" class="task-text">${i}</span>
    <button id = 'delete-btn' class ='bg-red-600 m-2 px-2 rounded-full text-xs text-gray-300'>X</button>`;

    taskList.append(taskItem);
    taskArray[taskCtr]=i;
    taskInput.value = "";
    taskCtr++;
    counter.innerHTML = `Total Tasks: ${taskCtr}`;
       
    const deleteBtn = taskItem.querySelector('#delete-btn');
    deleteBtn.addEventListener('click', deleteTask);

    const checkBx = taskItem.querySelector('#taskCheck');
    checkBx.addEventListener('click', crossTask);
    
    function crossTask(event){
        const textCheck = event.target.parentElement;
        textCheck.style.textDecoration = 'line-through';  
    }
    
    function deleteTask(event){
        const taskItem = event.target.parentElement;
        taskList.removeChild(taskItem);
        taskCtr--;
        counter.innerHTML = `Total Tasks: ${taskCtr}`;
        
    }
}

const clearAll = document.getElementById('clearAll');
clearAll.addEventListener('click', deleteAll);

function deleteAll(){
    let response = confirm('Are you sure you want to delete all tasks?');
    if (response) {
        taskList.innerHTML='';
        taskCtr=0;
        counter.innerHTML = `Total Tasks: ${taskCtr}`;
        localStorage.clear();
    } else {
        return;
    }
}

const taskFilter = document.getElementById('taskFilter');
taskFilter.addEventListener('input', filterFunction);
    
function filterFunction() {
    const filterText = taskFilter.value.toLowerCase();
    const tasks = taskList.querySelectorAll('li');

    tasks.forEach(task => {
        const taskTxt = task.querySelector('.task-text').textContent.toLowerCase();
        if (taskTxt.includes(filterText)){
            task.style.display = '';
        } else {
            task.style.display = 'none';
        }
    });
};
