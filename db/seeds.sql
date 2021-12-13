INSERT INTO department (id, department_name)
VALUES (1,"Engineering"),
       (2,"Finance"),
       (3,"legal"),
       (4,"sales");


INSERT INTO roles (role_id, title,department_id,salary)
VALUES (1,"sales lead","4",8000),
       (2,"salesperson","4",9000),
       (3,"lead engineer","1",9000),
       (4,"software engineer","1",5000),
       (5,"Account manager","2",8000),
       (6,"Accountant","2",9000),
       (7,"leal team lead","3",5000),
       (8,"lawyer","3",7000);



INSERT INTO employee (employee_id, first_name, last_name,role_id, manager_id)
VALUES (1, "Ram", "MOHAN","1",null),
       (2, "MIKE", "mohan",2,2),
       (3, "GREEN", "OTO",3,null),
       (4, "DEWANE", "Lex",4,3),
       (5, "MATTS", "Ernst",5,null),
       (6, "FIELD", "Pataballa",6,null),
       (7, "PLANK", "Diana",7,6),
       (8, "PAUL", "Sciarra",8,4);
   