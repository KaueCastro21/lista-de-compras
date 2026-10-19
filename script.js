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

// Desenha a lista atualizada na tela.
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
        
        shoppingListUI.appendChild(li);
    });
    
    // Guarda as alterações no bloquinho de notas do navegador.
    localStorage.setItem('quicklist_items', JSON.stringify(items));
}

// Escuta quando você clica em "Adicionar item".
itemForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const text = itemInput.value.trim();
    if (text) {
        items.push({ text: text, completed: false });
        itemInput.value = '';
        renderList();
    }
});

// Escuta cliques dentro da lista (para riscar ou deletar).
shoppingListUI.addEventListener('click', function(e) {
    // Se clicou no texto ou no quadradinho, risca o item.
    const targetText = e.target.closest('.item-text');
    if (targetText) {
        const index = targetText.getAttribute('data-index');
        items[index].completed = !items[index].completed;
        renderList();
        return;
    }

    // Se clicou na lixeira, deleta o item.
    const targetDelete = e.target.closest('.btn-delete');
    if (targetDelete) {
        const index = targetDelete.getAttribute('data-index');
        items.splice(index, 1);
        renderList();
        showAlert();
    }
});

// Mostra a barrinha vermelha de item removido.
let alertTimeout;
function showAlert() {
    clearTimeout(alertTimeout);
    deleteAlert.classList.add('show');
    alertTimeout = setTimeout(closeAlert, 4000);
}

// Esconde a barrinha vermelha.
function closeAlert() {
    deleteAlert.classList.remove('show');
}

// Ativa o botão de fechar (X) do alerta vermelho.
alertCloseBtn.addEventListener('click', closeAlert);

// Inicializa o app mostrando os itens assim que a página abre.
renderList();