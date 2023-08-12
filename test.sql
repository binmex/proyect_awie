
create database awie;
show databases;
use awie;
show tables;

-- Tabla Usuario
CREATE TABLE Usuario (
  cc INT PRIMARY KEY,
  nombre VARCHAR(20),
  contraseña VARCHAR(50) NOT NULL
);
-- Insercion table usuarios
INSERT INTO Usuario VALUES (1193517118, 'robin', 'admin');
INSERT INTO Usuario VALUES (1007395141, 'laura', 'admin');

-- Tabla Producto
CREATE TABLE Producto (
  id_producto INT auto_increment PRIMARY KEY,
  name_product VARCHAR(20) NOT NULL,
  quantity_init int not null,
  purchase_price FLOAT NOT NULL,
  selling_price FLOAT NOT NULL
);
-- Insercion tabla Producto
INSERT INTO Producto (name_product,quantity_init,purchase_price,selling_price) VALUES ('Leche 1L',10, 35000, 45000);
INSERT INTO Producto (name_product,quantity_init,purchase_price,selling_price) VALUES ('Panela 10g',5, 3000, 4000);
INSERT INTO Producto (name_product,quantity_init,purchase_price,selling_price) VALUES ('huevos ',8, 3000, 4000);
select *  from producto;

-- Tabla StockMovimiento
CREATE TABLE StockMovimiento (
  id_stock INT auto_increment PRIMARY KEY,
  product_id INT NOT NULL,
  quantity_stock INT,
  date_of_movement DATE,
  movement_type ENUM('entrada', 'salida','devolucion','otro'),
  FOREIGN KEY (product_id) REFERENCES Producto(id_producto)
);

-- Insertar movimiento de entrada en StockMovimiento
INSERT INTO StockMovimiento (product_id,quantity_stock,date_of_movement,movement_type) VALUES (1, 20, '2023-07-18', 'entrada');
INSERT INTO StockMovimiento (product_id,quantity_stock,date_of_movement,movement_type) VALUES (2, 30, '2023-06-15', 'entrada');
INSERT INTO StockMovimiento (product_id,quantity_stock,date_of_movement,movement_type) VALUES (1, 2, '2023-07-18', 'salida');
-- Tabla Venta
CREATE TABLE Venta (
id_venta INT auto_increment PRIMARY KEY,
product_id INT NOT NULL,
invoice_id INT NOT NULL,
quantity_sell INT,
value_sold FLOAT,
FOREIGN KEY (product_id) REFERENCES Producto(id_producto),
FOREIGN KEY (invoice_id) REFERENCES Factura(id_invoice)
);
-- Insercion tabla venta
INSERT INTO Venta (product_id ,
invoice_id ,
quantity_sell ,
value_sold) 
VALUES (2,2,1,2000 );
-- Tabla Factura
CREATE TABLE Factura (
  id_invoice INT auto_increment PRIMARY KEY,
  date_of_sell DATE,
  admin_name VARCHAR(20)
);

-- Insertar factura
INSERT INTO Factura (date_of_sell,admin_name) 
VALUES ( '2023-08-10', 'laura');
INSERT INTO Factura (date_of_sell,admin_name) 
VALUES ( '2023-08-10', 'robin');
-- select de todas las tablas
select * from Producto;
select * from factura;
select * from venta;
select * from StockMovimiento;


/Triggers/
-- Trigger que valida que haya producto para vender

DELIMITER //
CREATE TRIGGER validar_existencia before INSERT ON Venta
FOR EACH ROW
BEGIN
   
    DECLARE stock_existente INT;
    SET stock_existente = COALESCE((SELECT quantity_init FROM producto where id_producto=new.product_id));
    
    IF stock_existente < NEW.quantity_sell THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'No hay suficiente existencia en el stockMovimiento para crear la factura.';
   
    END IF;
END //
DELIMITER ;
-- Termina trigger
-- Trigger que crea el registro de salida en stock movimiento 
DELIMITER //
create  TRIGGER restar_cantidad_stockMovimientos AFTER INSERT ON Venta
FOR EACH ROW
BEGIN

	INSERT INTO StockMovimiento (product_id,quantity_stock,date_of_movement,movement_type)
    VALUES (new.product_id, new.quantity_sell, NOW(), 'salida');
END //
DELIMITER ;
-- Termina trigger
-- Trigger que resta la cantidad de producto al haber una salida en stock movimiento 
DELIMITER //

CREATE TRIGGER restar_cantidad_Producto AFTER INSERT ON StockMovimiento
FOR EACH ROW
BEGIN
  IF NEW.movement_type = 'salida' THEN
    UPDATE Producto
    SET quantity_init = quantity_init - NEW.quantity_stock
    WHERE id_producto = NEW.product_id;
  END IF;
END //

DELIMITER ;
-- Termina trigger
-- Trigger que valida la existencia de una factura por el periodo 
DELIMITER //
CREATE TRIGGER validar_periodo_existente BEFORE insert ON factura
FOR EACH ROW
BEGIN
    DECLARE fecha_inicio DATE;
    DECLARE fecha_fin DATE;
    
    SELECT MIN(date_of_movement) INTO fecha_inicio FROM StockMovimiento;
    SELECT MAX(date_of_movement) INTO fecha_fin FROM StockMovimiento;
    
    IF NEW.date_of_sell < fecha_inicio OR NEW.date_of_sell > fecha_fin THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'El período especificado no existe en stockMovimiento.';
    END IF;
END //
DELIMITER ;
-- Termina trigger
-- Trigger que aumenta la cantidad de producto segun stock movimiento 
DELIMITER // 
CREATE TRIGGER sumar_cantidad_Producto AFTER INSERT ON StockMovimiento
FOR EACH ROW
BEGIN
  IF NEW.movement_type = 'entrada' THEN
    UPDATE Producto
    SET quantity_init = quantity_init + NEW.quantity_stock
    WHERE id_producto = NEW.product_id;
  END IF;
END //

DELIMITER ;
-- Termina trigger