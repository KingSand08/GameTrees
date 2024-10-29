CREATE TABLE Users (
    UID INT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    DOB DATE,
    Phone VARCHAR(15)
);

CREATE TABLE Emails(
    UID INT,
    Email VARCHAR(100),
    PRIMARY KEY (UID, Email),
    FOREIGN KEY (UID) REFERENCES Users(UID) 
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Basic_Users(
    UID INT PRIMARY KEY,
    Last_Login TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UID) REFERENCES Users(UID) ON DELETE CASCADE
);

CREATE TABLE Connected_Platforms(
    UID INT,
    P_Acc VARCHAR(20),
    PRIMARY KEY (UID, P_Acc),
    FOREIGN KEY (UID) REFERENCES Basic_Users(UID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Catalog_Mgrs(
    UID INT PRIMARY KEY,
    Password VARCHAR(20) NOT NULL,
    FOREIGN KEY (UID) REFERENCES Users(UID) ON DELETE CASCADE
);

CREATE TABLE Admins(
    UID INT PRIMARY KEY,
    Password VARCHAR(20) NOT NULL,
    FOREIGN KEY (UID) REFERENCES Users(UID) ON DELETE CASCADE
);

CREATE TABLE Business(
    BID VARCHAR(10) PRIMARY KEY,
    Name VARCHAR(50) NOT NULL,
    Address VARCHAR(100),
    PC_Flag ENUM('Y', 'N') NOT NULL, -- Parent Company
    D_Flag ENUM('Y', 'N') NOT NULL, -- Developer
    P_Flag ENUM('Y', 'N') NOT NULL -- Publisher
);

CREATE TABLE Stores(
    Store_ID VARCHAR(10) PRIMARY KEY,
    BID VARCHAR(10) NOT NULL,
    MID INT,
    Street VARCHAR(50),
    City VARCHAR (20),
    State CHAR(2),
    Zip_Code INT,
    Country VARCHAR(10),
    Ops_Hour VARCHAR(50),
    Modality VARCHAR(50),
    FOREIGN KEY (BID) REFERENCES Business(BID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (MID) REFERENCES Catalog_Mgrs(UID)
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
    FOREIGN KEY (UID) REFERENCES Basic_Users(UID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (Game_Title, Dev_ID) REFERENCES Games(Title, Dev_ID)
        ON DELETE CASCADE
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
