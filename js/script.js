// Array to store shopping list items
let shoppingListArray = [];

// Get references to the input field and shopping list container
const itemInput = document.getElementById('input');
const shoppingList = document.getElementById('shoppinglist');
const addButton = document.getElementById('add-button');

// Load the shopping list from local storage
window.onload = function() {
    const storedList = localStorage.getItem('shoppingList');
    if (storedList) {
        shoppingListArray = JSON.parse(storedList);
        renderList();
    }
};

// Function to add a new item to the list
function addItem() {
    const itemText = itemInput.value.trim();
    if (itemText === '') {
        alert('Please enter an item.');
        return;
    }

    // Add item to the shopping list array
    shoppingListArray.push({ text: itemText, purchased: false });
    updateLocalStorage();
    renderList();

    // Clear the input field
    itemInput.value = '';
}

// Function to render the shopping list
function renderList() {
    // Clear the current list
    shoppingList.innerHTML = '';

    // Iterate over the shopping list array and create list items
    shoppingListArray.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item.text;
        li.setAttribute('data-index', index);
        if (item.purchased) {
            li.classList.add('purchased');
        }

        // Add an edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editItem(index));
        li.appendChild(editButton);

        // Add a mark as purchased button
        const purchaseButton = document.createElement('button');
        purchaseButton.textContent = 'Purchased';
        purchaseButton.addEventListener('click', () => markPurchased(index));
        li.appendChild(purchaseButton);

        // Add a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => removeItem(index));
        li.appendChild(removeButton);

        // Append the list item to the shopping list
        shoppingList.appendChild(li);
    });
}

// Function to update local storage
function updateLocalStorage() {
    localStorage.setItem('shoppingList', JSON.stringify(shoppingListArray));
}

// Function to mark an item as purchased
function markPurchased(index) {
    shoppingListArray[index].purchased = !shoppingListArray[index].purchased;
    updateLocalStorage();
    renderList();
}

// Function to remove an item from the list
function removeItem(index) {
    shoppingListArray.splice(index, 1);
    updateLocalStorage();
    renderList();
}

// Function to edit an item
function editItem(index) {
    const newText = prompt('Edit item:', shoppingListArray[index].text);
    if (newText !== null && newText.trim() !== '') {
        shoppingListArray[index].text = newText.trim();
        updateLocalStorage();
        renderList();
    }
}

// Add event listener to the add button
addButton.addEventListener('click', addItem);

// Add event listener for the 'Enter' key
itemInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addItem();
    }
});
