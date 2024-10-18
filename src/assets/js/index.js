const inputTask = document.querySelector('.input');
const addButton = document.querySelector('.add-button'); 
const taskList = document.querySelector('.tasks'); 

function cleanInput() {
	inputTask.value = '';
	inputTask.focus(); 
	console.log(inputTask.value);
}

function buidRemoveBotton(li) {
	li.innerText += ' ';
	const deleteButton = document.createElement('button'); 
	deleteButton.innerText = 'remover';
	deleteButton.setAttribute('class', 'del-button');
	deleteButton.setAttribute('title', 'delete this task');
	li.appendChild(deleteButton);
}

function makeTask(string) { 
	const li = document.createElement('li');
	li.innerText = string;
	taskList.appendChild(li); 
	cleanInput();
	buidRemoveBotton(li);
	saveTask(); 
};

inputTask.addEventListener('keypress', function(event) {
	if(event.keyCode === 13) {
		if(!inputTask.value) return; 
		makeTask(inputTask.value); 
	};
});

addButton.addEventListener('click', function(event) {
	if(!inputTask.value) return; 

makeTask(inputTask.value); 
});

document.addEventListener('click', function(event) {
	const el = event.target; 
	
	if(el.classList.contains('del-button')) {
		el.parentElement.remove();
		saveTask();
	}
});

function saveTask() {
	const liTarefas = taskList.querySelectorAll('li');
	const listaDeTarefas = [];

	for (let tarefa of liTarefas ) {
		let tarefaTexto = tarefa.innerText;
		tarefaTexto = tarefaTexto.replace('remover', '').trim();
		listaDeTarefas.push(tarefaTexto);
	}

	const tarefasJSON = JSON.stringify(listaDeTarefas);
	localStorage.setItem('tarefas', tarefasJSON); 
}

function addTaskSaved() {
	const tarefas = localStorage.getItem('tarefas'); 
	const listaDeTarefas = JSON.parse(tarefas);

	for (let tarefa of listaDeTarefas){
		makeTask(tarefa);
	}
}
addTaskSaved(); 