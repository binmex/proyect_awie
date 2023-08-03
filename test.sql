
create database awie;
use awie;
show databases;
show tables;

-- Tabla Usuario
CREATE TABLE Usuario (
  cc INT PRIMARY KEY,
  nombre VARCHAR(20),
  contraseña VARCHAR(50) NOT NULL
);

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
Drop table Producto;
INSERT INTO Producto (name_product,quantity_init,purchase_price,selling_price) VALUES ('Leche 1L',10, 35000, 45000);
INSERT INTO Producto (name_product,quantity_init,purchase_price,selling_price) VALUES ('Panela 10g',5, 3000, 4000);
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
drop TABLE StockMovimiento;
-- Insertar movimiento de entrada en StockMovimiento
INSERT INTO StockMovimiento (product_id,quantity_stock,date_of_movement,movement_type) VALUES (1, 20, '2023-07-18', 'entrada');
INSERT INTO StockMovimiento (product_id,quantity_stock,date_of_movement,movement_type) VALUES (2, 30, '2023-06-15', 'entrada');
INSERT INTO StockMovimiento (product_id,quantity_stock,date_of_movement,movement_type) VALUES (1, 2, '2023-07-18', 'salida');
select * from StockMovimiento;
select * from Producto;
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
Drop table Venta;
insert into Venta values(2,1,1,1,2222);
-- Tabla Factura
CREATE TABLE Factura (
  id_invoice INT auto_increment PRIMARY KEY,
  date_of_sell DATE,
  admin_name VARCHAR(20)
);
Drop table Venta;

-- Insertar factura
INSERT INTO Factura (date_of_sell,admin_name) 
VALUES ( '2023-07-18', 'robin');
select * from Factura;
-- Insertar factura
INSERT INTO Venta 
VALUES (3,1,1,1, 3333);
select * from Venta;
select * from StockMovimiento;
INSERT INTO Venta (product_id ,
invoice_id ,
quantity_sell ,
value_sold) 
VALUES (1,1,1, ((select selling_price from producto where id_producto = 2)*1));
select * from Producto;
select * from factura;
select * from venta;


/Triggers/


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
drop trigger restar_cantidad_stockMovimientos;
DELIMITER //
create  TRIGGER restar_cantidad_stockMovimientos AFTER INSERT ON Venta
FOR EACH ROW
BEGIN
DECLARE date_of_sell1 date;
SELECT date_of_sell INTO date_of_sell1 FROM Factura join Venta ON Factura.id_invoice = Venta.invoice_id;
	INSERT INTO StockMovimiento (product_id,quantity_stock,date_of_movement,movement_type)
    VALUES (new.product_id, new.quantity_sell, date_of_sell1, 'salida');
END //
DELIMITER ;

DELIMITER //
drop trigger restar_cantidad_Producto;
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