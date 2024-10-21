const inputTask = document.querySelector('.input');
const addButton = document.querySelector('.add-button');
const taskList = document.querySelector('.tasks');

// cria os botoes e os li's com as tasks
function makeTask(string) {
	let li = document.createElement('li');
	const text = document.createElement('p');
	text.textContent = string;
	li.appendChild(text);

	taskList.appendChild(li); 
	const deleteButton = document.createElement('button');
	deleteButton.textContent = 'remover';
	deleteButton.setAttribute('class', 'del-button');
	deleteButton.setAttribute('title', 'delete this task');
	li.appendChild(deleteButton);
	const checkButton = document.createElement('button');
	checkButton.textContent = 'check';
	checkButton.setAttribute('class', 'check-button');
	checkButton.setAttribute('title', 'editar esse botao');
	li.appendChild(checkButton);
	cleanInput();
	saveTask();
};

// recebe evento do botao adicionar
addButton.addEventListener('click', function(event) {
	if(!inputTask.value) return;

makeTask(inputTask.value);
});

// cria a funcionalidade que permite a chamada da funcao maker a partir do enter
inputTask.addEventListener('keypress', function(event) {
	if(event.keyCode === 13) {
		if(!inputTask.value) return;
		makeTask(inputTask.value);
	};
});

// cria a funcao de limpar o input
function cleanInput() {
	inputTask.value = '';
	inputTask.focus();
	console.log(inputTask.value);
}

// faz a remocao e chagem de cada list
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
			console.log('Nao checado', li.parentElement.children[2].textContent);
			li.parentElement.children[2].textContent = 'check';
			li.parentElement.children[0].style.textDecoration = "none";
		};
		
	};
});

// salva tudo no localStorage do navegador
function saveTask() {
	const liTasks = taskList.querySelectorAll('li');
	const listaDeTarefas = [];

	for (let tarefa of liTasks) {
		let tarefaTexto = tarefa.innerText;
		tarefaTexto = tarefaTexto.replace('remover', '').trim();
		listaDeTarefas.push(tarefaTexto);
	};

	const tarefasJSON = JSON.stringify(listaDeTarefas);
	localStorage.setItem('tarefas', tarefasJSON); 
};
// adiciona as tasks salvas no make dnv
function addTaskSaved() {
	const tarefas = localStorage.getItem('tarefas');
	const listaDeTarefas = JSON.parse(tarefas);

	for (let tarefa of listaDeTarefas){
		makeTask(tarefa);
	};
};
addTaskSaved();