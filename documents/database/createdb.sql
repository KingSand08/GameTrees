CREATE TABLE Users (
    UID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(100) NOT NULL UNIQUE,
    Password VARCHAR(35) NOT NULL,
    Name VARCHAR(100) NOT NULL,
    DOB DATE,
    Phone VARCHAR(15),
    Email VARCHAR(100) NOT NULL UNIQUE
);

-- CREATE TABLE Emails(
--     UID INT,
--     Email VARCHAR(100) NOT NULL UNIQUE,
--     PRIMARY KEY (UID, Email),
--     FOREIGN KEY (UID) REFERENCES Users(UID) 
--         ON DELETE CASCADE
--         ON UPDATE CASCADE
-- );

CREATE TABLE Customers(
    UID INT PRIMARY KEY,
    Last_Login TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UID) REFERENCES Users(UID) 
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Systems_Owned(
    UID INT,
    Device VARCHAR(30),
    PRIMARY KEY (UID, Device),
    FOREIGN KEY (UID) REFERENCES Customers(UID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE StoreMgrs(
    UID INT PRIMARY KEY,
    FOREIGN KEY (UID) REFERENCES Users(UID) 
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Admins(
    UID INT PRIMARY KEY,
    FOREIGN KEY (UID) REFERENCES Users(UID) 
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Business(
    BID VARCHAR(10) PRIMARY KEY,
    Name VARCHAR(50) NOT NULL,
    PC_Flag ENUM('N', 'Y') NOT NULL, -- Parent Company
    D_Flag ENUM('N', 'Y') NOT NULL, -- Developer
    P_Flag ENUM('N', 'Y') NOT NULL, -- Publisher
    Street VARCHAR(100),
    City VARCHAR(25),
    State CHAR(2),
    Zip_Code INT,
    Country VARCHAR(25)
);

CREATE TABLE Stores(
    Store_ID VARCHAR(10) PRIMARY KEY,
    BID VARCHAR(10) NOT NULL,
    MID INT,
    Ops_Hour VARCHAR(50),
    Modality VARCHAR(50),
    Street VARCHAR(100),
    City VARCHAR(25),
    State CHAR(2),
    Zip_Code INT,
    Country VARCHAR(25),
    FOREIGN KEY (BID) REFERENCES Business(BID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (MID) REFERENCES StoreMgrs(UID)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

CREATE TABLE Games(
    gid VARCHAR(10) PRIMARY KEY,
    Title VARCHAR(200) NOT NULL,
    Dev_ID VARCHAR(20) NOT NULL,
    Price FLOAT,
    UNIQUE (Title, Dev_ID),
    FOREIGN KEY (Dev_ID) REFERENCES Business(BID)
        ON DELETE NO ACTION
        ON UPDATE CASCADE
);

CREATE TABLE Genre_List(
    Genre_ID INT AUTO_INCREMENT PRIMARY KEY,
    Type VARCHAR(30) NOT NULL UNIQUE
);

CREATE TABLE Genres(
    gid VARCHAR(10),
    Genre_ID INT,
    PRIMARY KEY (Genre_ID, gid),
    FOREIGN KEY (gid) REFERENCES Games(gid)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (Genre_ID) REFERENCES Genre_List(Genre_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Platform_list(
    Platform_ID VARCHAR(10) PRIMARY KEY,
    Platform VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE Platforms(
    gid VARCHAR(10),
    Platform_ID VARCHAR(10),
    PRIMARY KEY (gid, Platform_ID),
    FOREIGN KEY (gid) REFERENCES Games(gid)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (Platform_ID) REFERENCES Platform_list(Platform_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Inventories(
    Store_ID VARCHAR(10),
    gid VARCHAR(10),
    Discount DECIMAL(3, 2) DEFAULT 0 CHECK (Discount BETWEEN 0 AND 1),
    PRIMARY KEY (gid, Store_ID),
    FOREIGN KEY (Store_ID) REFERENCES Stores(Store_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (gid) REFERENCES Games(gid)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE PublishedBy(
    Publisher_ID VARCHAR(10),
    gid VARCHAR(10),
    PRIMARY KEY (Publisher_ID, gid),
    FOREIGN KEY (Publisher_ID) REFERENCES Business(BID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (gid) REFERENCES Games(gid)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Wishlists(
    UID INT,
    gid VARCHAR(10),
    PRIMARY KEY (UID, gid),
    FOREIGN KEY (UID) REFERENCES Customers(UID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (gid) REFERENCES Games(gid)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Contents(
    Content_ID VARCHAR(500) PRIMARY KEY,
    Text_Desc TEXT
);

CREATE TABLE G_Contents(
    Content_ID VARCHAR(10),
    gid VARCHAR(10),
    PRIMARY KEY (Content_ID, gid),
    FOREIGN KEY(Content_ID) REFERENCES Contents(Content_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (gid) REFERENCES Games(gid)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Photos(
    Photo_ID VARCHAR(500) PRIMARY KEY,
    Image LONGBLOB NOT NULL,
    DateAdded DATE NOT NULL,
    FOREIGN KEY (Photo_ID) REFERENCES Contents(Content_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Acc_Photos(
    Photo_ID VARCHAR(10) PRIMARY KEY,
    UID INT NOT NULL,
    FOREIGN KEY (Photo_ID) REFERENCES Photos(Photo_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (UID) REFERENCES Users(UID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Store_Photos(
    Photo_ID VARCHAR(10) PRIMARY KEY,
    Store_ID VARCHAR(10),
    FOREIGN KEY (Photo_ID) REFERENCES Photos(Photo_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (Store_ID) REFERENCES Stores(Store_ID)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

CREATE TABLE Biz_Photos(
    Photo_ID VARCHAR(10) PRIMARY KEY,
    BID VARCHAR(10),
    FOREIGN KEY (Photo_ID) REFERENCES Photos(Photo_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (BID) REFERENCES Business(BID)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

CREATE TABLE Game_Photos(
    Photo_ID VARCHAR(10) PRIMARY KEY,
    gid VARCHAR(10),
    FOREIGN KEY (Photo_ID) REFERENCES Photos(Photo_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (gid) REFERENCES Games(gid)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

CREATE TABLE Reviews(
    RID VARCHAR(10) PRIMARY KEY,
    Stars INT CHECK (Stars BETWEEN 0 AND 5),
    UID INT,
    Content_ID VARCHAR(10) NOT NULL,
    FOREIGN KEY (UID) REFERENCES Users(UID)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    FOREIGN KEY (Content_ID) REFERENCES Contents(Content_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE S_Reviews(
    RID VARCHAR(10) PRIMARY KEY,
    Store_ID VARCHAR(10) NOT NULL,
    FOREIGN KEY (RID) REFERENCES Reviews(RID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (Store_ID) REFERENCES Stores(Store_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE G_Reviews(
    RID VARCHAR(10) PRIMARY KEY,
    gid VARCHAR(10) NOT NULL,
    FOREIGN KEY (RID) REFERENCES Reviews(RID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (gid) REFERENCES Games(gid)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Removed_Reviews(
    UID INT,
    RID VARCHAR(10),
    PRIMARY KEY (UID, RID),
    FOREIGN KEY (UID) REFERENCES Admins(UID)
        ON DELETE NO ACTION
        ON UPDATE CASCADE,
    FOREIGN KEY (RID) REFERENCES Reviews(RID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Comments(
    DatePublished TIMESTAMP,
    RID VARCHAR(10),
    UID INT,
    DateEdited TIMESTAMP,
    Content_ID VARCHAR(10) NOT NULL,
    PRIMARY KEY (DatePublished, RID),
    FOREIGN KEY (RID) REFERENCES Reviews(RID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (Content_ID) REFERENCES Contents(Content_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (UID) REFERENCES Users(UID)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

CREATE TABLE Warnings(
    IssuedNum INT CHECK (IssuedNum BETWEEN 1 AND 3),
    UID INT,
    Description VARCHAR(255),
    Adm_ID INT NOT NULL,
    PRIMARY KEY (IssuedNum, UID),
    FOREIGN KEY (UID) REFERENCES Users(UID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (Adm_ID) REFERENCES Admins(UID)
        ON DELETE NO ACTION
        ON UPDATE CASCADE    
);

CREATE TABLE Ban_List(
    Ban_ID INT AUTO_INCREMENT PRIMARY KEY,
    User_ID INT,
    Admin_ID INT,
    FOREIGN KEY (User_ID) REFERENCES Users(UID)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    FOREIGN KEY (Admin_ID) REFERENCES Admins(UID)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

DELIMITER //

CREATE TRIGGER businessBecomesDeveloper -- This trigger ensures only a Developer can issue a game
    AFTER INSERT ON Games 
    FOR EACH ROW
    BEGIN
        IF ((SELECT B.D_Flag 
            FROM Business B
            WHERE B.BID = NEW.Dev_ID) <> 'Y')
            THEN UPDATE Business B2
                SET B2.D_Flag = 'Y'
                WHERE B2.BID = NEW.Dev_ID;
            END IF;
    END//

CREATE TRIGGER businessBecomesDistributor -- This ensures a business owning any store is a Parent Company
    AFTER INSERT ON Stores
    FOR EACH ROW
    BEGIN
        IF ((SELECT B.PC_Flag
            FROM Business B
            WHERE B.BID = NEW.BID) <> 'Y')
            THEN UPDATE Business B2
                SET B2.PC_Flag = 'Y'
                WHERE B2.BID = NEW.BID;
        END IF;
    END//    

CREATE TRIGGER businessBecomesPublisher -- This trigger ensures only a Publisher can publish a game
    AFTER INSERT ON PublishedBy 
    FOR EACH ROW
    BEGIN
        IF ((SELECT B.P_Flag
            FROM Business B
            WHERE B.BID = NEW.Publisher_ID) <> 'Y')
        THEN UPDATE Business B2
            SET B2.P_Flag = 'Y'
            WHERE B2.BID = NEW.Publisher_ID;
        END IF;
    END//

CREATE TRIGGER autoBansUserAfterThreeWarnings -- This trigger ensures an UID is banned upon receiving the third warning
    AFTER INSERT ON Warnings
    FOR EACH ROW
    BEGIN
        IF (NEW.IssuedNum = 3)
        THEN INSERT INTO Ban_List (User_ID, Admin_ID)
        VALUES (NEW.UID, NEW.Adm_ID);
        END IF;
    END//

DELIMITER ;

-- Populate Data

-- Populate Users
INSERT INTO Users(UID, Username, Name, Password, Email) VALUES	
	(1, 'pikalot','Pikalot', 'Admin@123', 'pikalot@hotmail.com'),
	(2, 'sandking','Connor', 'Admin@124', 'clinvil2@gmail.com'),
	(3, 'aman','Aman', 'Admin@125', 'aman.imran@sjsu.edu'),
	(4, 'genie','Alex', 'Admin@126', 'alimalex1525@gmail.com'),
	(5, 'splendid','Steve', 'Admin@123', 'stevenlu156@gmail.com'),
	(6, 'peasant','Jon Snow', 'Manager@123', 'thepikalot@yahoo.com'),
	(7, 'manager','Joker', 'Manager@123', 'tuananh.ho@sjsu.edu');


-- INSERT INTO Emails VALUES	
-- 	(1, 'pikalot@hotmail.com'),
-- 	(2, 'clinvil2@gmail.com'),
-- 	(3, 'aman.imran@sjsu.edu'),
-- 	(4, 'alimalex1525@gmail.com'),
-- 	(5, 'stevenlu156@gmail.com'),
-- 	(6, 'thepikalot@yahoo.com'),
-- 	(7, 'tuananh.ho@sjsu.edu');

INSERT INTO Admins VALUES	
	(1),
	(2),
	(3),
	(4),
	(5);

INSERT INTO StoreMgrs VALUES
    (6),
    (7);

-- Populate Business
INSERT INTO Business(BID, Name, Street, City, State, Zip_Code, Country) VALUES	
	('B01', 'GameStop', '625 Westport Pkwy', 'Grapevine', 'TX', 76051, 'US'),
	('B02', 'SJSU', '1 Washington Sq', 'San Jose', 'CA', 95192, 'US'),
	('B03', 'Steam', '10400 NE 4th St, Floor 14', 'Bellevue', 'WA', 98004, 'US'),
	('B04', 'Valve Corporation', 'P.O. Box 1688', 'Bellevue', 'WA', 98004, 'US'),
	('B05', 'Nintendo', '4600 150th Ave', 'NE Redmond', 'WA', 98052, 'US'),
	('B06', 'Creative Assembly', 'Spire Court, Albion Way, Horsham', 'West Sussex', '', NULL, 'UK'),
	('B07', 'Sega', 'Sumitomo Fudosan Osaki Garden Tower 9F, 1-1-1. Nishi-Shinagawa, Shinagawa-ku', 'Tokyo', '', NULL, 'Japan'),
	('B08', 'FromSoftware', '21-1,Kita-Shinjuku 2-chome,Shinjuku-ku', 'Tokyo', '', NULL, 'Japan'),
	('B09', 'Activision', '2701 Olympic Blvd # B', 'Santa Monica', 'CA', 90401, 'US'),
	('B10', 'Square Enix', 'Shinjuku Eastside Square, 6-27-30 Shinjuku, Shinjuku-ku', 'Tokyo', '', NULL, 'Japan'),
	('B11', 'Square Electronic Arts', '209 Redwood Shores Pkwy', 'Redwood City', 'CA', 94065, 'US');


-- Populate Genre and Platform list
INSERT INTO Genre_List(Type) VALUES	
	('Action'),
	('Adventure'),
	('Action-Adventure'),
	('Puzzle'),
	('Role-Playing'),
	('Simulation'),
	('Strategy'),
	('Sports'),
	('MMO'),
	('Platformer video game genres');

INSERT INTO Platform_list VALUES	
	('P01', 'PC'),
	('P02', 'Playstation 3'),
	('P03', 'Playstation 4'),
	('P04', 'Playstation 5'),
	('P05', 'Xbox'),
	('P06', 'Nintendo Switch'),
	('P07', 'Nintendo DS'),
	('P08', 'Wii'),
	('P09', 'IOS'),
	('P10', 'Android');

-- Populate Games

INSERT INTO Games VALUES	
	('a0001','Dota 2', 'B04', '0'),
	('a0002','Fire Emblem: Three Houses', 'B05', '59.99'),
	('a0003','Total War: THREE KINGDOMS', 'B06', '59.99'),
	('a0004','Sekiro: Shadows Die Twice', 'B08', '59.99'),
	('a0005','Xenogears', 'B10', '9.99');

INSERT INTO Genres VALUES	
	('a0001', 7),
	('a0002', 5),
	('a0002', 7),
	('a0003', 7),
	('a0004', 3),
	('a0005', 2),
	('a0005', 5);

INSERT INTO Platforms VALUES	
	('a0001', 'P01'),
	('a0002', 'P06'),
	('a0002', 'P07'),
	('a0003', 'P01'),
	('a0004', 'P01'),
	('a0004', 'P03'),
	('a0004', 'P04'),
	('a0005', 'P02');

-- Populate Stores
INSERT INTO Stores(Store_ID, BID, MID, Ops_Hour, Street, City, State, Zip_Code, Country) VALUES	
	('S001', 'B01', 6, 'Business Hours', '1110 S King Rd #30', 'San Jose', 'CA', '95122', 'US'),
	('S002', 'B01', 7, 'Weekends', '579 Coleman Ave #90', 'San Jose', 'CA', '95110', 'US'),
	('S003', 'B03', NULL, 'Online Platform', '<Web URL>', NULL, NULL, NULL, NULL);

-- Populate Inventories
INSERT INTO Inventories VALUES	
	('S001', 'a0002', '0'),
	('S001', 'a0003', '0.3'),
	('S001', 'a0004', '0'),
	('S001', 'a0005', '0'),
	('S002', 'a0002', '0'),
	('S002', 'a0004', '0.5'),
	('S003', 'a0001', '0'),
	('S003', 'a0003', '0.15'),
	('S003', 'a0004', '0'),
	('S003', 'a0005', '0');

