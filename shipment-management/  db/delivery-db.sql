-- Create the DELIVERY-DB database
CREATE DATABASE DELIVERY-DB;

-- Use the DELIVERY-DB database
USE DELIVERY-DB;

-- Create the SHIPMENT-TABLE table
CREATE TABLE SHIPMENT-TABLE (
  `Shipment-No` VARCHAR(255) PRIMARY KEY,
  `Description` TEXT,
  `Source` VARCHAR(255),
  `Destination` VARCHAR(255),
  `Shipping-Date` DATE,
  `Expected-Delivery-Date` DATE
);
