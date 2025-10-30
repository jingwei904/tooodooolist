const inputText = document.getElementById('input-text');
const listContainer = document.getElementById('list-container');
const taskCount = document.getElementById('task-count');
const completeSound = new Audio('complete-sound.mp3');
const popAddSound = new Audio('pop-add-sound.mp3');
const popEndSound = new Audio('pop-end-sound.mp3');

function AddTask() {
    if (inputText.value == ''){
        alert("You must write a task!");
    }
    else {
        let li = document.createElement('li');
        li.innerHTML = inputText.value;
        let span = document.createElement('span');
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        li.classList.add('appear-init');
        listContainer.appendChild(li);
        void li.offsetWidth; //reflow so transition occur
        li.classList.add('appear'); 
        popAddSound.play();
        updateTaskCount();
    }
    inputText.value = '';
    saveData();
}

listContainer.addEventListener('click', function(e){
    if(e.target.tagName === 'LI'){
        e.target.classList.toggle('checked');
        if (e.target.classList.contains('checked')){
            completeSound.play();
        }
        updateTaskCount();
        saveData();
    }
    else if(e.target.tagName === 'SPAN'){
        e.target.parentElement.classList.add('disappear');
        popEndSound.play();
        e.target.parentElement.addEventListener('transitionend', () =>{
            e.target.parentElement.remove();
            updateTaskCount();
            saveData();
        }, {once: true})
        
    }
}, false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
updateTaskCount();
showTask();

function updateTaskCount() {
    const totalTasks = listContainer.querySelectorAll('li:not(.disappear)').length;
    const checkedTasks = listContainer.querySelectorAll('.checked:not(.disappear)').length;
    const remainingTasks = totalTasks - checkedTasks;
    taskCount.textContent = remainingTasks + ' task' + (remainingTasks > 1 ? 's' : '') + ' remaining';
}