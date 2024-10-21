const inputTask = document.querySelector('.input');
const addButton = document.querySelector('.add-button');
const taskList = document.querySelector('.tasks');

function makeTask(string) {
	let li = document.createElement('li');
	const text = document.createElement('p');
	const deleteButton = document.createElement('button');
	const checkButton = document.createElement('button');
	const stringTest = string.trim();

	if (stringTest === '') {
		alert('Por favor, insira letras nas tarefas');
		cleanInput(); 

		return;
	};

	text.textContent = string;
	li.appendChild(text);
	taskList.appendChild(li); 

	deleteButton.textContent = 'remove';
	deleteButton.setAttribute('class', 'del-button');
	deleteButton.setAttribute('title', 'delete this task');
	li.appendChild(deleteButton);

	checkButton.textContent = 'check';
	checkButton.setAttribute('class', 'check-button');
	checkButton.setAttribute('title', 'edit this botton');
	li.appendChild(checkButton);
	cleanInput();
	saveTask();
};

addButton.addEventListener('click', function(event) {
	if(!inputTask.value) return;

	makeTask(inputTask.value);
});

inputTask.addEventListener('keypress', function(event) {
	let keyCodeEvent = event.keyCode === 13;

	if(keyCodeEvent) {
		if(!inputTask.value) return;

		makeTask(inputTask.value);
	};
});

function cleanInput() {
	inputTask.value = '';
	inputTask.focus();
};

document.addEventListener('click', function(event) {
	const li = event.target;
	
	if(li.classList.contains('del-button')) {
		li.parentElement.remove();
		saveTask();
	}
	else if(li.classList.contains('check-button')) {

		if(li.parentElement.children[2].textContent === 'check'){
			li.parentElement.children[2].textContent = 'cheked';
			li.parentElement.children[0].style.textDecoration = "line-through";
		}
		else {
			li.parentElement.children[2].textContent = 'check';
			li.parentElement.children[0].style.textDecoration = "none";
		};
		
	};
});

function saveTask() {
	const liTasks = taskList.querySelectorAll('p');
	const listaDeTarefas = [];

	for (let tarefa of liTasks) {
		let tarefaTexto = tarefa.innerText;
		listaDeTarefas.push(tarefaTexto);
	};
	const tarefasJSON = JSON.stringify(listaDeTarefas);
	localStorage.setItem('tarefas', tarefasJSON); 
};

function addTaskSaved() {
	const tarefas = localStorage.getItem('tarefas');
	const listaDeTarefas = JSON.parse(tarefas);

	for (let tarefa of listaDeTarefas){
		makeTask(tarefa);
	};
};
addTaskSaved();
