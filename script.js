let createBtn = document.getElementById('textBtn');
let findBtn = document.getElementById('findBtn');
let input = document.getElementById('textInput');

class TodoList {
    constructor(el) {
        this.todos = [];
        this.el = el;
        this.el.addEventListener('click', (e) => this.submitClick(e));
    }
    addTodo(value) {
        this.todos.push(value);
        this.render();
    }
    removeTodo(id) {
        this.todos = this.todos.filter((el) => {
            return el.id !== id;
        });
        let task = document.querySelector(`[data-id="${id}"]`);
        task.remove();
    }
    getTodos() {
        return this.todos;
    }
    setTodos(todos) {
        this.todos = todos;
    }
    changeStatus(id) {
        let index = this.todos.findIndex((el) => el.id === id);
        this.todos[index].status = !this.todos[index].status;
        let task = document.querySelector(`[data-id="${id}"]`);
        if(this.todos[index].status) {
            task.classList.remove('notDone');
            task.classList.add('done');
        } else {
            task.classList.remove('done');
            task.classList.add('notDone');
        }
    }
    submitClick(e) {
        e.preventDefault();
        let target = e.target;
        let id = target.parentNode.dataset.id
        if(target.className.includes('statusButton')) {
            this.changeStatus(id);
        } else if(target.className.includes('deleteButton')) {
            this.removeTodo(id);
        }
    }
    findTasks(str) {
        let todos = this.getTodos();
        this.todos = this.todos.filter(todo => todo.value && todo.value.includes(str));
        this.render();
        this.setTodos(todos);
    }
    render() {
        let lis = '';
        for (let el of this.todos) {
            if (!el) {
                return;
            }
            let classTask = el.status ? "done" : "notDone";
            lis += `<li data-id="${el.id}" class ="${classTask}">${el.value}<button class="statusButton">Change status</button><button class="deleteButton">Delete</button></li>`;
        }
        this.el.innerHTML = lis;
    }
}
  
class Task {
    constructor(value, status) {
        this.value = value;
        this.status = status;
        this.id = Math.random().toString(36).substr(2, 9);
    }
}

let list = document.getElementById('list');
let todo1 = new TodoList(list);
console.log(todo1.getTodos());
todo1.render();
  
createBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if(input.value) {
        todo1.addTodo(new Task(input.value, false));
    }
})
  
findBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if(input.value) {
        todo1.findTasks(input.value);
    }
})