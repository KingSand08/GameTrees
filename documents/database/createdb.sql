CREATE TABLE Users (
    UID INT PRIMARY KEY,
    Username VARCHAR(100) NOT NULL,
    Name VARCHAR(100) NOT NULL,
    DOB DATE,
    Phone VARCHAR(15)
);

CREATE TABLE Emails(
    UID INT,
    Email VARCHAR(100) NOT NULL,
    PRIMARY KEY (UID, Email),
    FOREIGN KEY (UID) REFERENCES Users(UID) 
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

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
    Password VARCHAR(20) NOT NULL,
    FOREIGN KEY (UID) REFERENCES Users(UID) 
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Admins(
    UID INT PRIMARY KEY,
    Password VARCHAR(20) NOT NULL,
    FOREIGN KEY (UID) REFERENCES Users(UID) 
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Business(
    BID VARCHAR(10) PRIMARY KEY,
    Name VARCHAR(50) NOT NULL,
    PC_Flag ENUM('Y', 'N') NOT NULL, -- Parent Company
    D_Flag ENUM('Y', 'N') NOT NULL, -- Developer
    P_Flag ENUM('Y', 'N') NOT NULL, -- Publisher
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
    Title VARCHAR(50),
    Dev_ID VARCHAR(10),
    Price FLOAT,
    PRIMARY KEY (Title, Dev_ID),
    FOREIGN KEY (Dev_ID) REFERENCES Business(BID)
        ON DELETE NO ACTION
        ON UPDATE CASCADE
);

CREATE TABLE Gernes(
    Title VARCHAR(50),
    Dev_ID VARCHAR(10),
    Description VARCHAR(20),
    PRIMARY KEY (Title, Dev_ID, Description),
    FOREIGN KEY (Title, Dev_ID) REFERENCES Games(Title, Dev_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Platforms(
    Title VARCHAR(50),
    Dev_ID VARCHAR(10),
    Description VARCHAR(30),
    PRIMARY KEY (Title, Dev_ID, Description),
    FOREIGN KEY (Title, Dev_ID) REFERENCES Games(Title, Dev_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Inventories(
    Store_ID VARCHAR(10),
    Title VARCHAR(50),
    Dev_ID VARCHAR(10),
    Discount DECIMAL(3, 2) DEFAULT 0 CHECK (Discount BETWEEN 0 AND 1),
    PRIMARY KEY (Store_ID, Title, Dev_ID),
    FOREIGN KEY (Store_ID) REFERENCES Stores(Store_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (Title, Dev_ID) REFERENCES Games(Title, Dev_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE PublishedBy(
    Publisher_ID VARCHAR(10),
    Title VARCHAR(50),
    Dev_ID VARCHAR(10),
    PRIMARY KEY (Publisher_ID, Title, Dev_ID),
    FOREIGN KEY (Publisher_ID) REFERENCES Business(BID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (Title, Dev_ID) REFERENCES Games(Title, Dev_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Wishlists(
    UID INT,
    Game_Title VARCHAR (50),
    Dev_ID VARCHAR(10),
    PRIMARY KEY (UID, Game_Title, Dev_ID),
    FOREIGN KEY (UID) REFERENCES Customers(UID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (Game_Title, Dev_ID) REFERENCES Games(Title, Dev_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Contents(
    Content_ID VARCHAR(10) PRIMARY KEY,
    Text_Desc TEXT DEFAULT ''
);

CREATE TABLE G_Contents(
    Content_ID VARCHAR(10),
    Title VARCHAR(50),
    Dev_ID VARCHAR(10),
    PRIMARY KEY (Content_ID, Title, Dev_ID),
    FOREIGN KEY(Content_ID) REFERENCES Contents(Content_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (Title, Dev_ID) REFERENCES Games(Title, Dev_ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Photos(
    Photo_ID VARCHAR(10) PRIMARY KEY,
    Description VARCHAR(255),
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

CREATE TABLE Reviews(
    RID VARCHAR(10) PRIMARY KEY,
    Stars INT CHECK (Stars BETWEEN 0 AND 5),
    UID INT,
    Content_ID VARCHAR(10) NOT NULL,
    FOREIGN KEY (UID) REFERENCES Users(UID)
        ON DELETE SET NULL
        ON UPDATE CASCADE
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
    Title VARCHAR(50) NOT NULL 
    Dev_ID VARCHAR(10) NOT NULL,
    FOREIGN KEY (RID) REFERENCES Reviews(RID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (Title, Dev_ID) REFERENCES Games(Title, Dev_ID)
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
    FOREIGN KEY (RID) REFERENCES REviews(RID)
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
    Ban_ID INT PRIMARY KEY,
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
        UPDATE Business B
        SET B.D_Flag = 'Y'
        WHERE B.BID = NEW.Dev_ID;
    END//

CREATE TRIGGER businessBecomesPublisher -- This trigger ensures only a Publisher can publish a game
    AFTER INSERT ON PublishedBy 
    FOR EACH ROW
    BEGIN
        UPDATE Business B
        SET B.P_Flag = 'Y'
        WHERE B.BID = NEW.Publisher_ID;
    END//

DELIMITER ;
