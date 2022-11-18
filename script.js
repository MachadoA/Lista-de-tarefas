const getItems = () => JSON.parse(localStorage.getItem("toDoList")) ?? [];

const setItems = (items) => localStorage.setItem("toDoList", JSON.stringify(items));

const taskDescription = document.getElementById('taskDescription');
const myList = document.getElementById('myList')


function createItem(task, status, id) {
    const item = document.createElement("li");
    item.classList.add("item")
    item.innerHTML = `
        <input type="checkbox" ${status} id=${id}>
        <span>${task}</span>
        <input class="trash" type="button" value="🗑️" id=${id}>
        `;
    document.getElementById("myList").appendChild(item);
}

function refresh() {
    cleanTasks();
    const items = getItems();
    items.forEach((item, id) => createItem(item.task, item.status, id));
}

function cleanTasks() {
    const myList = document.getElementById('myList');
    while (myList.firstChild) {
        myList.removeChild(myList.lastChild);
    }
}

function addItem(e) {
    const press = e.key;
    const text = e.target.value;
    if (press === 'Enter') {
        const items = getItems();
        items.push({ 'task': text, 'status': '' });
        setItems(items);
        refresh();
        e.target.value = '';
    }
}

function removeItem(id) {
    const items = getItems();
    items.splice(id, 1);    
    setItems(items);
    refresh();
}


function clickItem(e) {
    const check = e.target;
    if (check.type === 'button') {
        const id = check.id;
        removeItem(id);
    } else if (check.type === 'checkbox') {
        const id = check.id;
        update(id);
    } 
}

function update(id) {
    const items = getItems();
    items[id].status = items[id].status === '' ? 'checked' : '';
    setItems(items);
    refresh();
}

taskDescription.addEventListener('keypress', addItem);
myList.addEventListener('click', clickItem);

refresh();
