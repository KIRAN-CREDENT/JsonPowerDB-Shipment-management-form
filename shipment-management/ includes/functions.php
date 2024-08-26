<?php
require_once 'config.php';

// Function to save shipment data
function saveShipment($shipmentData) {
    global $baseUrl, $dbName, $collectionName;

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "$baseUrl/jp/insert/$dbName/$collectionName");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($shipmentData));
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));

    $response = curl_exec($ch);
    curl_close($ch);

    return json_decode($response, true);
}

// Function to update shipment data
function updateShipment($shipmentData) {
    global $baseUrl, $dbName, $collectionName;

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "$baseUrl/jp/update/$dbName/$collectionName");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($shipmentData));
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));

    $response = curl_exec($ch);
    curl_close($ch);

    return json_decode($response, true);
}

// Function to check if shipment exists
function checkShipment($shipmentNo) {
    global $baseUrl, $dbName, $collectionName;

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "$baseUrl/jp/search/$dbName/$collectionName?filter={\"Shipment-No\":\"$shipmentNo\"}");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);
    curl_close($ch);

    return json_decode($response, true);
}
?>
