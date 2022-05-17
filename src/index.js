import './style.css'

const LOCAL_STORAGE_LIST_KEY = 'task.list';
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId';

const DOM = ((doc) => {
    const listElement = doc.querySelector('[data-lists]');
    const containerTasks = doc.querySelector('[data-container-tasks]');
    const taskTemplate = doc.querySelector('.template1')
    /*Funcion para guardar*/
    function save(lists){
        localStorage.setItem(LOCAL_STORAGE_LIST_KEY,JSON.stringify(lists));
        localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, navbar.selectedListId);
    }

    function saveAndRender(listElement, lists){
        save(lists);
        render(listElement, lists);
    }
    /*-------*/
    /*Metodo que corre solo una vez para cargar los valores guardados*/
    const runOneTime = () => {
        listElement.addEventListener('click', e => {
            if(e.target.tagName.toLowerCase() === 'li') {
                navbar.selectedListId = e.target.dataset.listId;
                saveAndRender(listElement, navbar.lists);
            }
        })
        saveAndRender(listElement, navbar.lists);
    }
    /**/

    function addElementList(e) {
        e.preventDefault();
        /*Agregar clase de seleccionado a LI*/
        listElement.addEventListener('click', e => {
            if(e.target.tagName.toLowerCase() === 'li') {
                navbar.selectedListId = e.target.dataset.listId;
                saveAndRender(listElement, navbar.lists);
            }
        })
        /*------*/
        let input = doc.querySelector('[data-new-list-input]');

        if(input.value == null || input.value === '') return;

        const list = navbar.createList(input.value);
        (navbar.lists).push(list);
        
        saveAndRender(listElement, navbar.lists);
        input.value = null;
    }

    function render (listElement, lists) {
        clearNavBar(listElement);
        renderList(listElement, lists);

        const selectedList = lists.find(list => list.id === navbar.selectedListId);
        if(selectedList == null){
            containerTasks.style.display = 'none';
        } else {
            containerTasks.style.display = 'flex';
            clearNavBar(containerTasks);
            renderTasks(selectedList);
        }    
    }

    function renderList(listElement, lists) {
        lists.forEach(list => {
            let li = doc.createElement('li');
            li.classList.add('list-option');
            li.dataset.listId = list.id;
            li.innerText = list.name;
            if(list.id == navbar.selectedListId) li.classList.add('active-list');
            listElement.appendChild(li);
        })
    }

    function renderTasks(selectedList){
        selectedList.tasks.forEach(task => {
            const taskElement = doc.importNode(taskTemplate.content, true); 
            const checkbox = taskElement.querySelector('input');
                checkbox.id = task.id;
                checkbox.complete = task.complete;
            const label = taskElement.querySelector('label');      
                label.htmlFor = task.id;
                label.append(task.name);
                containerTasks.appendChild(taskElement);
        })
    }

    function clearNavBar (listElement) {
        while(listElement.firstChild){
            listElement.removeChild(listElement.firstChild)
        }
    }

    const addNewListElement = () => {
        const newListForm = doc.querySelector('[data-new-list-form]');
        newListForm.addEventListener('submit', addElementList)
    }
  
    const eraseCurrentList = () =>{
        const buttonDelete = doc.querySelector('[data-erase-list]');
        buttonDelete.addEventListener('click', e => {
            navbar.lists = (navbar.lists).filter(list => list.id != navbar.selectedListId);
            saveAndRender(listElement, navbar.lists);
        })
    }

    return {addNewListElement, runOneTime, eraseCurrentList};
})(document);




const navbar = ((doc)=>{
    let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
    let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);
    const createList = (name) => {
       return {id: Date.now().toString(), name: name, tasks: [{
        id: 'Houmser',
        name: 'test',
        complete: true,
       }]}
    }
    return {lists, selectedListId, createList};
})(document);

DOM.addNewListElement();
DOM.runOneTime();
DOM.eraseCurrentList();
console.log('Houmser Weno');