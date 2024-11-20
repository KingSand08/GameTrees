CREATE TABLE Users (
    uid INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(25) NOT NULL UNIQUE,
    name VARCHAR(40) NOT NULL,
    password VARCHAR(100) NOT NULL,
    dob DATE,
    phone VARCHAR(15),
    email VARCHAR(100) NOT NULL UNIQUE
);

-- CREATE TABLE Emails(
--     uid INT,
--     Email VARCHAR(100) NOT NULL UNIQUE,
--     PRIMARY KEY (uid, Email),
--     FOREIGN KEY (uid) REFERENCES Users(uid) 
--         ON DELETE CASCADE
--         ON UPDATE CASCADE
-- );

CREATE TABLE Customers(
    uid INT PRIMARY KEY,
    last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (uid) REFERENCES Users(uid) 
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Systems_Owned(
    uid INT,
    device VARCHAR(30),
    PRIMARY KEY (uid, Device),
    FOREIGN KEY (uid) REFERENCES Customers(uid)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE StoreMgrs(
    uid INT PRIMARY KEY,
    FOREIGN KEY (uid) REFERENCES Users(uid) 
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Admins(
    uid INT PRIMARY KEY,
    FOREIGN KEY (uid) REFERENCES Users(uid) 
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Business(
    bid INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    is_pc ENUM('N', 'Y') NOT NULL, -- Parent Company
    is_dev ENUM('N', 'Y') NOT NULL, -- Developer
    is_pub ENUM('N', 'Y') NOT NULL, -- Publisher
    street VARCHAR(100),
    city VARCHAR(25),
    state CHAR(2),
    zip INT,
    country VARCHAR(25)
);

CREATE TABLE Stores(
    sid INT AUTO_INCREMENT PRIMARY KEY,
    bid INT NOT NULL,
    mid INT, -- Manager ID
    ops_hours VARCHAR(500),
    modality VARCHAR(50),
    street VARCHAR(100),
    city VARCHAR(180),
    state CHAR(2),
    zip INT,
    country VARCHAR(60),
    FOREIGN KEY (bid) REFERENCES Business(bid)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (mid) REFERENCES StoreMgrs(uid)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

CREATE TABLE Games(
    gid INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(300),
    did INT NOT NULL, -- developer ID (refers to business id as developers are actually businesses)
    price DECIMAL(5, 2),
    FOREIGN KEY (did) REFERENCES Business(bid)
        ON DELETE NO ACTION
        ON UPDATE CASCADE
);

CREATE TABLE GenreList(
    genre_id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(30) NOT NULL UNIQUE
);

CREATE TABLE Genres(
    gid INT,
    genre_id INT,
    PRIMARY KEY (gid, genre_id),
    FOREIGN KEY (gid) REFERENCES Games(gid)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES GenreList(genre_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE PlatformList( -- Android IOS, Playstation, PC, etc.
    plat_id INT AUTO_INCREMENT PRIMARY KEY,
    platform VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE Platforms(
    gid INT,
    plat_id INT NOT NULL,
    PRIMARY KEY (gid, plat_id),
    FOREIGN KEY (gid) REFERENCES Games(gid)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (plat_id) REFERENCES PlatformList(plat_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Inventories(
    sid INT,
    gid INT,
    discount DECIMAL(3, 2) DEFAULT 0 CHECK (discount BETWEEN 0 AND 1),
    PRIMARY KEY (sid, gid),
    FOREIGN KEY (sid) REFERENCES Stores(sid)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (gid) REFERENCES Games(gid)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE PublishedBy(
    pid INT,
    gid INT,
    PRIMARY KEY (pid, gid),
    FOREIGN KEY (pid) REFERENCES Business(bid)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (gid) REFERENCES Games(gid)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Wishlists(
    uid INT,
    gid INT,
    PRIMARY KEY (uid, gid),
    FOREIGN KEY (uid) REFERENCES Customers(uid)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (gid) REFERENCES Games(gid)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Contents(
    cid INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT
);

CREATE TABLE GameContents( -- Game Contents (game description) - SUBJECT TO BE REMOVED
    cid INT,
    gid INT,
    PRIMARY KEY (cid, gid),
    FOREIGN KEY(cid) REFERENCES Contents(cid)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (gid) REFERENCES Games(gid)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Photos(
    pid INT AUTO_INCREMENT PRIMARY KEY,
    add_date DATE NOT NULL
);

CREATE TABLE AccPhotos(
    apid INT PRIMARY KEY,
    img MEDIUMBLOB NOT NULL,
    uid INT NOT NULL,
    FOREIGN KEY (apid) REFERENCES Photos(pid)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (uid) REFERENCES Users(uid)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE StorePhotos(
    spid INT PRIMARY KEY,
    img LONGBLOB NOT NULL,
    sid INT,
    FOREIGN KEY (spid) REFERENCES Photos(pid)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (sid) REFERENCES Stores(sid)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

CREATE TABLE BizPhotos(
    bpid INT PRIMARY KEY,
    img LONGBLOB NOT NULL,
    bid INT,
    FOREIGN KEY (bpid) REFERENCES Photos(pid)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (bid) REFERENCES Business(bid)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

CREATE TABLE GamePhotos(
    gpid INT PRIMARY KEY,
    img LONGBLOB NOT NULL,
    gid INT,
    FOREIGN KEY (gpid) REFERENCES Photos(pid)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (gid) REFERENCES Games(gid)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);


CREATE TABLE Reviews(
    rid INT PRIMARY KEY,
    stars INT CHECK (stars BETWEEN 0 AND 5),
    uid INT,
    cid INT NOT NULL,
    FOREIGN KEY (uid) REFERENCES Users(uid)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    FOREIGN KEY (cid) REFERENCES Contents(cid)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE StoreReviews( -- Store reviews
    rid INT PRIMARY KEY,
    sid INT NOT NULL,
    FOREIGN KEY (rid) REFERENCES Reviews(rid)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (sid) REFERENCES Stores(sid)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE GameReviews( -- Game reviews
    rid INT PRIMARY KEY,
    gid INT NOT NULL, 
    FOREIGN KEY (rid) REFERENCES Reviews(rid)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (gid) REFERENCES Games(gid)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Removed_Reviews(
    uid INT,
    rid INT,
    PRIMARY KEY (uid, rid),
    FOREIGN KEY (uid) REFERENCES Admins(uid)
        ON DELETE NO ACTION
        ON UPDATE CASCADE,
    FOREIGN KEY (rid) REFERENCES Reviews(rid)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Comments(
    publish_date TIMESTAMP,
    rid INT,
    uid INT,
    edit_date TIMESTAMP,
    cid INT NOT NULL,
    pid INT,
    PRIMARY KEY (publish_date, rid),
    FOREIGN KEY (rid) REFERENCES Reviews(rid)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (cid) REFERENCES Contents(cid)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (pid) REFERENCES Photos(pid)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    FOREIGN KEY (uid) REFERENCES Users(uid)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

CREATE TABLE Warnings(
    issue_num INT CHECK (issue_num BETWEEN 1 AND 3),
    uid INT,
    warn_desc VARCHAR(255),
    admin_id INT NOT NULL,
    PRIMARY KEY (issue_num, uid),
    FOREIGN KEY (uid) REFERENCES Users(uid)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (admin_id) REFERENCES Admins(uid)
        ON DELETE NO ACTION
        ON UPDATE CASCADE    
);

CREATE TABLE Ban_List(
    ban_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    admin_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(uid)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    FOREIGN KEY (admin_id) REFERENCES Admins(uid)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

DELIMITER //

CREATE TRIGGER businessBecomesDeveloper -- This trigger ensures only a Developer can issue a game
    AFTER INSERT ON Games 
    FOR EACH ROW
    BEGIN
        IF ((SELECT B.is_dev 
            FROM Business B
            WHERE B.bid = NEW.did) <> 'Y')
            THEN UPDATE Business B2
                SET B2.is_dev = 'Y'
                WHERE B2.bid = NEW.did;
            END IF;
    END//

CREATE TRIGGER businessBecomesDistributor -- This ensures a business owning any store is a Parent Company
    AFTER INSERT ON Stores
    FOR EACH ROW
    BEGIN
        IF ((SELECT B.is_pc
            FROM Business B
            WHERE B.bid = NEW.bid) <> 'Y')
            THEN UPDATE Business B2
                SET B2.is_pc = 'Y'
                WHERE B2.bid = NEW.bid;
        END IF;
    END//    

CREATE TRIGGER businessBecomesPublisher -- This trigger ensures only a Publisher can publish a game
    AFTER INSERT ON PublishedBy 
    FOR EACH ROW
    BEGIN
        IF ((SELECT B.is_pub
            FROM Business B
            WHERE B.bid = NEW.pid) <> 'Y')
        THEN UPDATE Business B2
            SET B2.is_pub = 'Y'
            WHERE B2.bid = NEW.pid;
        END IF;
    END//

CREATE TRIGGER autoBansUserAfterThreeWarnings -- This trigger ensures an uid is banned upon receiving the third warning
    AFTER INSERT ON Warnings
    FOR EACH ROW
    BEGIN
        IF (NEW.issue_num = 3)
        THEN INSERT INTO Ban_List (uid, admin_id)
        VALUES (NEW.uid, NEW.admin_id);
        END IF;
    END//

DELIMITER ;

-- POPULATE DATA SECTION

-- Populate Users
INSERT INTO Users(username, name, password, email) VALUES	
	('pikalot','Pikalot', 'Admin@123', 'pikalot@hotmail.com'),
	('sandking','Connor', 'Admin@124', 'clinvil2@gmail.com'),
	('aman','Aman', 'Admin@125', 'aman.imran@sjsu.edu'),
	('genie','Alex', 'Admin@126', 'alimalex1525@gmail.com'),
	('splendid','Steve', 'Admin@123', 'stevenlu156@gmail.com'),
	('peasant','Jon Snow', 'Manager@123', 'thepikalot@yahoo.com'),
	('manager','Joker', 'Manager@123', 'tuananh.ho@sjsu.edu');


-- INSERT INTO Emails VALUES	
-- 	(1, 'pikalot@hotmail.com'),
-- 	(2, 'clinvil2@gmail.com'),
-- 	(3, 'aman.imran@sjsu.edu'),
-- 	(4, 'alimalex1525@gmail.com'),
-- 	(5, 'stevenlu156@gmail.com'),
-- 	(6, 'thepikalot@yahoo.com'),
-- 	(7, 'tuananh.ho@sjsu.edu');

-- Populate Admins
INSERT INTO Admins(uid) 
    SELECT uid FROM Users WHERE username='pikalot'
    UNION ALL
    SELECT uid FROM Users WHERE username='sandking'
    UNION ALL
    SELECT uid FROM Users WHERE username='aman'
    UNION ALL
    SELECT uid FROM Users WHERE username='genie'
    UNION ALL
    SELECT uid FROM Users WHERE username='splendid';

-- Populate Store Managers
INSERT INTO StoreMgrs(uid)
    SELECT uid FROM Users WHERE username='peasant'
    UNION ALL
    SELECT uid FROM Users WHERE username='manager';

-- Populate Business
INSERT INTO Business(name, street, city, state, zip, country) VALUES	
	('GameStop', '625 Westport Pkwy', 'Grapevine', 'TX', 76051, 'US'),
	('SJSU', '1 Washington Sq', 'San Jose', 'CA', 95192, 'US'),
	('Steam', '10400 NE 4th St, Floor 14', 'Bellevue', 'WA', 98004, 'US'),
	('Valve Corporation', 'P.O. Box 1688', 'Bellevue', 'WA', 98004, 'US'),
	('Nintendo', '4600 150th Ave', 'NE Redmond', 'WA', 98052, 'US'),
	('Creative Assembly', 'Spire Court, Albion Way, Horsham', 'West Sussex', '', NULL, 'UK'),
	('Sega', 'Sumitomo Fudosan Osaki Garden Tower 9F, 1-1-1. Nishi-Shinagawa, Shinagawa-ku', 'Tokyo', '', NULL, 'Japan'),
	('FromSoftware', '21-1,Kita-Shinjuku 2-chome,Shinjuku-ku', 'Tokyo', '', NULL, 'Japan'),
	('Activision', '2701 Olympic Blvd # B', 'Santa Monica', 'CA', 90401, 'US'),
	('Square Enix', 'Shinjuku Eastside Square, 6-27-30 Shinjuku, Shinjuku-ku', 'Tokyo', '', NULL, 'Japan'),
	('Square Electronic Arts', '209 Redwood Shores Pkwy', 'Redwood city', 'CA', 94065, 'US');


-- Populate Genre and Platform list
INSERT INTO GenreList(type) VALUES	
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

INSERT INTO PlatformList(platform) VALUES	 -- Platforms and systems are the same thing
	('PC'),
    ('ARM PC'),
    ('Playstation'),
    ('Playstation 2'),
	('Playstation 3'),
	('Playstation 4'),
	('Playstation 5'),
	('Xbox'),
    ('Xbox 360'),
	('Xbox One'),
    ('Super Nintendo'),
    ('Wii'),
    ('Wii U'),
	('Nintendo Switch'),
	('Nintendo DS'),
    ('Nintendo 3DS'),
	('IOS'),
	('Android');

-- Populate Games
INSERT INTO Games VALUES	
	('1','Dota 2', '4', '0'),
	('2','Fire Emblem: Three Houses', '5', '59.99'),
	('3','Total War: THREE KINGDOMS', '6', '59.99'),
	('4','Sekiro: Shadows Die Twice', '8', '59.99'),
	('5','Xenogears', '10', '9.99');


-- Populate Genres for Games
INSERT INTO Genres(gid, genre_id) VALUES    
    ((SELECT gid FROM Games WHERE title='Dota 2'), (SELECT genre_id FROM GenreList WHERE type='MMO')),
    ((SELECT gid FROM Games WHERE title='Fire Emblem: Three Houses'), (SELECT genre_id FROM GenreList WHERE type='Role-Playing')),
    ((SELECT gid FROM Games WHERE title='Fire Emblem: Three Houses'), (SELECT genre_id FROM GenreList WHERE type='Action-Adventure')),
    ((SELECT gid FROM Games WHERE title='Total War: THREE KINGDOMS'), (SELECT genre_id FROM GenreList WHERE type='Strategy')),
    ((SELECT gid FROM Games WHERE title='Sekiro: Shadows Die Twice'), (SELECT genre_id FROM GenreList WHERE type='Action')),
    ((SELECT gid FROM Games WHERE title='Xenogears'), (SELECT genre_id FROM GenreList WHERE type='Adventure')),
    ((SELECT gid FROM Games WHERE title='Xenogears'), (SELECT genre_id FROM GenreList WHERE type='Role-Playing'));

-- Populate Platforms (Games and Platforms)
INSERT INTO Platforms(gid, plat_id) VALUES    
    ((SELECT gid FROM Games WHERE title='Dota 2'), (SELECT plat_id FROM PlatformList WHERE platform='PC')),
    ((SELECT gid FROM Games WHERE title='Dota 2'), (SELECT plat_id FROM PlatformList WHERE platform='ARM PC')),
    ((SELECT gid FROM Games WHERE title='Dota 2'), (SELECT plat_id FROM PlatformList WHERE platform='IOS')),
    ((SELECT gid FROM Games WHERE title='Dota 2'), (SELECT plat_id FROM PlatformList WHERE platform='Android')),
    ((SELECT gid FROM Games WHERE title='Fire Emblem: Three Houses'), (SELECT plat_id FROM PlatformList WHERE platform='Nintendo Switch')),
    ((SELECT gid FROM Games WHERE title='Total War: THREE KINGDOMS'), (SELECT plat_id FROM PlatformList WHERE platform='PC')),
    ((SELECT gid FROM Games WHERE title='Sekiro: Shadows Die Twice'), (SELECT plat_id FROM PlatformList WHERE platform='PC')),
    ((SELECT gid FROM Games WHERE title='Sekiro: Shadows Die Twice'), (SELECT plat_id FROM PlatformList WHERE platform='Playstation 4')),
    ((SELECT gid FROM Games WHERE title='Sekiro: Shadows Die Twice'), (SELECT plat_id FROM PlatformList WHERE platform='Xbox One')),
    ((SELECT gid FROM Games WHERE title='Xenogears'), (SELECT plat_id FROM PlatformList WHERE platform='Playstation')),
    ((SELECT gid FROM Games WHERE title='Xenogears'), (SELECT plat_id FROM PlatformList WHERE platform='Playstation 2')),
    ((SELECT gid FROM Games WHERE title='Xenogears'), (SELECT plat_id FROM PlatformList WHERE platform='Playstation 3'));

-- Populate Stores
INSERT INTO Stores(sid, bid, mid, Ops_Hours, Street, City, State, Zip, Country) VALUES	
	('1', '1', 6, 'Business Hours', '1110 S King Rd #30', 'San Jose', 'CA', '95122', 'US'),
	('2', '1', 7, 'Weekends', '579 Coleman Ave #90', 'San Jose', 'CA', '95110', 'US'),
	('3', '3', NULL, 'Online Platform', '<Web URL>', NULL, NULL, NULL, NULL);


-- Populate Inventories
INSERT INTO Inventories VALUES	
	('1', '2', '0'),
	('1', '3', '0.3'),
	('1', '4', '0'),
	('1', '5', '0'),
	('2', '2', '0'),
	('2', '4', '0.5'),
	('3', '1', '0'),
	('3', '3', '0.15'),
	('3', '4', '0'),
	('3', '5', '0');

