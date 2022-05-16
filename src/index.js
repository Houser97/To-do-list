import './style.css'

const LOCAL_STORAGE_LIST_KEY = 'task.list'

const DOM = ((doc) => {

    /*Funcion para guardar*/
    function save(lists){
        localStorage.setItem(LOCAL_STORAGE_LIST_KEY,JSON.stringify(lists));
    }

    function saveAndRender(listElement, lists){
        save(lists);
        render(listElement, lists);
    }
    /*-------*/
    /*Metodo que corre solo una vez para cargar los valores guardados*/
    const runOneTime = () => {
        const listElement = doc.querySelector('[data-lists]'); 
        saveAndRender(listElement, navbar.lists);
    }
    /**/

    function addElementList(e) {
        e.preventDefault();
        const listElement = doc.querySelector('[data-lists]');
        let input = doc.querySelector('[data-new-list-input]');

        if(input.value == null || input.value === '') return;

        const list = navbar.createList(input.value);
        (navbar.lists).push(list);
        
        saveAndRender(listElement, navbar.lists);
        input.value = null;
    }

    function render (listElement, lists) {
        clearNavBar(listElement)
        lists.forEach(list => {
            let li = doc.createElement('li');
            li.classList.add('list-option');
            li.dataset.listId = list.id;
            li.innerText = list.name;
            listElement.appendChild(li);
            console.log(li);
        })
        

    }

    function clearNavBar (listElement) {
        while(listElement.firstChild){
            listElement.removeChild(listElement.firstChild)
        }
    }

    function removeHighlight() {
        const listElements = doc.querySelectorAll('.list-option');
        listElements.forEach(listElement => listElement.classList.remove('active-list'));
    } 

    function highlight(e) {
        removeHighlight();
        e.target.classList.add('active-list');
    }

    const addNewListElement = () => {
        const newListForm = doc.querySelector('[data-new-list-form]');
        newListForm.addEventListener('submit', addElementList)
    }

    const highlightCurrentList = () => {
        const listElements = doc.querySelectorAll('.list-option');
        listElements.forEach(listElement => listElement.addEventListener('click', highlight));
    }

    return {addNewListElement,highlightCurrentList, runOneTime};
})(document);




const navbar = ((doc)=>{
    let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];

    const createList = (name) => {
       return {id: Date.now().toString(), name: name, tasks: []}
    }
    return {lists, createList};
})(document);

DOM.addNewListElement();
DOM.highlightCurrentList();
DOM.runOneTime();
console.log('Houmser Weno');