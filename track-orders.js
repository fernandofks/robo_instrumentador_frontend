document.addEventListener('DOMContentLoaded', function () {
    const ordersList = document.getElementById('ordersList');
    const sendMqttButton = document.getElementById('sendMqttButton');

    // Add event listener to the button
    sendMqttButton.addEventListener('click', function () {
        sendMqttMessage();
    });

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

    // Function to send MQTT message
    function sendMqttMessage() {
        const orderId = prompt('Enter Order ID to send MQTT message:');

        if (orderId) {
            // Fetch the order details from localStorage
            const key = `order_${orderId}`;
            const orderItems = JSON.parse(localStorage.getItem(key));

            // Check if the order with the specified ID exists
            if (orderItems) {
                const kitId = `Kit: ${orderId}, Items: ${orderItems.join(', ')}`;
                sendViaMQTT(kitId);
            } else {
                alert(`Order with ID ${orderId} not found.`);
            }
        } else {
            alert('Order ID is required to send an MQTT message.');
        }
    }

    // Function to send an order to a client via MQTT
    function sendViaMQTT(kitId) {
        const conteudo = {
            kit: kitId
        };

        fetch('http://127.0.0.1:8000/api/mqtt', {
            method: 'POST',
            body: JSON.stringify(conteudo),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            if (response.status === 200) {
                alert('MQTT message sent successfully.');
            }
        }).catch(function (error) {
            console.error(error);
        });
    }
});
