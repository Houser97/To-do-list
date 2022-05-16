import './style.css'

const DOM = ((doc) => {

    function addElementList(e) {
        e.preventDefault();
        const listElement = doc.querySelector('[data-lists]');
        let li = doc.createElement('li');
            li.classList.add('list-option');
        let input = doc.querySelector('[data-new-list-input]');

        if(input.value == null || input.value === '') return;

            li.innerText = input.value;
            listElement.appendChild(li);
            input.value = '';
    }

    const addNewListElement = () => {
        const newListForm = doc.querySelector('[data-new-list-form]');
        newListForm.addEventListener('submit', addElementList)
    }

    return {addNewListElement}
})(document);

DOM.addNewListElement();

const navbar = ((doc)=>{
    const addNewList = () => {
        const buttonAddList = doc.querySelector('.createListBtn');
        buttonAddList.addEventListener('click', )
    }
})(document);

console.log('Houmser Weno');