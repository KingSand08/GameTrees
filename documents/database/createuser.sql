INSERT INTO Users (Username, Name, DOB, Phone, Password, Email) VALUES
    ('marioB', 'Mario Bros', '1981-07-09', '(408)555-1001', 'hashed_password_1', 'mario@nintendoland.com'),
    ('linkH', 'Link Hylian', '1986-02-21', '(408)555-1002', 'hashed_password_2', 'link@hyrule.com'),
    ('samusA', 'Samus Aran', '1986-08-06', '(408)555-1003', 'hashed_password_3', 'samus@metroid.com'),
    ('sonicH', 'Sonic Hedgehog', '1991-06-23', '(408)555-1004', 'hashed_password_4', 'sonic@sega.com'),
    ('laraC', 'Lara Croft', '1996-10-25', '(408)555-1005', 'hashed_password_5', 'lara@tombraider.com'),
    ('cloudS', 'Cloud Strife', '1997-01-31', '(408)555-1006', 'hashed_password_6', 'cloud@ffvii.com'),
    ('kratosG', 'Kratos Godofwar', '2005-03-22', '(408)555-1007', 'hashed_password_7', 'kratos@sparta.com'),
    ('masterC', 'Master Chief', '2001-11-15', '(408)555-1008', 'hashed_password_8', 'chief@halo.com'),
    ('geraltR', 'Geralt Rivia', '2007-10-26', '(408)555-1009', 'hashed_password_9', 'geralt@witcher.com'),
    ('arthurM', 'Arthur Morgan', '2018-10-26', '(408)555-1010', 'hashed_password_10', 'arthur@rdr2.com');

-- INSERT INTO Emails(UID, Email) VALUES	
-- 	(8, 'mario@nintendoland.com'),
-- 	(9, 'link@hyrule.com'),
-- 	(10, 'samus@metroid.com'),
-- 	(11, 'sonic@sega.com'),
-- 	(12, 'lara@tombraider.com'),
-- 	(13, 'cloud@ffvii.com'),
-- 	(14, 'kratos@sparta.com'),
-- 	(15, 'chief@halo.com'),
-- 	(16, 'geralt@witcher.com'),
-- 	(17, 'arthur@rdr2.com');

INSERT INTO Customers (UID)
    SELECT UID 
    FROM Users 
    WHERE Username IN (
        'marioB', 
        'linkH', 
        'samusA', 
        'sonicH', 
        'laraC', 
        'cloudS', 
        'kratosG', 
        'masterC', 
        'geraltR', 
        'arthurM'
);