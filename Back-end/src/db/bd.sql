drop database if exists MetAnimation;
create database MetAnimation;
use MetAnimation;

CREATE TABLE Person (
    Id INT PRIMARY KEY,
    Name CHAR(50) NOT NULL,
    LastName CHAR(50) NOT NULL,
    Phone CHAR(30) DEFAULT '',
    Email CHAR(100) NOT NULL UNIQUE,
    Password CHAR(100) NOT NULL,
    Status BOOLEAN DEFAULT TRUE,
    Date DATETIME DEFAULT NOW(),
    Rol char(50) default 'User' ,
    RolAd char(100) default ''
);

select * from person;


CREATE TABLE Company (
    Id_Company INT PRIMARY KEY auto_increment,
    NameCompany CHAR(200) DEFAULT '',
    PhoneCompany CHAR(50) DEFAULT '',
    EmailCompany CHAR(100) DEFAULT '',
    Addres CHAR(100) NOT NULL,
    PasswordCompany CHAR(100) NOT NULL,
    Date DATETIME DEFAULT NOW(),
    Id_Membreys INT,
    Id_Place INT,
    Id_Cities INT
);

CREATE TABLE Departament (
    Id_Departament INT PRIMARY KEY AUTO_INCREMENT,
    fk_id_departament int,
    NamePlace CHAR(100) NOT NULL DEFAULT '',
    CONSTRAINT Fk_Departament_Company FOREIGN KEY (fk_id_departament)
        REFERENCES Company (Id_Company)
);

 CREATE TABLE Cities (
    Id_Cities INT PRIMARY KEY AUTO_INCREMENT,
    fk_id_Cities int,
    NameCities CHAR(100) NOT NULL DEFAULT '',
    FOREIGN KEY (fk_id_Cities)
        REFERENCES Company (Id_Company)
);

CREATE TABLE Country (
    IdCountry INT AUTO_INCREMENT PRIMARY KEY,
    NameCountry CHAR(100),
    CountryCode INT NOT NULL,
    CountryPerson INT,
    CONSTRAINT Fk_CountryCode_Person FOREIGN KEY (CountryPerson)
        REFERENCES Person (Id)
);

/*----------------------------Cursos-----------------------------------*/

create table AllCourse(
 Id int primary key auto_increment,
 NameCourse varchar(255),
 DescriptionCourse char(255),
 durationCourse char(10),
 IdTeacher int,
 Lenguaje char(50),
 Url Varchar(200) not null,
 Categoria VARCHAR(255) not null
);

CREATE TABLE Category (
    Id_Category INT PRIMARY KEY AUTO_INCREMENT,
    NameCategory VARCHAR(255) NOT NULL,
    DescriptionCategory CHAR(255) NOT NULL,
    Status BOOLEAN DEFAULT TRUE,
    Date DATETIME DEFAULT NOW(),
    TotalCategoria int default 0,
    CONSTRAINT FK_Category_Course FOREIGN KEY (Id_Category)
        REFERENCES AllCourse(Id)
);

CREATE TABLE ContentCourse (
    Id_Content INT PRIMARY KEY AUTO_INCREMENT,
    Description CHAR(255) NOT NULL,
    Duration CHAR(10) NOT NULL,
    Language char(50) not null,
    Url char not null,
    Status BOOLEAN DEFAULT TRUE,
    IdTeacher INT,
    Categoria VARCHAR(255),
    CONSTRAINT FK_Contentcourse_Course FOREIGN KEY (IdTeacher)
        REFERENCES AllCourse(Id)
);

CREATE TABLE Teacher (
    Id_Teacher INT PRIMARY KEY,
    Experience CHAR(50) NOT NULL,
    Study CHAR(255) NOT NULL,
    Status BOOLEAN DEFAULT TRUE,
    CursosTotales int default 0,
    CONSTRAINT FK_Teacher_Person FOREIGN KEY (Id_Teacher)
        REFERENCES Person (Id)
);


/*Noticias*/

CREATE TABLE Noticies (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Content CHAR(255),
    Fountain CHAR(255),
    Date DATETIME default Now()
);

CREATE TABLE Blog (
    Id INT PRIMARY KEY,
    Id_Company INT,
    Id_Noticies INT,
    Date DATETIME,
    Description CHAR(255),
    FOREIGN KEY (Id_Company)
        REFERENCES Company (Id_Company),
    FOREIGN KEY (Id_Noticies)
        REFERENCES Noticies (Id)
);

/*Certificado*/

CREATE TABLE Certificate (
    IdCertificate INT PRIMARY KEY,
    Id_User INT,
    Id_Course INT,
    Id_teacher INT,
    Date DATETIME
);

CREATE TABLE StudentCourse (
    Id INT PRIMARY KEY,
    Id_Student INT,
    Id_Course INT,
    Id_Certificate INT,
    CONSTRAINT FK_StudentCourse_Certificate FOREIGN KEY (Id_Certificate)
        REFERENCES Certificate (IdCertificate),
    CONSTRAINT FK_StudentCourse_Person FOREIGN KEY (Id_Student)
        REFERENCES Person (Id),
    CONSTRAINT FK_StudentCourse_Course FOREIGN KEY (Id_Course)
        REFERENCES AllCourse(Id)
);
/*Portafolio*/

CREATE TABLE Project (
    IdProject INT PRIMARY KEY,
    Recourse CHAR(255) NOT NULL,
    Format CHAR(255)
);

CREATE TABLE Briefcase (
    IdBriefcase INT PRIMARY KEY,
    Id_Company INT,
    Id_Project INT,
    FOREIGN KEY (Id_Company)
        REFERENCES Company (Id_Company),
    FOREIGN KEY (Id_Project)
        REFERENCES Project (IdProject)
);

CREATE TABLE Comment (
    IdComment INT PRIMARY KEY,
    IdBriefcase INT,
    qualification DOUBLE DEFAULT 5.0,
    description CHAR(255),
    FOREIGN KEY (IdBriefcase)
        REFERENCES Briefcase (IdBriefcase)
);

/*Membresia*/

CREATE TABLE Type (
    Id INT PRIMARY KEY,
    Descripction CHAR(255) default 'Free'
);

CREATE TABLE Membreys (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    IdType INT,
    IdCompany INT,
    CONSTRAINT FK_Membreys_User FOREIGN KEY (IdCompany)
        REFERENCES Company (Id_Company),
    CONSTRAINT FK_Membreys_Type FOREIGN KEY (IdType)
        REFERENCES Type (Id)
);

insert into Type values (1,'Free'),(2,'Advanced'),(3,'Premium');

/*Calificacion Cursos*/

CREATE TABLE qualification (
    Id INT PRIMARY KEY,
    Comment CHAR(255),
    IdCourse INT,
    qualification DOUBLE DEFAULT 5.0,
    CONSTRAINT Fk_Qualifi_course FOREIGN KEY (IdCourse)
        REFERENCES AllCourse(Id)
);


/*Table Example*/

create table EmailToken(
	Email char(100),
    Token int
);

select * from EmailToken;


Delimiter $$
create procedure EmailTokenElminated (in email char(100))
begin
	update EmailToken set Token = null where Email=email;
end $$
delimiter ;

/*Creacion de procedimientos Almacenados User*/

/*Procedimiento para obtener Todos los usuarios*/
delimiter $$
create procedure GetAllUsers()
begin  
	select * from Person;
end$$
delimiter;

/*Procedimiento para obtener un usuario por su CC*/
delimiter $$
create procedure GetIdUser(in id int)
begin  
	select * from Person where Person.Id=id;
end$$
delimiter;

/*Procedimiento de validacion de email duplicado*/
delimiter $$
create procedure GetEmailUser(in Email char(100))
begin  
	select id,Name,email from Person where Person.email = Email;
end$$
delimiter;

/*Procedimiento para guardar usuario*/
delimiter $$
create procedure SavePerson(in Cedula int,in Nombre Char(50),in Apellido char(50),in Celular char(30),in Email char(100),in Password char(100),in rol char(100),in rolAd char(100))
begin
	insert into Person (id,Name, lastname, phone, email, Password,Rol,RolAd) values (Cedula,Nombre,Apellido,Celular,Email,Password,rol,rolAd);
end$$
delimiter;

/*Procedimiento Validacion Id duplicado*/
delimiter $$
create procedure GetIdValidacionUser(in id int)
begin  
	select id from Person where Person.Id = id;
end$$
delimiter;

/*Procedimiento Borrar User*/
delimiter $$
create procedure DeleterUserId(in id int)
begin  
	delete from Person where Person.id =  id;
end$$
delimiter;

DELIMITER $$
CREATE PROCEDURE GetAllCourse()
BEGIN
   select * from AllCourse;
END$$
DELIMITER ;

Delimiter $$
create procedure GetCourseElement(in Id int)
begin
	SELECT course.id_Course, Category.*,ContentCourse.*,Teacher.*
    FROM course inner join Category inner join ContentCourse inner join Teacher where course.id_Course=Id ;
end$$
delimiter ;

Delimiter $$
create procedure GetTeacherId(in Id int)
begin
	select Teacher.*,Person.Name,Person.Email,Person.Phone from Teacher inner join Person where Teacher.Id_Teacher=Id and Person.Rol="Profesor" ;
end $$
delimiter ;

Delimiter $$
create procedure GetTeacherAll()
begin
	select Teacher.*,Person.Name,Person.Email,Person.Phone from Teacher inner join Person where Person.Rol="Profesor" ;
end $$
delimiter ;

Delimiter $$
create procedure UpdateTeacher(in Id_Teacher1 int ,in Experience1 char(50), in Study1 char(255))
begin
    update Teacher set Experience=Experience1, Study=Study1 where Id_Teacher=Id_Teacher1;
end $$
delimiter ;

Delimiter $$
create procedure AddTeacher (in Id_Teacher1 int ,in Experience1 char(50), in Study1 char(255))
begin
	SET FOREIGN_KEY_CHECKS=0; 
	update Person set Rol = 'Profesor' where Id = Id_Teacher1;
	insert into Teacher (Id_Teacher,Experience,Study) values (Id_Teacher1,Experience1,Study1);
end $$
delimiter ;

Delimiter $$
create procedure DeleteTeacher(in Id_Teacher1 int)
begin
	delete from Teacher where Id_Teacher=Id_Teacher1;
	update Person set Rol = 'User' where Id = Id_Teacher1;
end $$
delimiter ;

Delimiter $$
create procedure CreateCourse(in NameCourse varchar(255),in DescriptionCourse char(255),in durationCourse char(10),in IdTeacher int,in Lenguaje char(50),in Url varchar(2000), NameCategory varchar(255))
begin
	SET FOREIGN_KEY_CHECKS=0;
    insert into AllCourse(NameCourse,DescriptionCourse,durationCourse,IdTeacher,Lenguaje,Url,Categoria) values (NameCourse,DescriptionCourse,durationCourse,IdTeacher,Lenguaje,Url,Categoria);
	insert into ContentCourse(Description,Duration,Url,IdTeacher,Categoria) values (DescriptionCourse,durationCourse,Url,IdTeacher,Categoria);
    update Teacher set CursosTotales=CursosTotales+1 where Id_Teacher=IdTeacher;
    update Category set TotalCategoria=TotalCategoria+1 where NameCategory=NameCategory;
end $$
delimiter ;

Delimiter $$
create procedure CreateCategory(NameCat char(255),in DescriptionCate char(255))
begin
	SET FOREIGN_KEY_CHECKS=0;
	insert into Category (NameCategory,DescriptionCategory) values (NameCat,DescriptionCate);
end $$
delimiter ;
