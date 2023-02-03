use department_db;

INSERT INTO departments(name)
VALUES('Sales'),
('Engineering'),
('Finance'),
('legal');

INSERT INTO roles(title, salary, department_id)
VALUES('Sales Manager',200000, 1),
('Sales Rep', 80000 , 1),
('Lead Engineer', 200000,2),
('Engineer',140000,2),
('Finance Manager',200000,3),
('Financial Advisor',120000,3),
('Lawyer',150000,4),
('Legal Advisor',120000,4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES('Longneck','Billy',1,NULL),
('Bill','Smith',2,NULL),
('Jeff','Lundy',3,NULL),
('Bud','Dunkel',4,NULL),
('Butch','Philliber',5,NULL),
('Tim','Bangs',6,NULL),
('Punxsutawney','Phil',7,NULL),
('Mark','Weaver',8,NULL);

