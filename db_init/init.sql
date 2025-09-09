\c db_products

-- Tabla de Productos
CREATE TABLE IF NOT EXISTS products ( 
	id SERIAL PRIMARY KEY, 
	name VARCHAR(255) NOT NULL, 
	description TEXT, 
	price NUMERIC(10, 2) NOT NULL, 
	type VARCHAR(100), 
	active BOOLEAN DEFAULT TRUE, 
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, 
	updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Opcional: Inserta un producto de ejemplo para probar
INSERT INTO products (name, description, price, type) VALUES
('Producto de Prueba', 'Descripción de un producto de prueba.', 99.99, 'Test');

-- Tabla de Tipos de Productos
CREATE TABLE IF NOT EXISTS types (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL UNIQUE,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);