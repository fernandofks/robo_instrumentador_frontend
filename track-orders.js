document.addEventListener('DOMContentLoaded', function () {
    const ordersList = document.getElementById('ordersList');

    // Iterate through localStorage and display orders
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('order_')) {
            const orderId = key.replace('order_', '');
            const orderItems = JSON.parse(localStorage.getItem(key));

            const listItem = document.createElement('li');
            listItem.textContent = `Order ID: ${orderId}, Items: ${orderItems.join(', ')}`;
            ordersList.appendChild(listItem);
        }
    }
});
