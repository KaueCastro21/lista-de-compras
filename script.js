// Pegando os elementos do HTML.
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const shoppingListUI = document.getElementById('shopping-list');
const deleteAlert = document.getElementById('delete-alert');
const alertCloseBtn = document.getElementById('alert-close-btn');

// Itens globais.
let items = JSON.parse(localStorage.getItem('quicklist_items')) || [
    { text: 'Pão de forma', completed: false },
    { text: 'Café preto', completed: false },
    { text: 'Suco de laranja', completed: false },
    { text: 'Bolacha', completed: false }
];

// Desenhando a lista atualizada na tela
function renderList() {
    shoppingListUI.innerHTML = '';
    
    items.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'shopping-item';
        
        li.innerHTML = `
            <span class="item-text ${item.completed ? 'completed' : ''}" data-index="${index}">
                <input type="checkbox" ${item.completed ? 'checked' : ''} style="cursor:pointer;">
                ${item.text}
            </span>
            <button class="btn-delete" data-index="${index}">🗑️</button>
        `;