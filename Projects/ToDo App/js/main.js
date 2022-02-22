
const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');

const todoItemsList = document.querySelector('.todo-items');
let todos = [];
todoForm.addEventListener('submit', function(event) {
  event.preventDefault();
  addTodo(todoInput.value); 
});

function addTodo(item) {
 
  if (item !== '') {
   
    const todo = {
      id: Date.now(),
      name: item,
      completed: false
    };

    todos.push(todo);
    addToLocalStorage(todos); 
    todoInput.value = '';
  }

}


function renderTodos(todos) {

  todoItemsList.innerHTML = '';

  todos.forEach(function(item) {
   
    const checked = item.completed ? 'checked': null;

    const li = document.createElement('li');
    li.setAttribute('class', 'item');
   
    li.setAttribute('data-key', item.id);
  
    if (item.completed === true) {
      li.classList.add('checked');
    }
li.innerHTML = `
      <input type="checkbox" class="checkbox" ${checked}>
      ${item.name}
	  <button class="delete-button">➖</button>
	  
    `;
    todoItemsList.append(li);
  });
}
function addToLocalStorage(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos(todos);
}
function getFromLocalStorage() {
  const reference = localStorage.getItem('todos');
 
  if (reference) {
    
    todos = JSON.parse(reference);
    renderTodos(todos);
  }
}

function toggle(id) {
  todos.forEach(function(item) {
    
    if (item.id == id) {
      
      item.completed = !item.completed;
    }
  });
addToLocalStorage(todos);
}

function deleteTodo(id) {

  todos = todos.filter(function(item) {
    return item.id != id;
  });


  addToLocalStorage(todos);
}

getFromLocalStorage();
todoItemsList.addEventListener('click', function(event) {
  if (event.target.type === 'checkbox') {
    toggle(event.target.parentElement.getAttribute('data-key'));
  }
  if (event.target.classList.contains('delete-button')) {
    deleteTodo(event.target.parentElement.getAttribute('data-key'));
  }
});

var editTask=function(){
console.log("Edit Task...");
console.log("Change 'edit' to 'save'");


var listItem=this.parentNode;

var editInput=listItem.querySelector('input[type=text]');
var label=listItem.querySelector("label");
var containsClass=listItem.classList.contains("editMode");
		//If class of the parent is .editmode
		if(containsClass){

		//switch to .editmode
		//label becomes the inputs value.
			label.innerText=editInput.value;
		}else{
			editInput.value=label.innerText;
		}

		//toggle .editmode on the parent.
		listItem.classList.toggle("editMode");
}