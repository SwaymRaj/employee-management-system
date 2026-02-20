CREATE DATABASE ems_db;
USE ems_db;

CREATE TABLE employees (
  emp_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  department VARCHAR(50),
  position VARCHAR(50),
  salary DECIMAL(10,2)
);
