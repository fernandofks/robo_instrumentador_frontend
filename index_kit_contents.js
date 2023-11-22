let order = [];

function addToOrder(item) {
    // Check if the item is not already in the order
    if (!order.includes(item)) {
        order.push(item);
        updateOrderDisplay();
    } else {
        alert('Item is already in the order.');
    }
}

function removeFromOrder(index) {
    order.splice(index, 1);
    updateOrderDisplay();
}

function updateOrderDisplay() {
    const orderList = document.getElementById('orderList');

    // Clear previous order
    orderList.innerHTML = '';

    // Display the current order
    order.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = item;

        // Add a remove button to each item
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeFromOrder(index);

        listItem.appendChild(removeButton);
        orderList.appendChild(listItem);
    });
}

function exportOrder() {
    // Check if there are items in the order
    if (order.length > 0) {
        // Generate a unique indexable ID
        const orderId = new Date().getTime();

        // Store the order and its ID in localStorage
        localStorage.setItem(`order_${orderId}`, JSON.stringify(order));

        // Redirect to the page that tracks all orders
        window.location.href = `track-orders.html?id=${orderId}`;
    } else {
        alert('Order is empty. Add items before exporting.');
    }
}
