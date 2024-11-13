select * from users;
select * from admins;
select * from customers;
select * from storemgrs;
-- select * from emails;

 SELECT * FROM Users U WHERE U.Email = 'arthur@rdr2.com' AND U.Password = 'hashed_password_10' AND EXISTS (SELECT * FROM Customers C WHERE U.UID = C.UID);
