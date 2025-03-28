 create table datos_cliente(
	 id serial primary key ,
	 nombre varchar(90),
	 correo varchar(100),
	 telefono varchar(12),
	 tipoTrasporte integer,
	 tipoCarga integer,
	 observaciones varchar(400)
);
select * from datos_cliente

create table tipos_trasporte(
	id serial primary key,
	nombre varchar(60)
);

create table tipo_carga(
	id serial primary key,
	nombre varchar(60)
);


insert into tipos_trasporte(nombre)
values('Furgon'),
('Carry'),
('Camion'),
('Grua'),
('Aereo');


insert into tipo_carga(nombre)
values('Seca'),
('Refrigerada'),
('Gruas'),
('Maquinaria y equipos'),
('Aerea');