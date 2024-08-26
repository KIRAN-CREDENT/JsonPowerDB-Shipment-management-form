const baseUrl = "http://api.login2explore.com:5577";
const dbName = "DELIVERY-DB"; // database name
const collectionName = "SHIPMENT-TABLE"; // rel name
const connToken = "90932095|-31949218989176721|90961996"; // connection token

document.addEventListener("DOMContentLoaded", () => {
    const shipmentNoInput = document.getElementById("shipment-no");
    const descriptionInput = document.getElementById("description");
    const sourceInput = document.getElementById("source");
    const destinationInput = document.getElementById("destination");
    const shippingDateInput = document.getElementById("shipping-date");
    const expectedDeliveryDateInput = document.getElementById("expected-delivery-date");

    const saveBtn = document.getElementById("save-btn");
    const updateBtn = document.getElementById("update-btn");
    const resetBtn = document.getElementById("reset-btn");

    // Reset form
    function resetForm() {
        shipmentNoInput.value = "";
        descriptionInput.value = "";
        sourceInput.value = "";
        destinationInput.value = "";
        shippingDateInput.value = "";
        expectedDeliveryDateInput.value = "";

        descriptionInput.disabled = true;
        sourceInput.disabled = true;
        destinationInput.disabled = true;
        shippingDateInput.disabled = true;
        expectedDeliveryDateInput.disabled = true;

        saveBtn.disabled = true;
        updateBtn.disabled = true;
        shipmentNoInput.focus();
    }

    // Check if shipment exists
    async function checkShipment() {
        const shipmentNo = shipmentNoInput.value;
        const response = await fetch(`${baseUrl}/jp/search/${dbName}/${collectionName}?filter={"Shipment-No":"${shipmentNo}"}`);
        const data = await response.json();

        if (data && data.length > 0) {
            // Shipment exists, populate the form
            const shipment = data[0];
            descriptionInput.value = shipment.Description;
            sourceInput.value = shipment.Source;
            destinationInput.value = shipment.Destination;
            shippingDateInput.value = shipment["Shipping-Date"];
            expectedDeliveryDateInput.value = shipment["Expected-Delivery-Date"];

            descriptionInput.disabled = false;
            sourceInput.disabled = false;
            destinationInput.disabled = false;
            shippingDateInput.disabled = false;
            expectedDeliveryDateInput.disabled = false;

            updateBtn.disabled = false;
            saveBtn.disabled = true;
            descriptionInput.focus();
        } else {
            // Shipment does not exist
            descriptionInput.disabled = false;
            sourceInput.disabled = false;
            destinationInput.disabled = false;
            shippingDateInput.disabled = false;
            expectedDeliveryDateInput.disabled = false;

            saveBtn.disabled = false;
            updateBtn.disabled = true;
            descriptionInput.focus();
        }
    }

    // Save shipment
    async function saveShipment() {
        const shipmentData = {
            "Shipment-No": shipmentNoInput.value,
            "Description": descriptionInput.value,
            "Source": sourceInput.value,
            "Destination": destinationInput.value,
            "Shipping-Date": shippingDateInput.value,
            "Expected-Delivery-Date": expectedDeliveryDateInput.value
        };

        const response = await fetch(`${baseUrl}/jp/insert/${dbName}/${collectionName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: connToken,
                jsonStr: shipmentData
            })
        });

        if (response.ok) {
            alert("Shipment saved successfully!");
            resetForm();
        } else {
            alert("Error saving shipment.");
        }
    }

    // Update shipment
    async function updateShipment() {
        const shipmentData = {
            "Shipment-No": shipmentNoInput.value,
            "Description": descriptionInput.value,
            "Source": sourceInput.value,
            "Destination": destinationInput.value,
            "Shipping-Date": shippingDateInput.value,
            "Expected-Delivery-Date": expectedDeliveryDateInput.value
        };

        const response = await fetch(`${baseUrl}/jp/update/${dbName}/${collectionName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: connToken,
                jsonStr: shipmentData
            })
        });

        if (response.ok) {
            alert("Shipment updated successfully!");
            resetForm();
        } else {
            alert("Error updating shipment.");
        }
    }

    // Event Listeners
    shipmentNoInput.addEventListener("blur", checkShipment);
    saveBtn.addEventListener("click", () => {
        if (validateForm()) {
            saveShipment();
        } else {
            alert("Please fill in all fields.");
        }
    });
    updateBtn.addEventListener("click", () => {
        if (validateForm()) {
            updateShipment();
        } else {
            alert("Please fill in all fields.");
        }
    });
    resetBtn.addEventListener("click", resetForm);
});

// Validate form fields
function validateForm() {
    const inputs = document.querySelectorAll("#shipment-form input, #shipment-form textarea");
    for (let input of inputs) {
        if (input.disabled === false && input.value.trim() === "") {
            return false;
        }
    }
    return true;
}
