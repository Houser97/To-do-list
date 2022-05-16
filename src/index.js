import './style.css'

const DOM = ((doc) => {

    function addElementList(e) {
        e.preventDefault();
        const listElement = doc.querySelector('[data-lists]');
        let input = doc.querySelector('[data-new-list-input]');

        if(input.value == null || input.value === '') return;

        const list = navbar.createList(input.value);
        (navbar.lists).push(list);
        
        render(listElement, navbar.lists);
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

    return {addNewListElement,highlightCurrentList};
})(document);

DOM.addNewListElement();
DOM.highlightCurrentList();




const navbar = ((doc)=>{
    let lists = [];

    const createList = (name) => {
       return {id: Date.now().toString(), name: name, tasks: []}
    }
    return {lists, createList};
})(document);


console.log('Houmser Weno');