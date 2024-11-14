INSERT INTO Users(Username, Password, Email, Name) VALUES
('tripleA', 'Test@123', 'aaa@mail.com', 'AAA');

INSERT INTO Customers(UID) 
(SELECT U.UID FROM Users U WHERE U.Username = 'tripleA');