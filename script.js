const getItems = () => JSON.parse(localStorage.getItem("toDoList")) ?? [];

const setItems = (items) => localStorage.setItem("toDoList", JSON.stringify(items));

const taskDescription = document.getElementById('taskDescription');
const myList = document.getElementById('myList')


function createItem(task, status, i) {
    const item = document.createElement("li");
    item.classList.add("item")
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice=${i}>
        ${task}
        <input class="trash" type="button" value="🗑️" data-indice=${i}>
        `;
    document.getElementById("myList").appendChild(item);
}

function refresh() {
    cleanTasks();
    const items = getItems();
    items.forEach((item, i) => createItem(item.task, item.status, i));
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

function removeItem(i) {
    const items = getItems();
    items.splice(i, 1);
    setItems(items);
    refresh();
}


function clickItem(e) {
    const check = e.target;
    if (check.type === 'button') {
        const i = check.dataset.i;
        removeItem(i);
    } else if (check.type === 'checkbox') {
        const i = check.dataset.i;
        update(i);
    } 
}

function update(i) {
    const items = getItems();
    items[i].status = items[i].status === '' ? 'checked' : '';
    setItems(items);
    refresh();
}

taskDescription.addEventListener('keypress', addItem);
myList.addEventListener('click', clickItem);

refresh();